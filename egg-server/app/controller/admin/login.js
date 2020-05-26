'use strict';

const Controller = require('../../core/base_controller');

/**
 * Controller - 微信小程序
 * @class
 * @author 陶思淇
 */
class AdminLoginController extends Controller {
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    return await ctx.service.admin.login.getAdminByLogin(username, password);
  }
  // 退出登录
  async signout() {
    const { ctx } = this;
    return await ctx.service.admin.login.signOut(ctx.header.authorization);
  }
  // 获取用户菜单
  async get_user_menu() {
    const { ctx } = this;
    return await ctx.service.admin.login.getUserMenu(ctx.header.authorization);
  }
  // 获取用户菜单
  async del_redis() {
    const { ctx } = this;
    return await ctx.service.admin.login.delRedis();
  }
}

module.exports = AdminLoginController;
