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
router.post('/addSemesterWeek',auth.isSignedIn, controller.addSemesterWeek);
router.post('/addPeriod',auth.isSignedIn, controller.addPeriod);
router.get('/getPeriodList',auth.isSignedIn, controller.getPeriodList);
router.put('/updatePeriod',auth.isSignedIn, controller.updatePeriod);
router.delete('/deletePeriod',auth.isSignedIn, controller.deletePeriod);
router.delete('/deleteTerm',auth.isSignedIn, controller.deleteTerm);
router.get('/getPeriodById',auth.isSignedIn, controller.getPeriodById);
router.get('/getTeachWeekList',auth.isSignedIn, controller.getTeachWeekList);
router.get('/getSemesterList',auth.isSignedIn, controller.getSemesterList);
router.get('/getSemesterById',auth.isSignedIn, controller.getSemesterById);
router.get('/getCurrentWeek',auth.isSignedIn, controller.getCurrentWeek);


module.exports = router;
