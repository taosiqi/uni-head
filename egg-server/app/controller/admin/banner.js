'use strict';
const Controller = require('../../core/base_controller');
/**
 * Controller - 微信小程序
 * @class
 * @author 陶思淇
 */
class AdminBannerController extends Controller {
  // 获取轮播图
  async get_banner() {
    const { ctx } = this;
    return await ctx.service.admin.banner.getBanner();
  }
  // 设置帖子
  async edit_banner() {
    const { ctx } = this;
    const { url } = ctx.request.body;
    return await ctx.service.admin.banner.editBanner(url);
  }
}
module.exports = AdminBannerController;
