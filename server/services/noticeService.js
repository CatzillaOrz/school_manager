/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';


var Promise = require('bluebird'),
    RestClient = require('./helper/RestClient'),
    Config = require('../config/environment'),
    ErrorCode = require('../common/errorCode');

var NoticeService = {

    getNoticeList: function (params, callback) {
        RestClient.get({
            host: 'hy',
            path: '/api/web/v1/news/newsShow/newsLists',

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
    getNoticeById: function (params, callback) {
        RestClient.get({
            host: 'hy',
            path: '/api/web/v1/news/newsShow/newsDetails',

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
};


Promise.promisifyAll(NoticeService, {suffix: "Sync"});

module.exports = NoticeService;
