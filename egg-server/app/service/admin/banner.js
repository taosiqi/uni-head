'use strict';

const Service = require('egg').Service;
/**
 * Service - admin
 * @class
 * @author 陶思淇
 */
class AdminBannerService extends Service {

  // 获取轮播
  async getBanner() {
    const { app, ctx } = this;
    const data = await app.mysql.get('wx_banner');
    return ctx.helper.success(data);
  }

  // 设置轮播
  async editBanner(url) {
    const { app, ctx } = this;
    const data = await app.mysql.query('update wx_banner set url=?', [ url ]);
    return data.affectedRows === 1 ? ctx.helper.success('成功') : ctx.helper.fail(ctx.ERROR_CODE, '异常');
  }
}

module.exports = AdminBannerService;
