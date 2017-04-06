'use strict';

var express = require('express');
var controller = require('./account.controller');
var fpwdController = require('./forgetpwd.controller');
var auth = require('../../middleware/auth');

var router = express.Router();

router.get('/', auth.isSignedIn, controller.index);
router.post('/signout', auth.isSignedIn, controller.signOut);

/**
 * 注册：POST
 * 1、手机注册
 *    url: /signup/phone
 * 2、邮箱注册
 *    url: /signup/email
 */
// router.post('/signup/:type', controller.signUp);
router.post('/signup_send_phone_code', controller.sendPhoneCode);
router.get('/signup_valid_phone_code', controller.validPhoneCode);

/*
* 忘记密码
* */
router.get('/forget/validAccount', fpwdController.validAccount);
router.post('/forget/sendEmailValid', fpwdController.sendEmailValid);
router.get('/forget/checkEmailValidCode', fpwdController.checkEmailValidCode);
router.put('/forget/resetPwd', fpwdController.resetPwd);
router.post('/forget/sendMessageCode', fpwdController.sendMessageCode);
router.get('/forget/validPhoneCode', fpwdController.validPhoneCode);
router.post('/forget/findAndSetPwd', fpwdController.findAndSetPwd);
/**
 * 邮箱验证
 */
router.put('/validemail', controller.validEmail);

module.exports = router;
