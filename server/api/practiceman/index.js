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
router.post('/addPracticeGroup',auth.isSignedIn, controller.addPracticeGroup);
router.delete('/delEntTutor',auth.isSignedIn, controller.delEntTutor);
router.put('/updateEntTutor',auth.isSignedIn, controller.updateEntTutor);
router.get('/getPracticeGroupList',auth.isSignedIn, controller.getPracticeGroupList);
router.get('/getPracticeGroupInfo',auth.isSignedIn, controller.getPracticeGroupInfo);
router.put('/updatePracticeGroup',auth.isSignedIn, controller.updatePracticeGroup);
router.delete('/delPracticeGroup',auth.isSignedIn, controller.delPracticeGroup);
router.get('/isExistInGroup',auth.isSignedIn, controller.isExistInGroup);
router.post('/getPeopleStats',auth.isSignedIn, controller.getPeopleStats);
router.post('/getTaskStats',auth.isSignedIn, controller.getTaskStats);
router.get('/getCompanyName',auth.isSignedIn, controller.getCompanyName);
router.post('/getPeopleDetail',auth.isSignedIn, controller.getPeopleDetail);
router.get('/exportPeople',auth.isSignedIn, controller.exportPeople);
router.get('/exportPeopleStats',auth.isSignedIn, controller.exportPeopleStats);
router.get('/exportTaskStats',auth.isSignedIn, controller.exportTaskStats);

module.exports = router;
