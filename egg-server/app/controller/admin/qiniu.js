'use strict';
const Controller = require('../../core/base_controller');
/**
 * Controller - 微信小程序
 * @class
 * @author 陶思淇
 */
class CommonQiNiuController extends Controller {
  async get_config() {
    const { ctx } = this;
    return ctx.service.common.qiniu.getConfig();
  }

}
module.exports = CommonQiNiuController;
