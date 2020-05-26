/*
Navicat MySQL Data Transfer

Source Server         : 122.10.161.116
Source Server Version : 50562
Source Host           : 122.10.161.116:3306
Source Database       : head

Target Server Type    : MYSQL
Target Server Version : 50562
File Encoding         : 65001

Date: 2020-05-26 17:50:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for db_group
-- ----------------------------
DROP TABLE IF EXISTS `db_group`;
CREATE TABLE `db_group` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '角色名',
  `content` varchar(80) NOT NULL DEFAULT '' COMMENT '角色描述',
  `menu_id` varchar(255) NOT NULL DEFAULT '' COMMENT '权限组归属菜单',
  `hook_id` varchar(255) NOT NULL DEFAULT '',
  `belong` varchar(255) NOT NULL DEFAULT '0' COMMENT '扩展属性-所属用户',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='用户组';

-- ----------------------------
-- Records of db_group
-- ----------------------------
INSERT INTO `db_group` VALUES ('1', '超级管理员', '管理一切', '13,14,15,8,12,11,9,10,17,19,20', '2,1,3,5,6,8,10,12,14,16,17,15,13,11,7,9,4,18,19,20,21,22,23,24,25,26,27,28,29,30,31', '1');
INSERT INTO `db_group` VALUES ('5', '小程序管理员', '小程序管理员', '13,14,15,17,19,20', '18', '0');

-- ----------------------------
-- Table structure for db_hooks
-- ----------------------------
DROP TABLE IF EXISTS `db_hooks`;
CREATE TABLE `db_hooks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '钩子名称',
  `content` varchar(50) NOT NULL DEFAULT '' COMMENT '钩子描述',
  `controller_action` varchar(50) NOT NULL DEFAULT '' COMMENT '控制器和方法',
  `apis` varchar(50) NOT NULL DEFAULT '' COMMENT '接口',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8 COMMENT='操作指令权限(钩子)';

-- ----------------------------
-- Records of db_hooks
-- ----------------------------
INSERT INTO `db_hooks` VALUES ('1', '获取接口列表', '获取接口列表', 'admin.user.get_hook', '/admin/get_hook');
INSERT INTO `db_hooks` VALUES ('2', '增加接口列表', '增加接口', 'admin.user.add_hook', '/admin/add_hook');
INSERT INTO `db_hooks` VALUES ('3', '修改接口', '修改接口', 'admin.user.edit_hook', '/admin/edit_hook');
INSERT INTO `db_hooks` VALUES ('4', '删除接口', '删除接口', 'admin.user.del_hook', '/admin/del_hook');
INSERT INTO `db_hooks` VALUES ('5', '获取所有接口', '一次性获取所有接口数据，不分页', 'admin.user.get_hook_list', '/admin/get_hook_list');
INSERT INTO `db_hooks` VALUES ('6', '获取菜单', '获取菜单', 'admin.user.get_menu', '/admin/get_menu');
INSERT INTO `db_hooks` VALUES ('7', '增加菜单', '增加菜单', 'admin.user.add_menu', '/admin/add_menu');
INSERT INTO `db_hooks` VALUES ('8', '修改菜单', '修改菜单', 'admin.user.edit_menu', '/admin/edit_menu');
INSERT INTO `db_hooks` VALUES ('9', '删除菜单', '删除菜单', 'admin.user.del_menu', '/admin/del_menu');
INSERT INTO `db_hooks` VALUES ('10', '获取用户', '获取用户', 'admin.user.get_user', '/admin/get_user');
INSERT INTO `db_hooks` VALUES ('11', '增加用户', '增加用户', 'admin.user.add_user', '/admin/add_user');
INSERT INTO `db_hooks` VALUES ('12', '修改用户', '修改用户', 'admin.user.edit_user', '/admin/edit_user');
INSERT INTO `db_hooks` VALUES ('13', '删除用户', '删除用户', 'admin.user.del_user', '/admin/del_user');
INSERT INTO `db_hooks` VALUES ('14', '获取用户组', '获取用户组', 'admin.user.get_group', '/admin/get_group');
INSERT INTO `db_hooks` VALUES ('15', '增加用户组', '增加用户组', 'admin.user.add_group', '/admin/add_group');
INSERT INTO `db_hooks` VALUES ('16', '修改用户组', '修改用户组', 'admin.user.edit_group', '/admin/edit_group');
INSERT INTO `db_hooks` VALUES ('17', '删除用户组', '删除用户组', 'admin.user.del_group', '/admin/del_group');
INSERT INTO `db_hooks` VALUES ('18', '登陆后获取用户菜单', '登陆后获取用户菜单', 'admin.login.get_user_menu', '/admin/get_user_menu');
INSERT INTO `db_hooks` VALUES ('19', '获取微信用户', '获取微信用户', 'admin.wxuser.get_user', '/admin/get_wx_user');
INSERT INTO `db_hooks` VALUES ('20', '修改微信用户', '修改微信用户', 'admin.wxuser.edit_user', '/admin/edit_wx_user');
INSERT INTO `db_hooks` VALUES ('21', '删除微信用户', '删除微信用户', 'admin.wxuser.del_user', '/admin/del_wx_user');
INSERT INTO `db_hooks` VALUES ('22', '微信获取审核列表', '微信获取审核列表', 'admin.post.get_post', '/admin/get_post');
INSERT INTO `db_hooks` VALUES ('23', '微信审核', '微信审核', 'admin.post.edit_post', '/admin/edit_post');
INSERT INTO `db_hooks` VALUES ('24', '获取七牛云上传配置', '获取七牛云上传配置', 'admin.qiniu.get_config', '/qiniu/get_config');
INSERT INTO `db_hooks` VALUES ('25', '获取轮播图', '获取轮播图', 'admin.banner.get_banner', '/banner/get_banner');
INSERT INTO `db_hooks` VALUES ('26', '设置轮播图', '设置轮播图', 'admin.banner.edit_banner', '/banner/edit_banner');
INSERT INTO `db_hooks` VALUES ('27', '设置分类', '设置分类', 'admin.classify.get_classify', '/classify/get_classify');
INSERT INTO `db_hooks` VALUES ('28', '修改分类', '修改分类', 'admin.classify.edit_classify', '/classify/edit_classify');
INSERT INTO `db_hooks` VALUES ('29', '增加分类', '增加分类', 'admin.classify.add_classify', '/classify/add_classify');
INSERT INTO `db_hooks` VALUES ('30', '删除分类', '删除分类', 'admin.classify.del_classify', '/classify/del_classify');
INSERT INTO `db_hooks` VALUES ('31', '清空redis', '清空redis', 'admin.login.del_redis', '/admin/del_redis');

-- ----------------------------
-- Table structure for db_menus
-- ----------------------------
DROP TABLE IF EXISTS `db_menus`;
CREATE TABLE `db_menus` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `pid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '父级id，0为有子集父栏目1为无子集的父栏目',
  `name` varchar(50) NOT NULL DEFAULT '' COMMENT '名字',
  `icon` varchar(50) NOT NULL DEFAULT '' COMMENT '图标',
  `url` varchar(100) NOT NULL DEFAULT '' COMMENT '链接',
  `is_sort` int(10) unsigned NOT NULL DEFAULT '1' COMMENT '排序',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='后台菜单表';

-- ----------------------------
-- Records of db_menus
-- ----------------------------
INSERT INTO `db_menus` VALUES ('8', '0', '权限管理', 'icon01', '/', '0');
INSERT INTO `db_menus` VALUES ('9', '8', '用户管理', '/', '/user', '1');
INSERT INTO `db_menus` VALUES ('10', '8', '用户组', '/', '/role', '1');
INSERT INTO `db_menus` VALUES ('11', '8', '接口管理', '/', '/hook', '3');
INSERT INTO `db_menus` VALUES ('12', '8', '菜单管理', '/', '/menu', '4');
INSERT INTO `db_menus` VALUES ('13', '0', '小程序管理', 'iconweixin', '/', '2');
INSERT INTO `db_menus` VALUES ('14', '13', '小程序用户', '/', '/wxuser', '1');
INSERT INTO `db_menus` VALUES ('15', '13', '作品审核', '/', '/audit', '1');
INSERT INTO `db_menus` VALUES ('17', '1', '关于作者', 'iconguanyu', '/about', '0');
INSERT INTO `db_menus` VALUES ('19', '13', '轮播图', '/', '/banner', '1');
INSERT INTO `db_menus` VALUES ('20', '13', '帖子分类', '/', '/classify', '1');

-- ----------------------------
-- Table structure for db_user
-- ----------------------------
DROP TABLE IF EXISTS `db_user`;
CREATE TABLE `db_user` (
  `id` bigint(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '用户名',
  `nickname` varchar(100) NOT NULL DEFAULT '',
  `password` varchar(100) NOT NULL DEFAULT '' COMMENT '密码',
  `phone` varchar(30) NOT NULL DEFAULT '' COMMENT '手机号码',
  `email` varchar(30) NOT NULL DEFAULT '' COMMENT '邮箱',
  `avatar` varchar(200) NOT NULL DEFAULT '' COMMENT '头像',
  `gender` tinyint(2) NOT NULL DEFAULT '0' COMMENT '性别0男1女',
  `login_time` datetime NOT NULL DEFAULT '1900-01-01 00:00:00' COMMENT '登录时间',
  `create_time` datetime NOT NULL DEFAULT '1900-01-01 00:00:00' COMMENT '创建时间',
  `token` varchar(255) NOT NULL DEFAULT '' COMMENT 'token',
  `group_id` int(11) DEFAULT NULL COMMENT '用户组id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of db_user
-- ----------------------------
INSERT INTO `db_user` VALUES ('1', 'admin', '', 'd93a5def7511da3d0f2d171d9c344e91', '', '', '', '0', '1900-01-01 00:00:00', '1900-01-01 00:00:00', '', '1');

-- ----------------------------
-- Table structure for wx_banner
-- ----------------------------
DROP TABLE IF EXISTS `wx_banner`;
CREATE TABLE `wx_banner` (
  `url` varchar(1000) DEFAULT NULL COMMENT '轮播图'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wx_banner
-- ----------------------------
INSERT INTO `wx_banner` VALUES ('https://img.input520.cn/banner1.jpg,https://img.input520.cn/banner2.jpg,https://img.input520.cn/banner3.jpg');

-- ----------------------------
-- Table structure for wx_classify
-- ----------------------------
DROP TABLE IF EXISTS `wx_classify`;
CREATE TABLE `wx_classify` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `name` varchar(50) NOT NULL COMMENT '分类名',
  `url` varchar(255) NOT NULL DEFAULT '' COMMENT '分类图片地址',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wx_classify
-- ----------------------------
INSERT INTO `wx_classify` VALUES ('1', '男生头像', 'https://img.input520.cn/1.png');
INSERT INTO `wx_classify` VALUES ('2', '女生头像', 'https://img.input520.cn/2.png');
INSERT INTO `wx_classify` VALUES ('3', '情侣头像', 'https://img.input520.cn/3.png');
INSERT INTO `wx_classify` VALUES ('4', '个性头像', 'https://img.input520.cn/4.png');
INSERT INTO `wx_classify` VALUES ('5', '卡通头像', 'https://img.input520.cn/5.png');
INSERT INTO `wx_classify` VALUES ('6', '萌宠头像', 'https://img.input520.cn/6.png');
INSERT INTO `wx_classify` VALUES ('7', '伤感头像', 'https://img.input520.cn/7.png');
INSERT INTO `wx_classify` VALUES ('8', '明星头像', 'https://img.input520.cn/8.png');

-- ----------------------------
-- Table structure for wx_comment
-- ----------------------------
DROP TABLE IF EXISTS `wx_comment`;
CREATE TABLE `wx_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '评论id',
  `pid` int(11) NOT NULL COMMENT '帖子id',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `comment` varchar(100) NOT NULL COMMENT '评论内容',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
  PRIMARY KEY (`id`),
  KEY `c_pid` (`pid`),
  KEY `c_uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wx_comment
-- ----------------------------

-- ----------------------------
-- Table structure for wx_flower
-- ----------------------------
DROP TABLE IF EXISTS `wx_flower`;
CREATE TABLE `wx_flower` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `pid` int(11) NOT NULL COMMENT '帖子id',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `l_pid` (`pid`),
  KEY `l_uid` (`uid`),
  KEY `f_id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wx_flower
-- ----------------------------


-- ----------------------------
-- Table structure for wx_like
-- ----------------------------
DROP TABLE IF EXISTS `wx_like`;
CREATE TABLE `wx_like` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL COMMENT '帖子id',
  `uid` int(11) NOT NULL COMMENT '用户id',
  PRIMARY KEY (`id`),
  KEY `l_pid` (`pid`),
  KEY `l_uid` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wx_like
-- ----------------------------
INSERT INTO `wx_like` VALUES ('7', '46', '1');

-- ----------------------------
-- Table structure for wx_post
-- ----------------------------
DROP TABLE IF EXISTS `wx_post`;
CREATE TABLE `wx_post` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '帖子id',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `url` text NOT NULL COMMENT '图片地址',
  `release_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
  `classify` int(2) NOT NULL DEFAULT '0' COMMENT '分类',
  `audit` int(2) NOT NULL DEFAULT '1' COMMENT '审核中1/通过2拒绝3',
  `title` varchar(30) NOT NULL COMMENT '帖子标题',
  `public` int(11) NOT NULL DEFAULT '1' COMMENT '是否公开1/公开2/私有',
  `count` int(11) NOT NULL DEFAULT '0' COMMENT '图片数',
  `first_url` text NOT NULL COMMENT '第一张图',
  `audit_info` varchar(255) NOT NULL DEFAULT '图片内容不符合要求' COMMENT '审核失败理由',
  `Introduction` varchar(255) NOT NULL DEFAULT '' COMMENT '简介',
  `subscribe` int(11) NOT NULL DEFAULT '0' COMMENT '是否订阅消息 默认是0 订阅了为1 审阅后发过一次通知后改为0 为0不发送',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wx_post
-- ----------------------------

-- ----------------------------
-- Table structure for wx_read
-- ----------------------------
DROP TABLE IF EXISTS `wx_read`;
CREATE TABLE `wx_read` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `count` int(11) NOT NULL DEFAULT '0' COMMENT '阅读次数',
  PRIMARY KEY (`id`),
  KEY `r_pid` (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wx_read
-- ----------------------------
INSERT INTO `wx_read` VALUES ('25', '0', '0');

-- ----------------------------
-- Table structure for wx_user
-- ----------------------------
DROP TABLE IF EXISTS `wx_user`;
CREATE TABLE `wx_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `open_id` varchar(200) NOT NULL DEFAULT '' COMMENT 'openid',
  `name` varchar(255) NOT NULL DEFAULT '找头像吧' COMMENT '用户名',
  `avatar` varchar(255) NOT NULL DEFAULT 'https://img.input520.cn/5.png' COMMENT '头像',
  `gender` tinyint(255) NOT NULL DEFAULT '0' COMMENT '性别0男1女',
  `signature` varchar(255) NOT NULL DEFAULT '我是签名哟' COMMENT '签名',
  `area` varchar(255) NOT NULL DEFAULT '中国' COMMENT '地区',
  `vip` tinyint(2) NOT NULL DEFAULT '0' COMMENT 'vip 也就是分享次数',
  `birthday` datetime NOT NULL DEFAULT '2020-01-01 00:00:00' COMMENT '生日',
  `token` varchar(200) NOT NULL DEFAULT '' COMMENT '微信sessionkey',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of wx_user
-- ----------------------------