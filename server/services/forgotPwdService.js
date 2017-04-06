'use strict';
/**
 * 忘记密码Service
 * by 孙磊
 */
var Promise = require('bluebird'),
  RestClient = require('./helper/RestClient'),
  ErrorCode = require('../common/errorCode');

var ForgotPwdService = {
  sendEmailValid: function(email, callback){
    RestClient.post({
      path: 'api/web/v1/users/checkuser',
      entity: {
        email: email
      }
    }).then(function (res) {
      if (res.status.code == 201) {
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
  checkEmailValidCode: function(code, callback){
    RestClient.get({
      path: 'api/web/v1/users/checkcode',
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
  resetPwd: function(code, password, callback){
    RestClient.put({
      path: 'api/web/v1/users/resetpassword',
      entity: {
        code: code,
        password: password
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
  validAccount: function(account, callback){
    RestClient.get({
      //path: 'api/web/v1/users/checkuserexist',
      path: 'api/web/v1/users/checkuserisexist',
      params: {
        account: account
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
  sendMessageCode:function(params, callback){
    RestClient.post({
      path: 'api/web/v1/users/sendmessagecode',
      entity: params
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
  validPhoneCode: function(params, callback){
    RestClient.get({
      path: 'api/web/v1/users/validmessagecode',
      params: params
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
  findAndSetPwd: function(params, callback){
    RestClient.post({
      path: 'api/web/v2/common/resetpassword',
      entity: params
    }).then(function (res) {
        if (res.status.code == 200) {
          if(res.entity.success == true){
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
  }
};

Promise.promisifyAll(ForgotPwdService, {suffix: "Sync"});

module.exports = ForgotPwdService;
