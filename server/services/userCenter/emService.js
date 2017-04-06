'use strict';

var Promise = require('bluebird'),
    RestClient = require('../helper/RestClient'),
    Config = require('../../config/environment'),
    ErrorCode = require('../../common/errorCode');

var EmService = {
    getCourseT: function (params, access_token, callback) {
        RestClient.get({
            path: '/api/web/v1/bteacher/course/teaching',
            params: params,
            access_token: access_token,
            host: 'em'
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

    getCourseS: function (params, access_token, callback) {
        RestClient.get({
            path: '/api/web/v1/bstudent/course/list',
            params: params,
            access_token: access_token,
            host: 'em'
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

Promise.promisifyAll(EmService, {suffix: "Sync"});

module.exports = EmService;

