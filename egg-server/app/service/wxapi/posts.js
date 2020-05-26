'use strict';

const Service = require('egg').Service;
/**
 * Service - admin
 * @class
 * @author 陶思淇
 */
class WxPostService extends Service {

  // 获取帖子详情
  async getPostDetails(pid) {
    const { ctx, app } = this;
    const res = await ctx.helper.getId(ctx.header.authorization, app); // 解密获取的Token
    const data = await app.mysql.query('select a.*,b.`name`,b.avatar,b.signature,b.gender,area from wx_post a LEFT JOIN wx_user b on a.uid=b.id where a.id=? LIMIT 1 ', [ pid ]);
    const flower_count = await app.mysql.query('select count(id) flower_count FROM wx_flower where pid=?', [ pid ]);
    const like_count = await app.mysql.query('select count(id) like_count FROM wx_like where pid=?', [ pid ]);
    const is_like = await app.mysql.query('select id flower_count FROM wx_like where pid=? and uid=?', [ pid, res.id ]);
    data[0].flower_count = flower_count[0].flower_count;
    data[0].like_count = like_count[0].like_count;
    data[0].is_like = is_like.length > 0;
    return ctx.helper.success(data[0]);
  }
  // 获取评论
  async getPostComment(pid) {
    const { ctx, app } = this;
    const data = await app.mysql.query('select a.*,b.`name`,b.avatar from wx_comment a LEFT JOIN wx_user b on a.uid=b.id WHERE a.pid=?', [ pid ]);
    return ctx.helper.success(data);
  }
  // 设置评论
  async setPostComment(pid, comment) {
    const { ctx, app } = this;
    const res = await ctx.helper.getId(ctx.header.authorization, app); // 解密获取的Token
    const data = await app.mysql.insert('wx_comment', { pid, uid: res.id, comment });
    return data.affectedRows === 1 ? ctx.helper.success(true) : ctx.helper.fail(ctx.ERROR_CODE, '留言失败');
  }
  // 设置喜欢
  async setPostLike(pid) {
    const { ctx, app } = this;
    const res = await ctx.helper.getId(ctx.header.authorization, app); // 解密获取的Token
    const data = await app.mysql.insert('wx_like', { pid, uid: res.id });
    return data.affectedRows === 1 ? ctx.helper.success(true) : ctx.helper.fail(ctx.ERROR_CODE, '关注失败');
  }
  // 取消喜欢
  async delPostLike(pid) {
    const { ctx, app } = this;
    const res = await ctx.helper.getId(ctx.header.authorization, app); // 解密获取的Token
    const data = await app.mysql.delete('wx_like', { pid, uid: res.id });
    return data.affectedRows === 1 ? ctx.helper.success(true) : ctx.helper.fail(ctx.ERROR_CODE, '取消关注失败');
  }
  // 送花
  async setPostFlower(pid, vip) {
    const { ctx, app } = this;
    const res = await ctx.helper.getId(ctx.header.authorization, app); // 解密获取的Token
    let data = '';
    const s_time = ctx.helper.year(new Date()) + ' 00:00:00';
    const e_time = ctx.helper.year(new Date()) + ' 23:59:59';
    const count = await app.mysql.query('select COUNT(id) as count FROM wx_flower WHERE uid=? AND create_time BETWEEN ? AND ?', [ res.id, s_time, e_time ]);


    if (count[0].count < 3) {
      data = await app.mysql.insert('wx_flower', { pid, uid: res.id });
    } else {
      if (vip >= 3 && count[0].count <= 20) {
        data = await app.mysql.insert('wx_flower', { pid, uid: res.id });
      } else {
        return ctx.helper.fail(ctx.ERROR_CODE, '今日送花已达上线');
      }
    }
    return data.affectedRows === 1 ? ctx.helper.success(true) : ctx.helper.fail(ctx.ERROR_CODE, '送花失败');
  }
  async setPostRead(pid) {
    const { ctx, app } = this;
    await app.mysql.query('update wx_read set count=count+1 where pid=?', [ pid ]);
    return ctx.helper.success(true);
  }
}

module.exports = WxPostService;
