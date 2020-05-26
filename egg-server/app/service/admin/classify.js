'use strict';
const Service = require('egg').Service;

/**
 * Service - admin
 * @class
 * @author 陶思淇
 */
class AdminClassifyService extends Service {

  // 获取分类
  async getClassify() {
    const { app, ctx } = this;
    const data = await app.mysql.select('wx_classify');
    return ctx.helper.success(data);
  }
  // 增加分类
  async addClassify(url, name) {
    const { app, ctx } = this;
    const data = await app.mysql.insert('wx_classify', { url, name });
    return data.affectedRows === 1 ? ctx.helper.success(true) : ctx.helper.fail(ctx.ERROR_CODE, '添加失败');
  }
  // 修改分类
  async editClassify(url, name, id) {
    const { app, ctx } = this;
    const data = await app.mysql.update('wx_classify', { id, name, url });
    return data.affectedRows === 1 ? ctx.helper.success(true) : ctx.helper.fail(ctx.ERROR_CODE, '修改失败');
  }
  // 删除分类
  async delClassify(classify_id) {
    const { app, ctx } = this;
    const data = await app.mysql.delete('wx_classify', { id: classify_id });
    return data.affectedRows === 1 ? ctx.helper.success(true) : ctx.helper.fail(ctx.ERROR_CODE, '删除失败');
  }
}

module.exports = AdminClassifyService;
