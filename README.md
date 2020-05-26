# uni-head
先看视频吧，图片我就不放了 小程序端演示https://img.input520.cn/head.mp4
小程序没资质发布不了，想看的可以加我微信 taosiqi1605
一款头像发布小程序，包含前后端 全部开源
首先声明，这个项目是业余时间学习写的，第一次用node写项目，代码更是惨不忍睹，但是注释应该还是写的比较清楚的，还是能够给想入门全栈的同学一点
技术栈：
后台管理（admin文件夹）：vue
小程序端（avatar-uniapp文件夹）：uniapp
后端（egg-server文件夹）：egg

后台管理：
默认管理员admin 123456
麻雀虽小，五脏俱全，集成了多语言(admin\src\view\common\I18n.vue),细化到接口的权限管理
配置好.env.production和.env.development里面的接口地址，已经处理好了跨域
小程序端
uniapp写的，大家应该都看的懂
配置好main里面的接口地址就行
egg后端
egg+mysql5.7+redis
有用到redis做单点登录he1缓存，大家记得装好
记得一点哈 轮播图和分类菜单存进redis了 大家对他进行修改后记得清空让他重新缓存，清空按钮在后台管理退出那里
修改好egg-server\config\config.default.js里面的配置文件
数据库的话 所有字段我都写了注释 看数据库文件应该都能理解