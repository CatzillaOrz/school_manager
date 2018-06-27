/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./college.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getCollegeList',auth.isSignedIn, controller.getCollegeList);
router.post('/addCollege',auth.isSignedIn, controller.addCollege);
router.delete('/deleteCollege',auth.isSignedIn, controller.deleteCollege);
router.put('/updateCollege',auth.isSignedIn, controller.updateCollege);
router.get('/getCollegeById',auth.isSignedIn, controller.getCollegeById);
router.get('/getCollegeDropList',auth.isSignedIn, controller.getCollegeDropList);
router.get('/exportCollege',auth.isSignedIn, controller.exportCollege);

module.exports = router;
