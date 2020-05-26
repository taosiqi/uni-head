# head-egg
##建议使用yarn npm我的电脑会报莫名的错
## QuickStart

<!-- add docs here for admin -->

see [egg docs][egg] for more detail.

### Development

```bash
$ yarn i
$ yarn run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ yarn start
$ yarn stop
```

### npm scripts

- Use `yarn run lint` to check code style.
- Use `yarn test` to run unit test.
- Use `yarn run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

```code
由框架约定的目录：
app/router.js 用于配置 URL 路由规则，具体参见 Router。
app/controller/** 用于解析用户的输入，处理后返回相应的结果，具体参见 Controller。
app/service/** 用于编写业务逻辑层，可选，建议使用，具体参见 Service。
app/middleware/** 用于编写中间件，可选，具体参见 Middleware。
app/public/** 用于放置静态资源，可选，具体参见内置插件 egg-static。
app/extend/** 用于框架的扩展，可选，具体参见框架扩展。
config/config.{env}.js 用于编写配置文件，具体参见配置。
config/plugin.js 用于配置需要加载的插件，具体参见插件。
test/** 用于单元测试，具体参见单元测试。
app.js 和 agent.js 用于自定义启动时的初始化工作，可选，具体参见启动自定义。关于agent.js的作用参见Agent机制。
由内置插件约定的目录：
app/public/** 用于放置静态资源，可选，具体参见内置插件 egg-static。
app/schedule/** 用于定时任务，可选，具体参见定时任务。
若需自定义自己的目录规范，参见 Loader API
app/view/** 用于放置模板文件，可选，由模板插件约定，具体参见模板渲染。
app/model/** 用于放置领域模型，可选，由领域类相关插件约定，如 egg-sequelize。
```
```code
egg-mysql本身支持拼接与直接执行 sql 语句。使用 query 可以执行合法的 sql 语句
return await this.app.mysql.query('select * from db_user where name=? and password=?', [ username, md5(password) ]); 原生sql写法
egg写法
return await this.app.mysql.insert('db_user', { name: username });  插入
return await this.app.mysql.get('db_user', { name: username, password: md5(password) }); 查询一条数据，只能查一条 返回一个json对象{}
return await this.app.mysql.select('posts',{ name: username, password: md5(password) });  //多条数据 一个数组
return await this.app.mysql.delete('db_user',{ id:3 });  删除
return await this.app.mysql.update('user',{ id:2, username:'赵四' }); //egg更新
```
