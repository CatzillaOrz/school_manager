/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./practiceMan.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getEntTutorList',auth.isSignedIn, controller.getEntTutorList);
router.get('/getEntTutorInfo',auth.isSignedIn, controller.getEntTutorInfo);
router.post('/addEntTutor',auth.isSignedIn, controller.addEntTutor);
router.delete('/delEntTutor',auth.isSignedIn, controller.delEntTutor);
router.put('/updateEntTutor',auth.isSignedIn, controller.updateEntTutor);
router.get('/getPracticeGroupList',auth.isSignedIn, controller.getPracticeGroupList);

module.exports = router;
