'use strict';
/**
 * Created by wangjun on 2016/11/23.
 */

var Promise = require('bluebird'),
  RestClient = require('./helper/RestClient'),
  Config = require('../config/environment'),
  request = require('request'),
  fs = require('fs'),
  ErrorCode = require('../common/errorCode');

var UploadService = {
  /**
   * 七牛token获取
   * @param callback
   */
  getQiNiuToken: function (callback) {
    RestClient.get({
      path: '/api/v2/service/qiniu',
      host:'io'
    }).then(function (res) {
      console.log(res.entity);
      res.entity.uptoken=res.entity.token;
      console.log(res.entity);
      callback(null, res.entity);
    }).catch(function (e) {
      //  callback(e);
    });
  },
  /**
   * polyv writeToken 获取
   * @param callback
   */
  getPolyvToken: function (callback) {
    RestClient.get({
      path: '/api/v2/service/polyv',
        host:'io'
    }).then(function (res) {
      console.log(res.entity);
      res.entity.uptoken=res.entity.token;
      console.log(res.entity);
      callback(null, res.entity);
    }).catch(function (e) {
      //  callback(e);
    });
  }
};

Promise.promisifyAll(UploadService, {suffix: "Sync"});

module.exports = UploadService;
