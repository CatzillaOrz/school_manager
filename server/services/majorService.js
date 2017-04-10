/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';



var Promise = require('bluebird'),
  RestClient = require('./helper/RestClient'),
  Config = require('../config/environment'),
  ErrorCode  = require('../common/errorCode');

var MajorService = {

    getMajorList : function (params, access_token, callback) {
    RestClient.get({
      apiAddr: 'EnridMind',
      path: '/api/web/v1/bteacher/file/findfile?type=' + params.type + '&name=' + encodeURI(params.name),
      access_token: access_token
    }).then(function (res) {
      if (res.status.code == 200) {
        callback(null, res.entity);
      } else {
       // callback(ErrorCode.errorHandle(res));
      }
    })
      .catch(function (e) {
        callback(e);
      });
  },

};


Promise.promisifyAll(MajorService, {suffix: "Sync"});

module.exports = MajorService;
