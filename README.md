# 找头像吧
*开发者需要正向激励，您的star是我继续开发的动力*  
*微信小程序+云开发版本正在开发中，开发完成第一时间开源*
### 声明
主要是用来学习的，当然，你也可以使用它来发布你自己的小程序，不用担心版权问题。
### 演示
点击[这里](https://static-1253419794.cos.ap-nanjing.myqcloud.com/qiniu/heads.mp4)可以查看演示视频。
### 技术栈
1. 后台管理（admin文件夹）：vue
2. 小程序端（avatar-uniapp文件夹）：uniapp
3. 后端（egg-server文件夹）：eggjs
### 配置
#### 后台管理端：
默认管理员Admin 123456,集成了多语言,细化到接口的权限管理,配置好.Env.Production和.Env.Development里面的接口地址，已经处理好了跨域。
#### 小程序端
配置好main.js里面的接口地址。
#### egg后端
egg+mysql5.7+redis。
有用到redis做登录和缓存，修改config.default.js配置文件。
