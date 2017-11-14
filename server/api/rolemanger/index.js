/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./roleManager.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getDistedRoleList',auth.isSignedIn, controller.getDistedRoleList);
router.post('/distRole',auth.isSignedIn, controller.distRole);
router.delete('/cancleRole',auth.isSignedIn, controller.cancleRole);

module.exports = router;
