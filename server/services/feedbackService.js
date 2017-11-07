/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';



var Promise = require('bluebird'),
    RestClient = require('./helper/RestClient'),
    Config = require('../config/environment'),
    ErrorCode  = require('../common/errorCode');

var FeedbackService = {
    getFeedbackList: function (params, access_token, callback) {
        RestClient.get({
            host: 'hy',
            path: '/api/web/v1/newfeedback/findAllPage',
            access_token: access_token,
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
    findFeedbackById: function (params,callback) {
        RestClient.get({
            host: 'hy',
            path: '/api/web/v1/newfeedback/findFeedbackById/'+params.id,
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
    findCommentById: function (params, access_token, callback) {
        RestClient.get({
            host: 'hy',
            path: '/api/web/v1/newfeedback/findComment/'+params.id,
            access_token: access_token,
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
    saveComment: function (params, access_token, callback) {
        RestClient.post({
            host: 'hy',
            path: '/api/web/v1/newfeedback/saveComment',
            access_token: access_token,

            entity: params
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
    saveCComment: function (params, access_token, callback) {
        RestClient.post({
            host: 'hy',
            path: '/api/web/v1/newfeedback/saveCComment',
            access_token: access_token,
            entity: params
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
    delCommentById: function (params, access_token, callback) {
        RestClient.delete({
            host: 'hy',
            path: '/api/web/v1/newfeedback/deleteComment/'+params.id,
            access_token: access_token,
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
    delCCommentById: function (params, access_token, callback) {
        RestClient.delete({
            host: 'hy',
            path: '/api/web/v1/newfeedback/deleteCComment/'+params.id,
            access_token: access_token,
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


Promise.promisifyAll(FeedbackService, {suffix: "Sync"});

module.exports = FeedbackService;
