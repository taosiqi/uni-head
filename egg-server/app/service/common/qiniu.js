'use strict';

const Service = require('egg').Service;
const qiniu = require('qiniu');
/**
 * Service - admin
 * @class
 * @author 陶思淇
 */
class CommonQiniuService extends Service {
  // 获取七牛上传配置
  async getConfig() {
    const { ctx, app } = this;
    const bucket = app.config.qiniu.bucket;
    const accessKey = app.config.qiniu.accessKey;
    const secretKey = app.config.qiniu.secretKey;
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
      scope: bucket,
      expires: 1200,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    const data = {
      region: app.config.qiniu.region,
      domain: app.config.qiniu.domain,
      upToken: uploadToken,
      shouldUseQiniuFileName: false,
      tmplIds: app.config.tmplIds,
    };
    return ctx.helper.success(data);
  }
}

module.exports = CommonQiniuService;
