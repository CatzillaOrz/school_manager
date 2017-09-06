/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';



var Promise = require('bluebird'),
  RestClient = require('./helper/RestClient'),
  Config = require('../config/environment'),
  ErrorCode  = require('../common/errorCode');

var StudentService = {

    getStudentList : function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/students/list',
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
    addStudent: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-org',
            path: '/v1/students/add',
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
    deleteStudent: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway-org',
            path: '/v1/students/delete/'+params.id,
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
    updateStudent: function (params, access_token, callback) {
        RestClient.put({
            host: 'gateway-org',
            path: '/v1/students/update',
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
    getStudentById: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/students/get/'+params.id,
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
    getSimpleStudents: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/students/simplestudents',
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
    updateStudentToClasses: function (params, access_token, callback) {
        RestClient.put({
            host: 'gateway-org',
            path: '/v1/students/batchupdateclasses',
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
    getImpResult: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/students/importmsg',
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

    //导出学生信息
    exportData: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/students/importmsg',
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


Promise.promisifyAll(StudentService, {suffix: "Sync"});

module.exports = StudentService;
