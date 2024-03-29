/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./statistics.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.post('/stuReport',auth.isSignedIn, controller.stuReport);
router.post('/studentAttending',auth.isSignedIn, controller.studentAttending);
router.post('/teachingSummary',auth.isSignedIn, controller.teachingSummary);
router.post('/getAchievementList',auth.isSignedIn, controller.getAchievementList);
router.post('/getImpartProcess',auth.isSignedIn, controller.getImpartProcess);
router.post('/getStudentActive',auth.isSignedIn, controller.getStudentActive);
router.post('/stuRoutineCount',auth.isSignedIn, controller.stuRoutineCount);
router.post('/stuRoutineDetail',auth.isSignedIn, controller.stuRoutineDetail);
router.post('/getStuProcess',auth.isSignedIn, controller.getStuProcess);
router.post('/getStuJournal',auth.isSignedIn, controller.getStuJournal);
router.post('/getEnterpriseDetail',auth.isSignedIn, controller.getEnterpriseDetail);
router.get('/exportStuProcess',auth.isSignedIn, controller.exportStuProcess);
router.get('/exportStuJournal',auth.isSignedIn, controller.exportStuJournal);
router.get('/exportEnterpriseDetail',auth.isSignedIn, controller.exportEnterpriseDetail);
router.get('/exportStudentActive',auth.isSignedIn, controller.exportStudentActive);
router.get('/exportStudentAttending',auth.isSignedIn, controller.exportStudentAttending);
router.get('/exportStuReport',auth.isSignedIn, controller.exportStuReport);
router.get('/exportTeachingSummary',auth.isSignedIn, controller.exportTeachingSummary);
router.get('/exportStuRoutineCount',auth.isSignedIn, controller.exportStuRoutineCount);
router.get('/exportStuRoutineDetail',auth.isSignedIn, controller.exportStuRoutineDetail);
router.get('/exportStuScore',auth.isSignedIn, controller.exportStuScore);
router.get('/exportImpartProcess',auth.isSignedIn, controller.exportImpartProcess);

module.exports = router;
