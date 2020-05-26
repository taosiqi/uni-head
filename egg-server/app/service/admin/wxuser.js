'use strict';

const Service = require('egg').Service;
/**
 * Service - admin
 * @class
 * @author 陶思淇
 */
class AdminUserService extends Service {

  // 获取用户
  async getUser(page, size) {
    const { app, ctx } = this;
    const limit = (page - 1) * size;
    const data = {};
    data.list = await app.mysql.query('select * from wx_user LIMIT ?,?', [ limit, parseInt(size) ]);
    const total = await app.mysql.query('select COUNT(*) as total from wx_user');
    data.total = total[0].total;
    return ctx.helper.success(data);
  }

  // 修改用户
  async editUser(vip, id) {
    const { app, ctx } = this;
    const data = await app.mysql.update('wx_user', { vip, id });
    return data.affectedRows === 1 ? ctx.helper.success(true) : ctx.helper.fail(ctx.ERROR_CODE, '修改失败');
  }
  // 删除用户
  async delUser(id) {
    const { app, ctx } = this;
    const data = await app.mysql.delete('wx_user', { id });
    return data.affectedRows === 1 ? ctx.helper.success(true) : ctx.helper.fail(ctx.ERROR_CODE, '删除失败');
  }

}

module.exports = AdminUserService;
