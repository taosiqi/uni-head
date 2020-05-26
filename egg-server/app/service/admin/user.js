'use strict';

const Service = require('egg').Service;
/**
 * Service - admin
 * @class
 * @author 陶思淇
 */
class AdminUserService extends Service {
  // 获取接口菜单
  async getHook(page, size) {
    const { app, ctx } = this;
    const limit = (page - 1) * size;
    const data = {};
    data.list = await app.mysql.query('select * from db_hooks LIMIT ?,?', [ limit, parseInt(size) ]);
    const total = await app.mysql.query('select COUNT(*) as total from db_hooks');
    data.total = total[0].total;
    return ctx.helper.success(data);
  }
  // 获取所有接口
  async getHookList() {
    const { app, ctx } = this;
    const data = await app.mysql.query('select * from db_hooks');
    return ctx.helper.success(data);
  }
  // 增加接口
  async addHook(apis, content, name, controller_action) {
    const { app, ctx } = this;
    const data = await app.mysql.insert('db_hooks', { apis, content, name, controller_action });
    return data.affectedRows === 1 ? ctx.helper.success(true) :ctx.helper.fail(ctx.ERROR_CODE, '添加失败');
  }
  // 修改接口
  async editHook(apis, content, name, controller_action, id) {
    const { app, ctx } = this;
    const data = await app.mysql.update('db_hooks', { apis, content, name, controller_action, id });
    return data.affectedRows === 1 ? ctx.helper.success(true) :ctx.helper.fail(ctx.ERROR_CODE, '修改失败');
  }
  // 删除接口
  async delHook(hook_id) {
    const { app, ctx } = this;
    const data = await app.mysql.delete('db_hooks', { id: hook_id });
    return data.affectedRows === 1 ? ctx.helper.success(true) :ctx.helper.fail(ctx.ERROR_CODE, '删除失败');
  }
  // 获取用户
  async getUser() {
    const { app, ctx } = this;
    const data = await app.mysql.query('select a.id,a.`name`,a.group_id,b.name as group_name from db_user a LEFT JOIN db_group b on a.group_id=b.id');
    return ctx.helper.success(data);
  }
  // 增加用户
  async addUser(name, password, group_id) {
    const { app, ctx } = this;
    const data = await app.mysql.insert('db_user', { name, password, group_id });
    return data.affectedRows === 1 ? ctx.helper.success(true) :ctx.helper.fail(ctx.ERROR_CODE, '增加失败');
  }
  // 修改用户
  async editUser(name, password, group_id, id) {
    const { app, ctx } = this;
    let parameter = { name, password, group_id, id };
    if (password === '') {
      parameter = { name, group_id, id };
    }
    const data = await app.mysql.update('db_user', parameter);
    return data.affectedRows === 1 ? ctx.helper.success(true) :ctx.helper.fail(ctx.ERROR_CODE, '修改失败');
  }
  // 删除用户
  async delUser(user_id) {
    const { app, ctx } = this;
    const data = await app.mysql.delete('db_user', { id: user_id });
    return data.affectedRows === 1 ? ctx.helper.success(true) :ctx.helper.fail(ctx.ERROR_CODE, '删除失败');
  }
  // 获取菜单
  async getMenu() {
    const { app, ctx } = this;
    const data = await app.mysql.query('select * from db_menus ORDER BY pid ,is_sort desc');
    return ctx.helper.success(data);
  }
  // 增加菜单
  async addMenu(query) {
    const { app, ctx } = this;
    const data = await app.mysql.insert('db_menus', { ...query });
    return data.affectedRows === 1 ? ctx.helper.success(true) :ctx.helper.fail(ctx.ERROR_CODE, '添加失败');
  }
  // 修改菜单
  async editMenu(name, pid, icon, url, is_sort, id) {
    const { app, ctx } = this;
    const data = await app.mysql.update('db_menus', { name, pid, icon, url, is_sort, id });
    return data.affectedRows === 1 ? ctx.helper.success(true) :ctx.helper.fail(ctx.ERROR_CODE, '修改失败');
  }
  // 删除菜单
  async delMenu(menu_id) {
    const { app, ctx } = this;
    const data = await app.mysql.delete('db_menus', { id: menu_id });
    return data.affectedRows === 1 ? ctx.helper.success(true) :ctx.helper.fail(ctx.ERROR_CODE, '删除失败');
  }
  // 获取用户组
  async getGroup() {
    const { app, ctx } = this;
    const data = await app.mysql.query('select * from db_group');
    return ctx.helper.success(data);
  }
  // 增加接口
  async addGroup(name, content, menu_id, hook_id) {
    const { app, ctx } = this;
    const data = await app.mysql.insert('db_group', { name, content, menu_id, hook_id });
    return data.affectedRows === 1 ? ctx.helper.success(true) :ctx.helper.fail(ctx.ERROR_CODE, '添加失败');

  }
  // 修改接口
  async editGroup(name, content, menu_id, hook_id, id) {
    const { app, ctx } = this;
    const data = await app.mysql.update('db_group', { name, content, menu_id, hook_id, id });
    return data.affectedRows === 1 ? ctx.helper.success(true) : ctx.helper.fail(ctx.ERROR_CODE, '修改失败');
  }
  // 删除接口
  async delGroup(group_id) {
    const { app, ctx } = this;
    const group_data = await app.mysql.query('select group_id from db_user where group_id=?', [ group_id ]);
    if (group_data.length > 0) {
      return ctx.helper.fail(ctx.ERROR_CODE, '用户组已被使用');
    }
    const data = await app.mysql.delete('db_group', { id: group_id });
    return data.affectedRows === 1 ? ctx.helper.success(true) : ctx.helper.fail(ctx.ERROR_CODE, '删除失败');
  }
}

module.exports = AdminUserService;
