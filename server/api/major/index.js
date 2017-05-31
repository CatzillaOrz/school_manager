/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./major.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getMajorList', controller.getMajorList);
router.post('/addMajor',auth.isSignedIn, controller.addMajor);
router.delete('/deleteMajor',auth.isSignedIn, controller.deleteMajor);
router.put('/updateMajor',auth.isSignedIn, controller.updateMajor);
router.get('/getMajorById',auth.isSignedIn, controller.getMajorById);
router.get('/getMajorDropList',auth.isSignedIn, controller.getMajorDropList);
module.exports = router;
