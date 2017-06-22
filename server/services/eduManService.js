/**
 * Created by Administrator on 2017/2/16.
 * 教务管理
 */
'use strict';


var Promise = require('bluebird'),
    RestClient = require('./helper/RestClient'),
    Config = require('../config/environment'),
    ErrorCode = require('../common/errorCode');

var EduManService = {

    //查询评教问卷列表
    getEvaQuesList: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/classes/list',
            params: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
            .catch(function (e) {
                callback(e);
            });
    },

    //新增评教问卷
    addEvaQues: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-org',
            path: '/v1/classes/add',
            entity: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                 callback(ErrorCode.errorHandle(res));
            }
        }).catch(function (e) {
            callback(e);
        });
    },

    //撤销评教问卷
    deleteEvaQues: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway-org',
            path: '/v1/classes/delete/' + params.id,
            params: {userId: params.userId}
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }).catch(function (e) {
            callback(e);
        });
    },

    //编辑评教问卷
    updateEvaQues: function (params, access_token, callback) {
        RestClient.put({
            host: 'gateway-org',
            path: '/v1/classes/update',
            entity: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }).catch(function (e) {
            callback(e);
        });
    }

};


Promise.promisifyAll(EduManService, {suffix: "Sync"});

module.exports = EduManService;
