'use strict';

var express = require('express');
var controller = require('./geo.controller');
var auth = require('../../middleware/auth');

var router = express.Router();
router.get('/getOrgan', auth.isSignedIn,controller.getOrgan);
router.get('/getAttendancestatistics', auth.isSignedIn,controller.getAttendancestatistics);
router.get('/departmentsummary', auth.isSignedIn,controller.departmentsummary);
router.get('/attendancerate', auth.isSignedIn,controller.attendancerate);
router.get('/realtimestatistics', auth.isSignedIn,controller.realtimestatistics);
router.get('/termtoclassrate', auth.isSignedIn,controller.termtoclassrate);
router.get('/classranking', auth.isSignedIn,controller.classranking);
router.get('/teacherranking', auth.isSignedIn,controller.teacherranking);
router.get('/comprehensivepraise', auth.isSignedIn,controller.comprehensivepraise);
module.exports = router;