/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';


var Promise = require('bluebird'),
    RestClient = require('./helper/RestClient'),
    Config = require('../config/environment'),
    ErrorCode = require('../common/errorCode');

var PeriodService = {
    addPeriod: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway',
            path: '/v1/year/add',
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
    getPeriodList: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway',
            path: '/v1/year/list',
            params,
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
    deletePeriod: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway',
            path: '/v1/year/delete/'+params.id,
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
    addSemesterWeek: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway',
            path: '/v1/week/addsemesterweek',
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
    addCoursePeriod: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway',
            path: '/v1/period/add',
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
    getCoursePeriodList: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway',
            path: '/v1/period/list',
            params,
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


Promise.promisifyAll(PeriodService, {suffix: "Sync"});

module.exports = PeriodService;
