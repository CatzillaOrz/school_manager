/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';


var Promise = require('bluebird'),
    RestClient = require('./helper/RestClient'),
    Config = require('../config/environment'),
    ErrorCode = require('../common/errorCode');

var StatisticsService = {

    stuReport: function (params, access_token, callback) {
        RestClient.post({
            host: 'stu-practice',
            path: '/v1/taskstatistics/report',
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
    stuRoutineDetail: function (params, access_token, callback) {
        RestClient.post({
            host: 'stu-practice',
            path: '/v1/taskstatistics/signdetail',
            entity: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                for(var i = 0; i< res.entity.data.length; i++){
                    res.entity.data[i].jobNum = params.stuInfo.jobNum;
                    res.entity.data[i].studentName = params.stuInfo.studentName;
                    res.entity.data[i].grade = params.stuInfo.grade;
                    res.entity.data[i].collegeName = params.stuInfo.collegeName;
                    res.entity.data[i].professionalName = params.stuInfo.professionalName;
                    res.entity.data[i].className = params.stuInfo.className;
                }
                callback(null, res.entity);
            } else {
                 callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
                callback(e);
            });
    },
    stuRoutineCount: function (params, access_token, callback) {
        RestClient.post({
            host: 'stu-practice',
            path: '/v1/taskstatistics/sign',
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
    studentAttending: function (params, access_token, callback) {
        RestClient.post({
            host: 'stu-practice',
            path: '/v1/taskstatistics/joindetail',
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
    teachingSummary: function (params, access_token, callback) {
        RestClient.post({
            host: 'stu-practice',
            path: '/v1/taskstatistics/totalcount',
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
    getStudentActive: function (params, access_token, callback) {
        RestClient.post({
            host: 'stu-practice',
            path: '/v1/taskstatistics/activedetail',
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
    getStuProcess: function (params, access_token, callback) {
        RestClient.post({
            host: 'stu-practice',
            path: '/v1/taskstatistics/summarydetailpage',
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
    getEnterpriseDetail: function (params, access_token, callback) {
        RestClient.post({
            host: 'stu-practice',
            path: '/v1/taskstatistics/enterprisecountpage',
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
    getStuJournal: function (params, access_token, callback) {
        RestClient.post({
            host: 'stu-practice',
            path: '/v1/taskstatistics/summaryreplypage',
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
    }
};


Promise.promisifyAll(StatisticsService, {suffix: "Sync"});

module.exports = StatisticsService;
