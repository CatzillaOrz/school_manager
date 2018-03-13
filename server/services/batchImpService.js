/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';



var Promise = require('bluebird'),
  RestClient = require('./helper/RestClient'),
  Config = require('../config/environment'),
  ErrorCode  = require('../common/errorCode');

var BatchImpService = {

    getNormalImpResult: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/import/basedatamsg',
            access_token: access_token,
            params: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
            callback(e);
        });
    },

    getTimetableImpResult: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/import/coursedatamsg',
            access_token: access_token,
            params: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
            callback(e);
        });
    },
};


Promise.promisifyAll(BatchImpService, {suffix: "Sync"});

module.exports = BatchImpService;
