'use strict';
const Controller = require('../../core/base_controller');

/**
 * Controller - 微信小程序
 * @class
 * @author 陶思淇
 */
class WxSpaceController extends Controller {
  // 获取空间个人信息
  async get_space() {
    const { ctx } = this;
    const { uid } = ctx.query;
    return await ctx.service.wxapi.space.getSpace(uid);
  }
  // 获取空间帖子
  async get_space_post() {
    const { ctx } = this;
    const { uid, page, size } = ctx.query;
    return await ctx.service.wxapi.space.getSpacePost(uid, page, size);
  }
  // 设置私有
  async post_srivately() {
    const { ctx } = this;
    const { pid, _public } = ctx.request.body;
    return await ctx.service.wxapi.space.postSrivately(pid, _public);
  }
}
module.exports = WxSpaceController;
