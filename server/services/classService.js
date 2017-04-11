/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';



var Promise = require('bluebird'),
  RestClient = require('./helper/RestClient'),
  Config = require('../config/environment'),
  ErrorCode  = require('../common/errorCode');

var ClassService = {

    getClassList : function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway',
            path: '/v1/classes/list',
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
    addClass: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway',
            path: '/v1/classes/add',
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
    deleteClass: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway',
            path: '/v1/classes/delete/'+params.id,
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
    updateClass: function (params, access_token, callback) {
        RestClient.put({
            host: 'gateway',
            path: '/v1/classes/update',
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
    getClassById: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway',
            path: '/v1/classes/get/'+params.id,
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


Promise.promisifyAll(ClassService, {suffix: "Sync"});

module.exports = ClassService;
