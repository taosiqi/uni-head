'use strict';
const Controller = require('../../core/base_controller');

/**
 * Controller - 微信小程序
 * @class
 * @author 陶思淇
 */
class WxPostController extends Controller {
  // 获取用户
  async get_post_details() {
    const { ctx } = this;
    const { pid } = ctx.query;
    return await ctx.service.wxapi.posts.getPostDetails(pid);
  }
  async get_post_comment() {
    const { ctx } = this;
    const { pid } = ctx.query;
    return await ctx.service.wxapi.posts.getPostComment(pid);
  }
  async set_post_comment() {
    const { ctx } = this;
    const { pid, comment } = ctx.request.body;
    return await ctx.service.wxapi.posts.setPostComment(pid, comment);
  }
  async set_post_like() {
    const { ctx } = this;
    const { pid } = ctx.request.body;
    return await ctx.service.wxapi.posts.setPostLike(pid);
  }
  async del_post_like() {
    const { ctx } = this;
    const { pid } = ctx.request.body;
    return await ctx.service.wxapi.posts.delPostLike(pid);
  }
  async set_post_flower() {
    const { ctx } = this;
    const { pid, vip } = ctx.request.body;
    return await ctx.service.wxapi.posts.setPostFlower(pid, vip);
  }
  async set_post_read() {
    const { ctx } = this;
    const { pid } = ctx.request.body;
    return await ctx.service.wxapi.posts.setPostRead(pid);
  }
}
module.exports = WxPostController;
