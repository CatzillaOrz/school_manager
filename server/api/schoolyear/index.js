/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./schoolYear.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getSchoolYearList',auth.isSignedIn, controller.getSchoolYearList);
router.post('/addSchoolYear',auth.isSignedIn, controller.addSchoolYear);
router.delete('/deleteSchoolYear',auth.isSignedIn, controller.deleteSchoolYear);
router.put('/updateSchoolYear',auth.isSignedIn, controller.updateSchoolYear);
router.get('/getSchoolYearById',auth.isSignedIn, controller.getSchoolYearById);
router.get('/getSchoolYearDropList',auth.isSignedIn, controller.getSchoolYearDropList);
router.post('/addPeriod',auth.isSignedIn, controller.addPeriod);
router.get('/getPeriodList',auth.isSignedIn, controller.getPeriodList);
router.put('/updatePeriod',auth.isSignedIn, controller.updatePeriod);
router.delete('/deletePeriod',auth.isSignedIn, controller.deletePeriod);
router.get('/getPeriodById',auth.isSignedIn, controller.getPeriodById);
router.get('/getTeachWeekList',auth.isSignedIn, controller.getTeachWeekList);

router.get('/getSemesterList',auth.isSignedIn, controller.getSemesterList);
router.get('/getSemesterById',auth.isSignedIn, controller.getSemesterById);
router.post('/addSemester',auth.isSignedIn, controller.addSemester);
router.put('/updateSemester',auth.isSignedIn, controller.updateSemester);
router.delete('/deleteTerm',auth.isSignedIn, controller.deleteTerm);

router.get('/getCurrentWeek',auth.isSignedIn, controller.getCurrentWeek);
router.get('/getWeekList',auth.isSignedIn, controller.getWeekList);
router.get('/getCurrentPeriod',auth.isSignedIn, controller.getCurrentPeriod);
router.post('/addWeek',auth.isSignedIn, controller.addWeek);
router.delete('/deleteWeek',auth.isSignedIn, controller.deleteWeek);

module.exports = router;
