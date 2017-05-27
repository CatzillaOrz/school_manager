/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./teachClass.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getTeachClassList', auth.isSignedIn, controller.getTeachClassList);
router.post('/addTeachClass', auth.isSignedIn, controller.addTeachClass);
router.delete('/deleteTeachClass', auth.isSignedIn, controller.deleteTeachClass);
router.put('/updateTeachClass', auth.isSignedIn, controller.updateTeachClass);
router.get('/getTeachClassById', auth.isSignedIn, controller.getTeachClassById);
router.get('/getTeachClassDropListOrg', auth.isSignedIn, controller.getTeachClassDropListOrg);
router.get('/getTeachClassTeacherList', auth.isSignedIn, controller.getTeachClassTeacherList);
router.get('/getTeachClassStudentList', auth.isSignedIn, controller.getTeachClassStudentList);
router.delete('/deleteTeachClassTeacher', auth.isSignedIn, controller.deleteTeachClassTeacher);
router.delete('/deleteTeachClassStudent', auth.isSignedIn, controller.deleteTeachClassStudent);
router.get('/getTeachClassClassesListById', auth.isSignedIn, controller.getTeachClassClassesListById);
router.post('/addTeachClassClasses', auth.isSignedIn, controller.addTeachClassClasses);
router.delete('/deleteTeachClassClasses', auth.isSignedIn, controller.deleteTeachClassClasses);
router.post('/addTeachClassTeacher', auth.isSignedIn, controller.addTeachClassTeacher);
router.post('/addTeachClassStudent', auth.isSignedIn, controller.addTeachClassStudent);
router.delete('/deleteTeachClassOneStudent', auth.isSignedIn, controller.deleteTeachClassOneStudent);
router.get('/getTeachClassClassesList', auth.isSignedIn, controller.getTeachClassClassesList);
router.get('/getCourseSchedule', auth.isSignedIn, controller.getCourseSchedule);
router.post('/saveCourseSchedule', auth.isSignedIn, controller.saveCourseSchedule);
router.delete('/delCourseSchedule', auth.isSignedIn, controller.delCourseSchedule);
router.put('/getCourseSchedules', auth.isSignedIn, controller.getCourseSchedules);
router.post('/saveCourseSchedules', auth.isSignedIn, controller.saveCourseSchedules);
//getTeachClassClassesList
module.exports = router;
