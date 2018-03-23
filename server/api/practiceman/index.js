/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./practiceMan.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getEntTutorList',auth.isSignedIn, controller.getEntTutorList);
router.get('/getEnterpriseList',auth.isSignedIn, controller.getEnterpriseList);
router.get('/getEntTutorInfo',auth.isSignedIn, controller.getEntTutorInfo);
router.post('/saveEnterprise',auth.isSignedIn, controller.saveEnterprise);
router.post('/updateEnterprise',auth.isSignedIn, controller.updateEnterprise);
router.post('/addEntTutor',auth.isSignedIn, controller.addEntTutor);
router.post('/addPracticeGroup',auth.isSignedIn, controller.addPracticeGroup);
router.post('/getMissionList',auth.isSignedIn, controller.getMissionList);
router.post('/getMissionDetail',auth.isSignedIn, controller.getMissionDetail);
router.post('/addPracticeTask',auth.isSignedIn, controller.addPracticeTask);
router.delete('/delEntTutor',auth.isSignedIn, controller.delEntTutor);
router.delete('/delEnterprise',auth.isSignedIn, controller.delEnterprise);
router.put('/updateEntTutor',auth.isSignedIn, controller.updateEntTutor);
router.get('/getStudentTaskDetail',auth.isSignedIn, controller.getStudentTaskDetail);
router.get('/getPracticeGroupList',auth.isSignedIn, controller.getPracticeGroupList);
router.get('/getPracticeGroupInfo',auth.isSignedIn, controller.getPracticeGroupInfo);
router.put('/updatePracticeGroup',auth.isSignedIn, controller.updatePracticeGroup);
router.put('/updatePracticeTask',auth.isSignedIn, controller.updatePracticeTask);
router.delete('/delPracticeGroup',auth.isSignedIn, controller.delPracticeGroup);
router.delete('/delPracticeGroupByGId',auth.isSignedIn, controller.delPracticeGroupByGId);
router.get('/isExistInGroup',auth.isSignedIn, controller.isExistInGroup);
router.post('/getPeopleStats',auth.isSignedIn, controller.getPeopleStats);
router.post('/getTaskStats',auth.isSignedIn, controller.getTaskStats);
router.get('/getCompanyName',auth.isSignedIn, controller.getCompanyName);
router.post('/getPeopleDetail',auth.isSignedIn, controller.getPeopleDetail);
router.get('/exportPeople',auth.isSignedIn, controller.exportPeople);
router.get('/exportPeopleStats',auth.isSignedIn, controller.exportPeopleStats);
router.get('/exportTaskStats',auth.isSignedIn, controller.exportTaskStats);
router.get('/getWeekTaskList',auth.isSignedIn, controller.getWeekTaskList);
router.get('/getTaskList',auth.isSignedIn, controller.getTaskList);
router.put('/putWeekTask',auth.isSignedIn, controller.putWeekTask);
router.put('/updateTask',auth.isSignedIn, controller.updateTask);
router.get('/getWeekTaskDetail',auth.isSignedIn, controller.getWeekTaskDetail);
router.get('/getTaskDetail',auth.isSignedIn, controller.getTaskDetail);
router.delete('/deleteWeekTask',auth.isSignedIn, controller.deleteWeekTask);
router.delete('/deleteTask',auth.isSignedIn, controller.deleteTask);
router.post('/deleteTaskDetail',auth.isSignedIn, controller.deleteTaskDetail);
router.post('/addWeekTask',auth.isSignedIn, controller.addWeekTask);
router.post('/addTask',auth.isSignedIn, controller.addTask);
router.get('/getGrouplistByOrgId',auth.isSignedIn, controller.getGrouplistByOrgId);

module.exports = router;
