/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';



var Promise = require('bluebird'),
  RestClient = require('./helper/RestClient'),
  Config = require('../config/environment'),
  ErrorCode  = require('../common/errorCode');

var NewsService = {

    getNewsList: function (params, access_token, callback) {
        RestClient.get({
            host: 'hy',
            path: '/api/web/v1/announcementList/list',
            access_token: access_token,
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
    addNews: function (params, access_token, callback) {
        RestClient.post({
            host: 'hy',
            path: '/api/web/v1/announcementList/save',
            access_token:access_token,
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
    deleteNews: function (params, access_token, callback) {
        RestClient.delete({
            host: 'hy',
            path: '/api/web/v1/announcementList/delete/'+params.id,
            access_token:access_token,
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
    updateNews: function (params, access_token, callback) {
        RestClient.put({
            host: 'hy',
            path: '/api/web/v1/announcementList/update',
            access_token:access_token,
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
    getNewsById: function (params,  callback) {
        RestClient.get({
            host: 'hy',
            path: '/api/web/v1/announcementList/get/'+params.id

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
    publishNews: function (params, access_token, callback) {
        RestClient.put({
            host: 'hy',
            path: '/api/web/v1/announcementList/publish/'+params.id,
            access_token:access_token,
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
    getNewsListByOrg : function (params,callback) {
        RestClient.get({
            host: 'hy',
            path: '/api/web/v1/announcementList/listByOrganIdAndPublishStatus',
            params:params
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


Promise.promisifyAll(NewsService, {suffix: "Sync"});

module.exports = NewsService;
