'use strict';
const moment = require('moment');
moment.locale('zh-cn');
const Service = require('egg').Service;
/**
 * Service - admin
 * @class
 * @author 陶思淇
 */
class AdminPostService extends Service {

  // 获取帖子
  async getPost(page, size, audit) {
    const { app, ctx } = this;
    const limit = (page - 1) * size;
    const data = {};
    data.list = await app.mysql.query('select a.*,b.`name`,b.`open_id` from wx_post a LEFT JOIN wx_user b on a.uid=b.id where audit=? LIMIT ?,?', [ audit, limit, parseInt(size) ]);
    const total = await app.mysql.query('select COUNT(*) as total from wx_post  where audit=?', [ audit ]);
    data.total = total[0].total;
    return ctx.helper.success(data);
  }

  // 审核帖子
  async editPost(audit, audit_info, id, subscribe, open_id) {
    const { app, ctx } = this;
    const app_id = app.config.wx.app_id;
    const secret = app.config.wx.secret;
    const post_read = await app.mysql.select('wx_read', { pid: id });
    if (post_read.length === 0) {
      await app.mysql.insert('wx_read', { pid: id });
    }
    const data = await app.mysql.update('wx_post', { audit, audit_info, id });
    if (parseInt(subscribe) === 1) {
      const result = await ctx.curl(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${app_id}&secret=${secret}`, { dataType: 'json', timeout: 3000 });
      const arr = result.data;
      if (arr.access_token) {
        const access_token = arr.access_token;
        await ctx.curl(`https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${access_token}`, {
          method: 'POST',
          contentType: 'json',
          data: {
            touser: open_id,
            template_id: app.config.tmplIds,
            page: parseInt(audit) === 2 ? `./details/details?id=${id}` : './index/index',
            data: {
              phrase2: {
                value: parseInt(audit) === 3 ? '未通过' : '通过', // 结果
              },
              date4: {
                value: moment().format('LL'), // 时间
              },
              name1: {
                value: '管理员', // 审核人
              },
              thing3: {
                value: parseInt(audit) === 3 ? audit_info : '通过审核', // 备注
              },
            },
          },
          // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
          dataType: 'json',
        });
        await app.mysql.update('wx_post', { id, subscribe: 0 });
      }
    }
    return ctx.helper.success(data.affectedRows === 1);
  }
}

module.exports = AdminPostService;
