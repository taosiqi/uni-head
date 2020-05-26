'use strict';
const Controller = require('../../core/base_controller');
/**
 * Controller - 微信小程序
 * @class
 * @author 陶思淇
 */
class AdminWxUserController extends Controller {
  // 获取用户
  async get_user() {
    const { ctx } = this;
    const { page, size } = ctx.query;
    return await ctx.service.admin.wxuser.getUser(page, size);
  }
  // 修改用户
  async edit_user() {
    const { ctx } = this;
    const { vip, id } = ctx.request.body;
    return await ctx.service.admin.wxuser.editUser(vip, id);
  }
  // 删除用户
  async del_user() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    return await ctx.service.admin.wxuser.delUser(parseInt(id));
  }

}
module.exports = AdminWxUserController;
