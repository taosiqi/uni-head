'use strict';
const Controller = require('../../core/base_controller');

/**
 * Controller - 微信小程序
 * @class
 * @author 陶思淇
 */
class WxUserInfoController extends Controller {
  // 获取用户
  async get_my_like() {
    const { ctx } = this;
    return await ctx.service.wxapi.userinfo.getMyLike();
  }
  async set_userinfo() {
    const { ctx } = this;
    const { birthday, area, signature, gender, name, avatar } = ctx.request.body;
    return await ctx.service.wxapi.userinfo.setUserinfo(birthday, area, signature, gender, name, avatar);
  }
  async set_vip() {
    const { ctx } = this;
    return await ctx.service.wxapi.userinfo.setVip();
  }
}
module.exports = WxUserInfoController;
