'use strict';

/*
 * 账户服务
 * 登录、注册、登出、找回密码
 * Create By 孙磊
 * */

var Promise = require('bluebird'),
  RestClient = require('./helper/RestClient'),
  Config = require('../config/environment'),
  ErrorCode = require('../common/errorCode');

// 用户调用短信接口时，告诉短信接口是那个模块在调用，约定值
var API_PHONE_MODULE_FLAG = 'web-register';

var AccountService = {
  /*
   * 登录
   * */
  signIn: function (signInInfo, callback) {
    var b = new Buffer(Config.secrets.client_id + ":mySecretOAuthSecret");
    RestClient.post({
      path: '/oauth/token',
      params: {
        username: signInInfo.username,
        password: signInInfo.password,
        grant_type: 'password',
        scope: 'read write',
        client_secret: 'mySecretOAuthSecret',
        client_id: Config.secrets.client_id
      },
      headers: {
        Authorization: "Basic " + b.toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function (res) {
      if (res.status.code == 200) {
        callback(null, res.entity);
      }else if(res.status.code == 400){
        callback(new Error('用户不存在或密码错误。'));
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
  refreshToken: function(refresh_token, callback){
    var b = new Buffer(Config.secrets.client_id + ":mySecretOAuthSecret");
    RestClient.post({
      path: '/oauth/token',
      params: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      headers: {
        Authorization: "Basic " + b.toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(function (res) {
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
  /*
   * 登出
   * */
  signOut: function (access_token, callback) {
    RestClient.post({
      path: '/api/logout',
      access_token: access_token
    }).then(function (res) {
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
  /*
   * 注册
   * */
  signUp: function (regType, params, callback) {
    var url = '/api/web/v1/users/register/phone';
    if(regType == 'email'){
      url = '/api/web/v1/users/register/email';
    }
    RestClient.post({
      path: url,
      entity: params
    })
      .then(function(res){
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
    getAccount: function (access_token, callback) {
        RestClient.get({
             //host:'dd',
            path: '/api/web/v1/users/userinfo',
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                if(res.entity.role && typeof res.entity.role == 'string'){
                    res.entity.roleNames = res.entity.role.split(',');
                }
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
  validEmail: function (code, callback) {
    RestClient.put({
      path: '/api/web/v1/users/validemail',
      params: {
        code: code
      }
    }).then(function (res) {
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
  sendPhoneCode: function(phoneNumber, callback){
    RestClient.post({
      path: '/api/web/v1/users/sendmessagecode',
      entity: {
        phone: phoneNumber,
        module: API_PHONE_MODULE_FLAG
      }
    }).then(function (res) {
      if (res.status.code == 200) {
        if(res.entity.success == 'true'){
          callback(null, res.entity);
        }else{
          ErrorCode.getErrorSync(res.entity.errorcode)
          .then(function(err){
            callback(err);
          });
        }
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
  validPhoneCode: function(phoneNumber, code, callback){
    RestClient.post({
      path: '/api/web/v1/users/validmessagecode',
      entity: {
        phone: phoneNumber,
        code: code,
        module: API_PHONE_MODULE_FLAG
      }
    }).then(function (res) {
      if (res.status.code == 200) {
        if(res.entity.success == 'true'){
          callback(null, res.entity);
        }else{
          ErrorCode.getErrorSync(res.entity.errorcode)
          .then(function(err){
            callback(err);
          });
        }
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
    resetPassword: function(id,access_token,callback){
        RestClient.put({
            path: '/api/account/resetPassword/'+id,
            access_token:access_token
        }).then(function (res) {
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
    unlockBindPhoneAndResetPassword: function(id,access_token,callback){
        RestClient.put({
            path: '/api/web/v1/users/unbindphoneandpwdbyid',
            access_token:access_token,
            body:{id:id}
        }).then(function (res) {
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

Promise.promisifyAll(AccountService, {suffix: "Sync"});

module.exports = AccountService;
