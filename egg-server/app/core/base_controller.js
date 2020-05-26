'use strict';

const { Controller } = require('egg');

class BaseController extends Controller {

  success(data, status) {
    this.ctx.body = { code: this.ctx.SUCCESS_CODE, data };
    this.ctx.status = status || 200;
  }

  fail(code, msg) {
    this.ctx.body = { code, msg, data: {} };
    this.ctx.status = 200;
  }
}

module.exports = BaseController;
