'use strict';

const Service = require('egg').Service;

/**
 * Service - admin
 * @class
 * @author 陶思淇
 */
class WxIndexService extends Service {

  // 获取轮播图
  async getBanner() {
    const { app, ctx } = this;
    let data = await app.redis.get('wx_banner'); // 获取保存的token
    if (data === null) {
      data = await app.mysql.get('wx_banner');
      await app.redis.set('wx_banner', data.url);
      data = data.url;
    }
    return ctx.helper.success(data);
  }

  // 获取分类
  async getClassify() {
    const { app, ctx } = this;
    let data = await app.redis.get('wx_classify'); // 获取保存的token
    if (data === null) {
      data = await app.mysql.select('wx_classify');
      data = JSON.stringify(data);
      await app.redis.set('wx_classify', data);
    }
    return ctx.helper.success(data);
  }

  // 获取首页帖子
  async getPost(page, size, type) {
    const { app, ctx } = this;
    const types = parseInt(type); // 1推荐2花朵3最新
    const limit = (page - 1) * size;
    let sql = 'SELECT a.*, b.`name`, c.count AS read_count, IFNULL(d.flower_count,0) as flower_count FROM wx_post AS a LEFT JOIN db_user AS b ON a.uid = b.id LEFT JOIN wx_read c ON a.id = c.pid LEFT JOIN (select pid,count(pid) as flower_count from wx_flower group by pid) as d on a.id=d.pid WHERE a.public = 1 AND a.audit = 2 ORDER BY ';
    if (types === 1) {
      sql += 'read_count ';
    }
    if (types === 2) {
      sql += 'flower_count ';
    }
    if (types === 3) {
      sql += 'release_time';
    }
    const data = await app.mysql.query(sql + ' DESC LIMIT ?, ?', [ limit, parseInt(size) ]);
    return ctx.helper.success(data);
  }

  async getClassifyPost(page, size, type, classify) {
    const { app, ctx } = this;
    const types = parseInt(type); // 1推荐2花朵3最新
    const limit = (page - 1) * size;
    let sql = 'SELECT a.*, b.`name`, c.count AS read_count, IFNULL(d.flower_count,0) as flower_count FROM wx_post AS a LEFT JOIN db_user AS b ON a.uid = b.id LEFT JOIN wx_read c ON a.id = c.pid LEFT JOIN (select pid,count(pid) as flower_count from' +
      ' wx_flower group by pid) as d on a.id=d.pid WHERE a.public = 1 AND a.audit = 2 AND a.classify = ? ORDER BY ';
    if (types === 1) {
      sql += 'read_count ';
    }
    if (types === 2) {
      sql += 'flower_count ';
    }
    if (types === 3) {
      sql += 'release_time';
    }
    const data = await app.mysql.query(sql + ' DESC LIMIT ?, ?', [ classify, limit, parseInt(size) ]);
    return ctx.helper.success(data);
  }
}

module.exports = WxIndexService;
