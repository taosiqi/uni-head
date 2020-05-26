'use strict';
const Controller = require('../../core/base_controller');
/**
 * Controller - 微信小程序
 * @class
 * @author 陶思淇
 */
class AdminPostController extends Controller {
  // 获取帖子
  async get_post() {
    const { ctx } = this;
    const { page, size, audit } = ctx.query;
    return await ctx.service.admin.post.getPost(page, size, audit);
  }
  // 审核帖子
  async edit_post() {
    const { ctx } = this;
    const { audit, audit_info, id, subscribe, open_id } = ctx.request.body;
    return await ctx.service.admin.post.editPost(audit, audit_info, id, subscribe, open_id);
  }
}
module.exports = AdminPostController;
