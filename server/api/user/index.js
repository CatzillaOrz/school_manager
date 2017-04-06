'use strict';

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../middleware/auth');

var router = express.Router();

router.post('/updateUser', auth.isSignedIn, controller.updateUser);
router.put('/updatePassword', auth.isSignedIn, controller.updatePassword);
router.put('/updatePasswordBindPhone', auth.isSignedIn, controller.updatePasswordBindPhone);
router.put('/sendBindPhoneCode', auth.isSignedIn, controller.sendBindPhoneCode);
router.put('/sendPhoneCode', auth.isSignedIn, controller.sendPhoneCode);
router.put('/sendUnBindPhoneCode', auth.isSignedIn, controller.sendUnBindPhoneCode);
router.put('/bindPhone', auth.isSignedIn, controller.bindPhone);
router.put('/unBindPhone', auth.isSignedIn, controller.unBindPhone);
router.put('/sendBindMailCode', auth.isSignedIn, controller.sendBindMailCode);
router.put('/sendUnBindMailCode', auth.isSignedIn, controller.sendUnBindMailCode);
router.put('/bindMail', auth.isSignedIn, controller.bindMail);
router.put('/unBindMail', auth.isSignedIn, controller.unBindMail);
router.get('/vildCode', auth.isSignedIn, controller.vildCode);
router.put('/changePhone', auth.isSignedIn, controller.changePhone);

module.exports = router;
