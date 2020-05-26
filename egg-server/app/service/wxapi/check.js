'use strict';

const Service = require('egg').Service;

/**
 * Service - admin
 * @class
 * @author
 */
class WxLoginService extends Service {

  async getWxLogin(code) {
    const { ctx, app } = this;
    const app_id = app.config.wx.app_id;
    const secret = app.config.wx.secret;
    const result = await ctx.curl(`https://api.weixin.qq.com/sns/jscode2session?appid=${app_id}&secret=${secret}&js_code=${code}&grant_type=authorization_code`, { dataType: 'json', timeout: 3000 });
    const arr = result.data;
    if (arr.errcode) {
      return ctx.helper.fail(ctx.ERROR_CODE, '微信端失败'); // 解密获取的Token
    }

    // 微信API返回的session_key 和 openid
    const open_id = arr.openid;
    const session_key = arr.session_key;
    const check = await app.mysql.query('select open_id from wx_user where open_id=? limit 1', [ open_id ]);
    if (check.length === 0) {
      const name = '找头像用户_' + Math.random().toString().slice(-6);
      await app.mysql.insert('wx_user', { open_id, name });
    }
    const data = await app.mysql.get('wx_user', { open_id });
    const token = await ctx.helper.loginToken({ id: data.id, open_id, session_key }, app.config.refresh);
    data.token = token;
    delete data.open_id;
    return ctx.helper.success(data);
  }
}

module.exports = WxLoginService;
