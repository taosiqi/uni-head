# uni-head 找头像吧微信小程序。
## 声明
> 主要是用来学习的，你要是能用到项目中去也行。注释写的比较清楚，想入门全栈的同学可以仔细研究，项目包含前后端，后台 全部开源,有啥bug提lssues。
## 演示
个人无法发布此类小程序，可以看视频演示https://img.input520.cn/head.mp4
## 技术栈
1. 后台管理（admin文件夹）：vue
2. 小程序端（avatar-uniapp文件夹）：uniapp
3. 后端（egg-server文件夹）：egg
##配置
### 后台管理端：
默认管理员Admin 123456。
麻雀虽小，五脏俱全，集成了多语言(Admin\Src\View\Common\I18n.Vue),细化到接口的权限管理（自己写个自定义指令，实现接口对应按钮的隐藏与显示）。
配置好.Env.Production和.Env.Development里面的接口地址，已经处理好了跨域。
### 小程序端
uniapp写的，语法和vue相似，配置好main.js里面的接口地址就行。
### egg后端
egg+mysql5.7+redis。
有用到redis做登录和缓存，大家记得装好，记得一点哈 轮播图和分类菜单存进redis了 大家对他进行修改后记得清空让他重新缓存，清空按钮在后台管理退出那里。
修改好egg-server\config\config.default.js里面的配置文件。
数据库的话 所有字段都写了注释。
