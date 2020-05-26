'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const { home, admin, wxapi } = controller; // 这个变量是controller下面的文件夹或文件名
  /**
   * 管理端
   */
  // 首页
  router.get('/', home.index);
  // 登录
  router.post('/admin/login', admin.login.login);
  // 退出登录
  router.post('/admin/signout', admin.login.signout);
  // 登陆后获取用户菜单
  router.get('/admin/get_user_menu', admin.login.get_user_menu);
  // 清除redis
  router.post('/admin/del_redis', admin.login.del_redis);
  // 接口栏目
  router.get('/admin/get_hook', admin.user.get_hook);
  router.get('/admin/get_hook_list', admin.user.get_hook_list);
  router.post('/admin/add_hook', admin.user.add_hook);
  router.post('/admin/edit_hook', admin.user.edit_hook);
  router.post('/admin/del_hook', admin.user.del_hook);
  // 菜单栏目
  router.get('/admin/get_menu', admin.user.get_menu);
  router.post('/admin/add_menu', admin.user.add_menu);
  router.post('/admin/edit_menu', admin.user.edit_menu);
  router.post('/admin/del_menu', admin.user.del_menu);

  // 用户栏目
  router.get('/admin/get_user', admin.user.get_user);
  router.post('/admin/add_user', admin.user.add_user);
  router.post('/admin/edit_user', admin.user.edit_user);
  router.post('/admin/del_user', admin.user.del_user);

  // 用户组栏目
  router.get('/admin/get_group', admin.user.get_group);
  router.post('/admin/add_group', admin.user.add_group);
  router.post('/admin/edit_group', admin.user.edit_group);
  router.post('/admin/del_group', admin.user.del_group);
  // 审核
  router.get('/admin/get_wx_user', admin.wxuser.get_user);
  router.post('/admin/edit_wx_user', admin.wxuser.edit_user);
  router.post('/admin/del_wx_user', admin.wxuser.del_user);
  router.get('/admin/get_post', admin.post.get_post);
  router.post('/admin/edit_post', admin.post.edit_post);
  // 七牛上传
  router.get('/qiniu/get_config', admin.qiniu.get_config);
  // 轮播图
  router.get('/banner/get_banner', admin.banner.get_banner);
  router.post('/banner/edit_banner', admin.banner.edit_banner);
  // 分类
  router.get('/classify/get_classify', admin.classify.get_classify);
  router.post('/classify/edit_classify', admin.classify.edit_classify);
  router.post('/classify/add_classify', admin.classify.add_classify);
  router.post('/classify/del_classify', admin.classify.del_classify);
  /**
   * 微信端
   */
  // 登录
  router.post('/wxapi/check', wxapi.check.wx_login);
  // 首页数据获取
  router.get('/wxapi/get_banner', wxapi.index.get_banner);
  router.get('/wxapi/get_classify', wxapi.index.get_classify);
  router.get('/wxapi/get_post', wxapi.index.get_post);
  router.get('/wxapi/show', wxapi.index.show);
  router.get('/wxapi/get_classify_post', wxapi.index.get_classify_post);
  // 上传
  router.get('/wxapi/get_config', wxapi.release.get_config);
  router.post('/wxapi/post_release', wxapi.release.post_release);
  // 个人中心
  router.get('/wxapi/get_my_like', wxapi.userinfo.get_my_like);
  router.post('/wxapi/set_userinfo', wxapi.userinfo.set_userinfo);
  router.post('/wxapi/set_vip', wxapi.userinfo.set_vip);
  // 空间
  router.get('/wxapi/get_space_post', wxapi.space.get_space_post);
  router.get('/wxapi/get_space', wxapi.space.get_space);
  router.post('/wxapi/post_srivately', wxapi.space.post_srivately);
  // 空间
  router.post('/wxapi/set_post_read', wxapi.posts.set_post_read);
  router.post('/wxapi/set_post_flower', wxapi.posts.set_post_flower);
  router.post('/wxapi/del_post_like', wxapi.posts.del_post_like);
  router.post('/wxapi/set_post_like', wxapi.posts.set_post_like);
  router.post('/wxapi/set_post_comment', wxapi.posts.set_post_comment);
  router.get('/wxapi/get_post_comment', wxapi.posts.get_post_comment);
  router.get('/wxapi/get_post_details', wxapi.posts.get_post_details);

};
