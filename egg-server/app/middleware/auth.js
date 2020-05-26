'use strict';
module.exports = (options, app) => {
  return async function auth(ctx, next) {
    let token = ctx.header.authorization;
    const ignorePaths = [ '/admin/login', '/test/index', '/admin/signout', '/', '/wxapi/check', '/wxapi/get_post', '/wxapi/get_banner', '/wxapi/get_classify' ];
    if (ignorePaths.includes(ctx.path)) {
      await next();
    } else {
      if (token !== '') {
        token = token.substring(7);
        const res = await ctx.helper.verifyToken(token, app);
        if (res.id) {
          // 微信鉴权成功
          if (RegExp(/wxapi/).test(ctx.path)) {
            await next();
          } else {
            // 后台管理还需要判断单点登录和权限
            const redis_token = await app.redis.get('token_' + res.id); // 获取保存的token
            if (token === redis_token) {
              const stare = ctx._.findIndex(res.hooks, function(o) {
                return o.apis === ctx.path;
              });
              stare === -1 ? ctx.body = { code: ctx.NO_LOGIN_CODE, msg: '权限不足', data: {} } : await next();
            } else {
              ctx.body = { code: ctx.NO_LOGIN_CODE, msg: '您的账号已在其他地方登录', data: {} };
            }
          }
        } else {
          ctx.body = { code: ctx.NO_LOGIN_CODE, msg: '登录状态已过期', data: {} };
        }
      } else {
        ctx.body = { code: ctx.NO_LOGIN_CODE, msg: '请登陆后再进行操作', data: {} };
      }
    }
  };
};

