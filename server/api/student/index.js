/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./student.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getStudentList',auth.isSignedIn, controller.getStudentList);
router.post('/addStudent',auth.isSignedIn, controller.addStudent);
router.delete('/deleteStudent',auth.isSignedIn, controller.deleteStudent);
router.put('/updateStudent',auth.isSignedIn, controller.updateStudent);
router.get('/getStudentById',auth.isSignedIn, controller.getStudentById);
router.get('/getSimpleStudents',auth.isSignedIn, controller.getSimpleStudents);
router.put('/updateStudentToClasses',auth.isSignedIn, controller.updateStudentToClasses);
router.get('/getImpResult',auth.isSignedIn, controller.getImpResult);
router.get('/getNewImpResult',auth.isSignedIn, controller.getNewImpResult);
router.get('/exportData',auth.isSignedIn, controller.exportData);
router.get('/getNewStudent',auth.isSignedIn, controller.getNewStudent);


module.exports = router;
