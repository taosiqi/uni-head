'use strict';
const Controller = require('../../core/base_controller');
/**
 * Controller - 微信小程序
 * @class
 * @author 陶思淇
 */
class WxIndexController extends Controller {
  // 获取用户
  async get_banner() {
    const { ctx } = this;
    return await ctx.service.wxapi.index.getBanner();
  }
  async get_classify() {
    const { ctx } = this;
    return await ctx.service.wxapi.index.getClassify();
  }
  async get_post() {
    const { ctx } = this;
    const { page, size, type } = ctx.query;
    return await ctx.service.wxapi.index.getPost(page, size, type);
  }
  async get_classify_post() {
    const { ctx } = this;
    const { page, size, type, classify } = ctx.query;
    return await ctx.service.wxapi.index.getClassifyPost(page, size, type, classify);
  }
  async show() {
    const { ctx } = this;
    return ctx.helper.success(false);
  }
}
module.exports = WxIndexController;
