#后台管理框架使用的是https://github.com/lin-xin/vue-manage-system，优化下了目录结构，删除了不必要的组件。
## 安装步骤

```
// 安装项目依赖，等待安装完成之后，安装失败可用 cnpm 或 yarn
npm install

// 开启服务器，浏览器访问 http://localhost:8080
npm run serve

// 执行构建命令，生成的dist文件夹放在服务器下即可访问
npm run build
```

项目约定
200为正确响应
400为普通错误
401为登录、注册、权限错误
