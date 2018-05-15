/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./statistics.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.post('/getStuProcess',auth.isSignedIn, controller.getStuProcess);
router.post('/getStuJournal',auth.isSignedIn, controller.getStuJournal);

module.exports = router;
