/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';


var Promise = require('bluebird'),
    RestClient = require('./helper/RestClient'),
    Config = require('../config/environment'),
    ErrorCode = require('../common/errorCode');

var RoleManService = {

    //查询已分配角色列表
    getDistedRoleList: function (params, access_token, callback) {
        RestClient.get({
            host: 'local',
            path: '/v1/role/distributionlist',
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


    //分配角色
    distRole: function (params, access_token, callback) {
        RestClient.post({
            host: 'local',
            path: '/v1/role/distribution',
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

    //撤销已分配的角色
    cancleRole: function (params, access_token, callback) {
        params.accessToken = access_token;
        RestClient.delete({
            host: 'local',
            path: '/v1/role/deleterole',
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
    }
};


Promise.promisifyAll(RoleManService, {suffix: "Sync"});

module.exports = RoleManService;
