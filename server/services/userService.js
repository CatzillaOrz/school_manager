'use strict';

/*
 * 个人资料服务
 * 查询、更新
 **/

var Promise = require('bluebird'),
  RestClient = require('./helper/RestClient'),
  Config = require('../config/environment'),
  ErrorCode = require('../common/errorCode');

var UserService = {
  //更新
    updateUser: function (access_token, params, callback){
        RestClient.post({
            path: '/api/account/update',
            access_token: access_token,
            entity: params
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
    updatePassword: function (access_token, params, callback){
        RestClient.put({
            path: '/api/web/v1/users/doupdatepassword',
            access_token: access_token,
            entity: params
        })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                }else {
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
    updatePasswordBindPhone: function (access_token, params, callback){
        RestClient.put({
            path: '/api/web/v1/users/bindingphoneandupdatepwd',
            access_token: access_token,
            entity: params
        })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                }else {
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
    sendPhoneCode: function (access_token, callback){
        RestClient.put({
            path: '/api/web/v1/users/sendupdatepasswordcode',
            access_token: access_token
        })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                }else {
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
    sendBindPhoneCode: function (access_token, params, callback){
        RestClient.put({
            path: '/api/web/v1/users/sendbindingphonecode',
            access_token: access_token,
            entity: params
        })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                }else{
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
    sendUnBindPhoneCode: function (access_token, callback){
        RestClient.put({
            path: '/api/web/v1/users/sendunbindingphonecode',
            access_token: access_token
        })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                }else {
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
    bindPhone: function (access_token, params, callback){
        RestClient.put({
            path: '/api/web/v1/users/dobindingphone',
            access_token: access_token,
            entity: params
        })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                }else {
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
    unBindPhone: function (access_token, params, callback){
        RestClient.put({
            path: '/api/web/v1/users/dounbindingphone',
            access_token: access_token,
            entity: params
        })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                }else {
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
    sendBindMailCode: function (access_token, params, callback){
        RestClient.put({
            path: '/api/web/v1/users/sendbindingmailcode',
            access_token: access_token,
            entity: params
        })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                }else {
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
    sendUnBindMailCode: function (access_token, params, callback){
        RestClient.put({
            path: '/api/web/v1/users/sendunbindingmailcode',
            access_token: access_token,
            entity: params
        })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                }else {
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
    bindMail: function (access_token, params, callback){
        RestClient.put({
            path: '/api/web/v1/users/dobindingmail',
            access_token: access_token,
            entity: params
        })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                }else {
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
    unBindMail: function (access_token, params, callback){
        RestClient.put({
            path: '/api/web/v1/users/dounbindingmail',
            access_token: access_token,
            entity: params
        })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                }else {
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
    vildCode: function (access_token, params, callback){
        RestClient.get({
            path: '/api/web/v1/users/validatorcode?code='+params.code + '&sign='+params.sign,
            access_token: access_token
        })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                }else {
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
    changePhone: function (access_token, params, callback){
        RestClient.put({
            path: '/api/web/v1/users/unbindingandbindingnewphone',
            access_token: access_token,
            entity: params
        })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                }else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function(err){
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    }
};

Promise.promisifyAll(UserService, {suffix: "Sync"});

module.exports = UserService;
