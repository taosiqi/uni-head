'use strict';

module.exports = {
  success(data, status) {
    this.ctx.body = { code: this.ctx.SUCCESS_CODE, data };
    this.ctx.status = status || 200;
  },

  fail(code, msg) {
    this.ctx.body = { code, msg, data: {} };
    this.ctx.status = 200;
  },
  // 字符串转对象，转换出错返回{}或者默认值
  JSONParse(str, defaultResult) {
    try {
      return JSON.parse(str);
    } catch (e) {
      return defaultResult || {};
    }
  },
  loginToken(data, expires = 7200) {
    const { app } = this;
    const exp = Math.floor(Date.now() / 1000) + expires;
    const cert = app.config.jwt.secret;
    // 设置签名过期时间为两个小时后
    return app.jwt.sign({ data, exp }, cert);
  },

  // 解密，验证
  verifyToken(token, app) {
    const cert = app.config.jwt.secret;
    let res = '';
    try {
      const result = app.jwt.verify(token, cert) || {};
      const { exp } = result;
      const current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
        res = result.data || {};
      }
    } catch (e) {
      res = e.message;
    }
    return res;
  },
  // 时间补0
  formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  },
  // 年月日
  year(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [ year, month, day ].map(this.formatNumber).join('-');
  },
  // 年月日
  getId(date, app) {
    const token = date.substring(7);
    return this.verifyToken(token, app); // 解密获取的Token
  },
};
