'use strict';

const Controller = require('../../core/base_controller');

/**
 * Controller - 微信小程序
 * @class
 * @author 陶思淇
 */
class WxLoginController extends Controller {
  async wx_login() {
    const { ctx } = this;
    const { code } = ctx.request.body;
    return await ctx.service.wxapi.check.getWxLogin(code);
  }

}

module.exports = WxLoginController;
