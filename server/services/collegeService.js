/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';


var Promise = require('bluebird'),
    RestClient = require('./helper/RestClient'),
    Config = require('../config/environment'),
    ErrorCode = require('../common/errorCode');

var CollegeService = {

    getCollegeList: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway',
            path: '/v1/college/list',
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
    addCollege: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway',
            path: '/v1/college/add',
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
    deleteCollege: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway',
            path: '/v1/college/delete/'+params.id,
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
    updateCollege: function (params, access_token, callback) {
        RestClient.put({
            host: 'gateway',
            path: '/v1/college/update',
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
    getCollegeById: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway',
            path: '/v1/college/get/'+params.id,
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
    getCollegeDropList: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway',
            path: '/v1/college/droplist',
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


Promise.promisifyAll(CollegeService, {suffix: "Sync"});

module.exports = CollegeService;
