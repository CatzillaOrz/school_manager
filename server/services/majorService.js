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
      host: 'gateway',
      path: '/v1/professionnal/list',
        params
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
    addMajor: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway',
            path: '/v1/professionnal/add',
            entity: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                // callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
            callback(e);
        });
    },
    deleteMajor: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway',
            path: '/v1/professionnal/delete/'+params.id,
            params:{userId:params.userId}
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                // callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
            callback(e);
        });
    },
    updateMajor: function (params, access_token, callback) {
        RestClient.put({
            host: 'gateway',
            path: '/v1/professionnal/update',
            entity: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                // callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
            callback(e);
        });
    },
    getMajorById: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway',
            path: '/v1/professionnal/get/'+params.id,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                // callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
            callback(e);
        });
    },
    getMajorDropList: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway',
            path: '/v1/professionnal/droplist',
            params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                // callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
            callback(e);
        });
    },

};


Promise.promisifyAll(MajorService, {suffix: "Sync"});

module.exports = MajorService;
