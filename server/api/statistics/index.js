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
router.post('/getStudentActive',auth.isSignedIn, controller.getStudentActive);
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

module.exports = router;
