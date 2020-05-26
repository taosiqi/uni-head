'use strict';

const Service = require('egg').Service;
/**
 * Service - admin
 * @class
 * @author 陶思淇
 */
class WxUserInfoService extends Service {
  // 喜欢评论送花
  async getMyLike() {
    const { ctx, app } = this;
    const data = [];
    // 判断是自己访问自己的空间还是别人访问的
    const res = await ctx.helper.getId(ctx.header.authorization, app);
    data[0] = await app.mysql.query('SELECT b.id,b.title,b.public,b.audit FROM wx_flower a JOIN wx_post b ON b.id = a.pid WHERE a.uid=? GROUP BY id', [ res.id ]);
    data[1] = await app.mysql.query('SELECT b.id,b.title,b.public,b.audit FROM wx_like a JOIN wx_post b ON b.id = a.pid WHERE a.uid=? GROUP BY id', [ res.id ]);
    data[2] = await app.mysql.query('SELECT b.id,b.title,b.public,b.audit,a.create_time,a.comment FROM wx_comment a JOIN wx_post b ON b.id = a.pid WHERE a.uid=?', [ res.id ]);
    return ctx.helper.success(data);
  }
  // 修改个人信息
  async setUserinfo(birthday, area, signature, gender, name, avatar) {
    const { ctx, app } = this;
    // 判断是自己访问自己的空间还是别人访问的
    const res = await ctx.helper.getId(ctx.header.authorization, app);
    const data = await this.app.mysql.update('wx_user', { id: res.id, birthday, area, signature, gender, name, avatar });
    return data.affectedRows === 1 ? ctx.helper.success(true) : ctx.helper.fail(ctx.ERROR_CODE, '修改失败');
  }
  // 修改vip
  async setVip() {
    const { ctx, app } = this;
    const res = await ctx.helper.getId(ctx.header.authorization, app);
    const data = await app.mysql.query('update wx_user set vip=vip+1 where id=?', [ res.id ]);
    return data.affectedRows === 1 ? ctx.helper.success(true) : ctx.helper.fail(ctx.ERROR_CODE, '分享失败');
  }
}

module.exports = WxUserInfoService;
