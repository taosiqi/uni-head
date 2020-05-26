'use strict';
const Controller = require('../../core/base_controller');

/**
 * Controller - 微信小程序
 * @class
 * @author 陶思淇
 */
class WxIndexController extends Controller {
  // 获取七牛云配置
  async get_config() {
    const { ctx } = this;
    return ctx.service.common.qiniu.getConfig();
  }
  async post_release() {
    const { ctx } = this;
    const { title, introduction, _public, classify, count, url, subscribe } = ctx.request.body;
    return await ctx.service.wxapi.release.postRelease(title, introduction, _public, classify, count, url, subscribe);
  }
}
module.exports = WxIndexController;
