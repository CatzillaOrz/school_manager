/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./period.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getPeriodList',auth.isSignedIn, controller.getPeriodList);
router.post('/addPeriod',auth.isSignedIn, controller.addPeriod);
router.delete('/deletePeriod',auth.isSignedIn, controller.deletePeriod);
router.put('/updatePeriod',auth.isSignedIn, controller.updatePeriod);
router.get('/getPeriodById',auth.isSignedIn, controller.getPeriodById);
router.get('/getPeriodDropList',auth.isSignedIn, controller.getPeriodDropList);
router.post('/addSemesterWeek',auth.isSignedIn, controller.addSemesterWeek);
router.post('/addCoursePeriod',auth.isSignedIn, controller.addCoursePeriod);
router.post('/getCoursePeriodList',auth.isSignedIn, controller.getCoursePeriodList);



module.exports = router;
