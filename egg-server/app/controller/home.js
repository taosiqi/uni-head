'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.cookies.set("name", "张三",{
      maxAge: 24 * 3600 * 1000,
      domain: '127.0.0.2',
      httpOnly: true, // by default it's true
      encrypt: true, // 加密，并且可以设置为中文
    });
    ctx.body = 'hi';
  }
}

module.exports = HomeController;
