'use strict';
const Controller = require('../../core/base_controller');
/**
 * Controller - 微信小程序
 * @class
 * @author 陶思淇
 */
class AdminClassifyController extends Controller {
  // 获取分类
  async get_classify() {
    const { ctx } = this;
    return await ctx.service.admin.classify.getClassify();
  }
  // 增加分类
  async add_classify() {
    const { ctx } = this;
    const { url, name } = ctx.request.body;
    return await ctx.service.admin.classify.addClassify(url, name);
  }
  // 修改分类
  async edit_classify() {
    const { ctx } = this;
    const { url, name, id } = ctx.request.body;
    return await ctx.service.admin.classify.editClassify(url, name, id);
  }
  // 删除分类
  async del_classify() {
    const { ctx } = this;
    const { classify_id } = ctx.request.body;
    return await ctx.service.admin.classify.delClassify(classify_id);
  }
}
module.exports = AdminClassifyController;
