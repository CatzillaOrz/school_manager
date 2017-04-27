/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./teacher.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getTeacherList',auth.isSignedIn, controller.getTeacherList);
router.post('/addTeacher',auth.isSignedIn, controller.addTeacher);
router.delete('/deleteTeacher',auth.isSignedIn, controller.deleteTeacher);
router.put('/updateTeacher',auth.isSignedIn, controller.updateTeacher);
router.get('/getTeacherById',auth.isSignedIn, controller.getTeacherById);
router.get('/getTeacherDropListOrg',auth.isSignedIn, controller.getTeacherDropListOrg);
router.get('/getSimpleTeachers',auth.isSignedIn, controller.getSimpleTeachers);

module.exports = router;
