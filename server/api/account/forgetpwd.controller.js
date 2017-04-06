'use strict';

var _ = require('lodash'),
  ForgotPwdService = require('../../services/forgotPwdService'),
  SecurityCode = require('../../middleware/securityCode');

// Get list of things
module.exports = {
  validAccount: function(req, res){
    var account = req.query.account;
    /*if(!SecurityCode.checkSecurityCode(req, req.query.securityCode)){
      res.status(401).json({
        message: '验证码错误，请重新输入.'
      });
      return;
    }*/
    ForgotPwdService.validAccountSync(account)
      .then(function(data){
        res.send(data);
        /*req.session.forgetpwd_email = data.email;
        var _mixed_email = req.session.forgetpwd_email.replace(/.{1,3}\@/, '***@');
        res.json({
          email: _mixed_email
        });*/
      })
      .catch(function(err){

        res.send(err);
        /*res.status(405).json({
          message: err.message
        })*/
      });
  },
  sendEmailValid: function(req, res){
    console.log(req.body);
    var email = req.body.email;
    //var email = req.session.forgetpwd_email;
    if(!email){
      res.status(405).json({
        message: '操作超时，请重新输入帐户信息获取验证方式.'
      });
      return;
    }
    ForgotPwdService.sendEmailValidSync(email)
      .then(function(data){
        res.send(data);
      })
      .catch(function(err){
        res.status(405).json({
          message: err.message
        })
      });
  },
  checkEmailValidCode: function(req, res){
    var code = req.query.code;
    ForgotPwdService.checkEmailValidCodeSync(code)
      .then(function(data){
        res.json(data);
      })
      .catch(function(err){
        res.status(405).json({
          message: err.message
        });
      });
  },
  resetPwd: function(req, res){
    var code = req.body.code,
        password = req.body.password;
    ForgotPwdService.resetPwdSync(code, password)
      .then(function(data){
        res.json(data);
      })
      .catch(function(err){
        res.status(405).json({
          message: err.message
        });
      });
  },
  sendMessageCode: function(req, res){
    var params = {
      phone: req.body.phone,
      module: "resetpassword"
    };
    ForgotPwdService.sendMessageCodeSync(params)
      .then(function(data){
        res.json(data);
      })
      .catch(function(err){
        res.status(405).json({
          message: err.message
        });
      });
  },
  validPhoneCode: function(req, res){
    var params = {
      phone: req.query.phone,
      code : req.query.code,
      module: "resetpassword"
    };
    ForgotPwdService.validPhoneCodeSync(params)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (e) {
        res.status(403).json(e);
      });
  },
  findAndSetPwd: function(req, res){
    ForgotPwdService.findAndSetPwdSync(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (e) {
        res.status(403).json(e);
      });
  }
};
