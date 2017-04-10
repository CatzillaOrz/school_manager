/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./class.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getClassList',auth.isSignedIn, controller.getClassList);


module.exports = router;
