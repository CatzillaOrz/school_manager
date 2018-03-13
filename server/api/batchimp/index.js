/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./batchimp.controller');
var auth = require('../../middleware/auth');

var router = express.Router();

router.get('/getNormalImpResult',auth.isSignedIn, controller.getNormalImpResult);
router.get('/getTimetableImpResult',auth.isSignedIn, controller.getTimetableImpResult);

module.exports = router;
