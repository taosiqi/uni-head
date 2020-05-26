'use strict';

const Service = require('egg').Service;
/**
 * Service - admin
 * @class
 * @author 陶思淇
 */
class WxSpaceService extends Service {
// 进入空间
  async getSpace(uid) {
    const { ctx, app } = this;
    let data = {};
    const user_data = await app.mysql.query('select * from wx_user where id=? LIMIT 1', [ uid ]);
    const flower_count = await app.mysql.query('select IFNULL(SUM(b.flower_count),0) as flower_count  FROM wx_post a LEFT JOIN (select count(*) as flower_count,pid from wx_flower GROUP BY pid) b on a.id=b.pid where a.uid=?', [ uid ]);
    data = user_data[0];
    data.flower_count = flower_count[0].flower_count;
    delete data.open_id;
    return ctx.helper.success(data);
  }
  async getSpacePost(uid, page, size) {
    const { ctx, app } = this;
    const limit = (page - 1) * size;
    // 判断是自己访问自己的空间还是别人访问的
    const res = await ctx.helper.getId(ctx.header.authorization, app); // 解密获取的Token
    const authority = res.id === parseInt(uid);
    let sql = 'SELECT a.*, b.`name`, c.count AS read_count, IFNULL(d.flower_count,0) as flower_count FROM wx_post AS a LEFT JOIN db_user AS b ON a.uid = b.id LEFT JOIN wx_read c ON a.id = c.pid LEFT JOIN (select pid,count(pid) as flower_count from' +
      ' wx_flower group by pid) as d on a.id=d.pid WHERE uid=? and ';
    if (authority) {
      sql += ' a.audit = 2 ';
    } else {
      sql += 'a.public = 1 AND a.audit = 2 ';
    }
    const post_data = {};
    const data = await app.mysql.query(sql + 'ORDER BY release_time DESC LIMIT ?, ?', [ uid, limit, parseInt(size) ]);
    post_data.date = data;
    post_data.authority = res.id === parseInt(uid);
    return ctx.helper.success(post_data);
  }
  async postSrivately(pid, _public) {
    const { ctx, app } = this;
    // 判断是自己访问自己的空间还是别人访问的
    const res = await ctx.helper.getId(ctx.header.authorization, app); // 解密获取的Token
    const authority = await app.mysql.query('select id from wx_post where uid=? and id=? LIMIT 1', [ res.id, pid ]);
    if (authority.length === 0) {
      return ctx.helper.fail(ctx.ERROR_CODE, '无权限操作');
    }
    const data = await app.mysql.update('wx_post', { id: pid, public: _public });
    return data.affectedRows === 1 ? ctx.helper.success(true) : ctx.helper.fail(ctx.ERROR_CODE, '设置失败');
  }
}

module.exports = WxSpaceService;
