'use strict';
const Controller = require('../../core/base_controller');
/**
 * Controller - 微信小程序
 * @class
 * @author 陶思淇
 */
class AdminUserController extends Controller {

  // 获取接口菜单
  async get_hook() {
    const { ctx } = this;
    const { page, size } = ctx.query;
    return await ctx.service.admin.user.getHook(page, size);
  }
  // 获取接口菜单
  async get_hook_list() {
    const { ctx } = this;
    return await ctx.service.admin.user.getHookList();
  }
  // 增加接口
  async add_hook() {
    const { ctx } = this;
    const { apis, content, name, controller_action } = ctx.request.body;
    return await ctx.service.admin.user.addHook(apis, content, name, controller_action);
  }
  // 修改接口
  async edit_hook() {
    const { ctx } = this;
    const { apis, content, name, controller_action, id } = ctx.request.body;
    return await ctx.service.admin.user.editHook(apis, content, name, controller_action, id);
  }
  // 删除接口
  async del_hook() {
    const { ctx } = this;
    const { hook_id } = ctx.request.body;
    return await ctx.service.admin.user.delHook(hook_id);
  }
  // 获取菜单
  async get_menu() {
    const { ctx } = this;
    return await ctx.service.admin.user.getMenu();
  }
  // 增加菜单
  async add_menu() {
    const { ctx } = this;
    return await ctx.service.admin.user.addMenu(ctx.request.body);
  }
  // 修改菜单
  async edit_menu() {
    const { ctx } = this;
    const { name, pid, icon, url, is_sort, id } = ctx.request.body;
    return await ctx.service.admin.user.editMenu(name, parseInt(pid), icon, url, parseInt(is_sort), parseInt(id));
  }
  // 删除菜单
  async del_menu() {
    const { ctx } = this;
    const { menu_id } = ctx.request.body;
    return await ctx.service.admin.user.delMenu(menu_id);
  }
  // 获取用户
  async get_user() {
    const { ctx } = this;
    return await ctx.service.admin.user.getUser();
  }
  // 增加用户
  async add_user() {
    const { ctx } = this;
    const { name, password, group_id } = ctx.request.body;
    return await ctx.service.admin.user.addUser(name, password, group_id);
  }
  // 修改用户
  async edit_user() {
    const { ctx } = this;
    const { name, password, group_id, id } = ctx.request.body;
    return await ctx.service.admin.user.editUser(name, password, group_id, id);
  }
  // 删除用户
  async del_user() {
    const { ctx } = this;
    const { user_id } = ctx.request.body;
    if (parseInt(user_id) === 1) {
      return this.fail(ctx.ERROR_CODE, '管理员账号不能删除');
    }
    return await ctx.service.admin.user.delUser(parseInt(user_id));
  }
  // 获取用户组
  async get_group() {
    const { ctx } = this;
    return await ctx.service.admin.user.getGroup();
  }
  // 增加用户组
  async add_group() {
    const { ctx } = this;
    const { name, content, menu_id, hook_id } = ctx.request.body;
    return await ctx.service.admin.user.addGroup(name, content, menu_id, hook_id);
  }
  // 修改用户组
  async edit_group() {
    const { ctx } = this;
    const { name, content, menu_id, hook_id, id } = ctx.request.body;
    return await ctx.service.admin.user.editGroup(name, content, menu_id, hook_id, parseInt(id));
  }
  // 删除用户组
  async del_group() {
    const { ctx } = this;
    const { group_id } = ctx.request.body;
    if (parseInt(group_id) === 1) {
      return this.fail(ctx.ERROR_CODE, '超级管理员不能删除');
    }
    return await ctx.service.admin.user.delGroup(parseInt(group_id));
  }
}
module.exports = AdminUserController;
