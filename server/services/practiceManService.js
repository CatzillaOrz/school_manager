/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';


var Promise = require('bluebird'),
    RestClient = require('./helper/RestClient'),
    Config = require('../config/environment'),
    ErrorCode = require('../common/errorCode');

var PracticeManService = {

    //查询企业导师列表
    getEntTutorList: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/mentorstraining/querycorporatementors',
            params: params,
            access_token: access_token
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

    //根据id查询企业导师信息
    getEntTutorInfo: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/mentorstraining/queryinfo/'+params.id,
            access_token: access_token
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

    //新增企业导师
    addEntTutor: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-org',
            path: '/v1/mentorstraining/corporatementorscreat',
            entity: params
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

    //删除企业导师
    delEntTutor: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway-org',
            path: '/v1/mentorstraining/delete/'+params.id,
            access_token: access_token
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

    //编辑企业导师
    updateEntTutor: function (params, access_token, callback) {
        RestClient.put({
            host: 'gateway-org',
            path: '/v1/mentorstraining/update',
            access_token: access_token,
            entity: params
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

    //查询实践小组
    getPracticeGroupList: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '',
            params: params,
            access_token: access_token
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


Promise.promisifyAll(PracticeManService, {suffix: "Sync"});

module.exports = PracticeManService;
