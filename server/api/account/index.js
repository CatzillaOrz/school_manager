'use strict';

var express = require('express');
var controller = require('./account.controller');
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
/**
 * 邮箱验证
 */
router.put('/validemail', controller.validEmail);

module.exports = router;
