'use strict';

const Service = require('egg').Service;

/**
 * Service - admin
 * @class
 * @author 陶思淇
 */
class WxIndexService extends Service {
  // 发布帖子
  async postRelease(title, introduction, _public, classify, count, url, subscribe) {
    const { app, ctx } = this;
    const res = await ctx.helper.getId(ctx.header.authorization, app); // 解密获取的Token
    const first_url = url[0];
    const data = await app.mysql.insert('wx_post', { uid: res.id, title, Introduction: introduction, public: _public, classify, count, url: JSON.stringify(url), first_url, subscribe });
    await app.mysql.insert('wx_read', {});
    return data.affectedRows === 1 ? ctx.helper.success(true) : ctx.helper.fail(ctx.ERROR_CODE, '发布失败，请稍后再试');
  }

}

module.exports = WxIndexService;
