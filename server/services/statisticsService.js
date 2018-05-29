/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';


var Promise = require('bluebird'),
    RestClient = require('./helper/RestClient'),
    Config = require('../config/environment'),
    ErrorCode = require('../common/errorCode');

var StatisticsService = {

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
