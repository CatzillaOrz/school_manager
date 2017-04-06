'use strict';

var Promise = require('bluebird'),
    RestClient = require('../helper/RestClient'),
    Config = require('../../config/environment'),
    ErrorCode = require('../../common/errorCode');

var DdService = {
    //获取学生考勤信息
    getAttendanceStu: function (params, access_token, callback) {
        RestClient.get({
                path: '/api/web/v1/student/getstudentForPersonal',
                params: params,
                access_token: access_token,
                host: 'dd'
            })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function (err) {
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },
    //获取教师端显示的考勤信息
    getAttendanceTea: function (params, access_token, callback) {
        RestClient.get({
                path: '/api/web/v1/teacher/getstudentForPersonal',
                params: params,
                access_token: access_token,
                host: 'dd'
            })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function (err) {
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    }
};

Promise.promisifyAll(DdService, {suffix: "Sync"});

module.exports = DdService;

