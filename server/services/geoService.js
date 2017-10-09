'use strict';
var Promise = require('bluebird'),
    RestClient = require('./helper/RestClient'),
    ErrorCode = require('../common/errorCode');

var geoService = {
    getOrgan: function (params,callback) {
        RestClient.get({
                host:'dd',
                path: '/api/web/v1/education/studentlontal',
                params: params
            })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function(err){
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },
    getAttendancestatistics: function (params,callback) {
        RestClient.get({
                host:'dd',
                path: '/api/web/v1/education/attendancestatistics',
                params: params
            })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function(err){
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },
    departmentsummary: function (params,callback) {
        RestClient.get({
                host:'dd',
                path: '/api/web/v1/education/departmentsummary',
                params: params
            })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function(err){
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },
    attendancerate: function (params,callback) {
        RestClient.get({
                host:'dd',
                path: '/api/web/v1/education/attendancerate',
                params: params
            })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function(err){
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },
    realtimestatistics: function (params,callback) {
        RestClient.get({
                host:'dd',
                path: '/api/web/v1/education/realtimestatistics',
                params: params
            })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function(err){
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },
    termtoclassrate: function (params,callback) {
        RestClient.get({
                host:'dd',
                path: '/api/web/v1/education/termtoclassrate',
                params: params
            })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function(err){
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },
    classranking: function (params,callback) {
        RestClient.get({
                host:'dd',
                path: '/api/web/v1/education/classranking',
                params: params
            })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function(err){
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },
    teacherranking: function (params,callback) {
        RestClient.get({
                host:'dd',
                path: '/api/web/v1/education/teacherranking',
                params: params
            })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function(err){
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },
    comprehensivepraise: function (params,callback) {
        RestClient.get({
                host:'dd',
                path: '/api/web/v1/education/comprehensivepraise',
                params: params
            })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function(err){
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },
};

Promise.promisifyAll(geoService, {suffix: "Sync"});
module.exports = geoService;
