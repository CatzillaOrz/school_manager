/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./major.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getMajorList',auth.isSignedIn, controller.getMajorList);


module.exports = router;
