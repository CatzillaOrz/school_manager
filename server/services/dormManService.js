/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';


var Promise = require('bluebird'),
    RestClient = require('./helper/RestClient'),
    Config = require('../config/environment'),
    ErrorCode = require('../common/errorCode');

var DormManService = {

    //获取宿舍楼列表
    getDormBuildings: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/floor/getPage',
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

    //根据id查询宿舍楼信息
    getDormBuildingInfo: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/floor/get',
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

    //新增宿舍楼
    addDormBuilding: function (params, access_token, callback) {
        RestClient.post({
            host: 'dd',
            path: '/api/web/v1/floor/save',
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

    //删除宿舍楼
    delDormBuilding: function (params, access_token, callback) {
        params.accessToken = access_token;
        RestClient.delete({
            host: 'dd',
            path: '/api/web/v1/floor/delete',
            params: params,
            access_token: access_token,
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

    //编辑宿舍楼
    updateDormBuilding: function (params, access_token, callback) {
        RestClient.put({
            host: 'dd',
            path: '/api/web/v1/floor/put',
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
    }

};


Promise.promisifyAll(DormManService, {suffix: "Sync"});

module.exports = DormManService;
