/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // 用于cookie签名密钥，应更改为您自己的并保持安全
    config.keys = appInfo.name + '_1588928442263_8988';
    // tokenn有效
    config.refresh = 3600 * 24; // 3600 * 24
    config.tmplIds = ''; // 订阅消息模板id
    // 七牛配置
    config.qiniu = {
        bucket: '',
        accessKey: '',
        secretKey: '',
        region: '',
        domain: '',
    };
    // 微信配置
    config.wx = {
        app_id: '',
        secret: '',
    };
    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true,
        },
        // domainWhiteList: [ 'http://localhost:8080' ], // 允许访问接口的白名单
    };
    config.jwt = {
        secret: 'xxxxx', // 自定义 token 的加密条件字符串
    };
    // redis
    config.redis = {
        client: {
            port: 6379, // Redis port
            host: '127.0.0.1', // Redis host
            password: '',
            db: 1,
        },
    };
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    };
    // mysql配置文件
    config.mysql = {
        client: {
            host: '', // host
            port: '', // 端口号
            user: '', // 用户名
            password: '', // 密码
            database: 'head', // 数据库名
            debug: false, //打印sql
        },
        app: true, // 是否加载到 app 上，默认开启
        agent: false, // 是否加载到 agent 上，默认关闭
    };
    // 在此处添加您的中间件配置
    config.middleware = ['errorHandler', 'auth'];
    // 在此处添加您的管理配置
    const userConfig = {
        // myAppName: 'egg',
    };

    return {
        ...config,
        ...userConfig,
    };
};