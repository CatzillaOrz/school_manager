/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';



var Promise = require('bluebird'),
  RestClient = require('./helper/RestClient'),
  Config = require('../config/environment'),
  ErrorCode  = require('../common/errorCode');

var TeacherService = {

    getTeacherList : function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/teacher/list',
            params
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
    addTeacher: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-org',
            path: '/v1/teacher/add',
            entity: params,
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
    deleteTeacher: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway-org',
            path: '/v1/teacher/delete/'+params.id,
            params:{userId:params.userId}
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
    updateTeacher: function (params, access_token, callback) {
        RestClient.put({
            host: 'gateway-org',
            path: '/v1/teacher/update',
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
    getTeacherById: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/teacher/get/'+params.id,
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
    getTeacherDropListOrg: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/teacher/droplistorg',
            access_token: access_token,
            params
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
    getSimpleTeachers: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/teacher/simpleteachers',
            access_token: access_token,
            params
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
    getImpResult: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/teacher/importmsg',
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


Promise.promisifyAll(TeacherService, {suffix: "Sync"});

module.exports = TeacherService;
