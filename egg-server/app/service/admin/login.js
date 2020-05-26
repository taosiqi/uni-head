'use strict';

const Service = require('egg').Service;

/**
 * Service - admin
 * @class
 * @author 陶思淇
 */
class AdminLoginService extends Service {
  async getAdminByLogin(username, password) {
    const { ctx, app } = this;
    // 获取用户信息
    let data = await app.mysql.query('select a.*,b.hook_id,b.menu_id,b.name group_name  from db_user a LEFT JOIN db_group b on a.group_id=b.id where a.name=? and a.password=?', [ username, password ]);
    if (data.length !== 0) {
      data = data[0];
      let menus = '';
      let hooks = '';
      // 获取菜单
      if (data.menu_id !== '') {
        menus = data.menu_id.split(',');
        menus = await app.mysql.query('select `name` AS title,url AS `index`,icon,id,pid,is_sort from db_menus where id in(?) ORDER BY pid ,is_sort desc', [ menus ]);
      }
      // 获取权限
      if (data.menu_id !== '') {
        hooks = data.hook_id.split(',');
        hooks = await app.mysql.query('select apis from db_hooks where id in(?) ', [ hooks ]);
      }
      // 生成token
      const token = await ctx.helper.loginToken({ id: data.id, hooks, menus }, app.config.refresh);
      await app.redis.set('token_' + data.id, token, 'ex', app.config.refresh);
      data.token = token;
      delete data.password;
      delete data.hook_id;
      delete data.menu_id;
      return ctx.helper.success(data);
    }
    return ctx.helper.fail(ctx.ERROR_CODE, '账号或密码失败');
  }

  // 退出登录
  async signOut(authorization) {
    const { ctx, app } = this;
    const token = authorization.substring(7);
    const res = await ctx.helper.verifyToken(token, app); // 解密获取的Token
    const data = await app.redis.del('token_' + res.id);
    return data ? ctx.helper.success('退出成功') : ctx.helper.fail(ctx.ERROR_CODE, '异常');
  }
  // 获取用户菜单
  async getUserMenu(authorization) {
    const { ctx, app } = this;
    const token = authorization.substring(7);
    const res = await ctx.helper.verifyToken(token, app); // 解密获取的Token
    return res.menus !== '' ? ctx.helper.success(res.menus) : ctx.helper.success([]);
  }
  // 获取用户菜单
  async delRedis() {
    const { ctx, app } = this;
    const data = await app.redis.flushdb();
    return ctx.helper.success(data);
  }
}

module.exports = AdminLoginService;
