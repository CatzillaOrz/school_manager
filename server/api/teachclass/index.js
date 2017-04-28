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

module.exports = router;
