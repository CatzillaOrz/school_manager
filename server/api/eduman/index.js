/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./eduMan.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getEvaQuesList',auth.isSignedIn, controller.getEvaQuesList);
router.post('/addEvaQues',auth.isSignedIn, controller.addEvaQues);
router.delete('/deleteEvaQues',auth.isSignedIn, controller.deleteEvaQues);
router.put('/updateEvaQues',auth.isSignedIn, controller.updateEvaQues);
router.get('/getEvaQuesInfo',auth.isSignedIn, controller.getEvaQuesInfo);
router.get('/getEvaQuesDist',auth.isSignedIn, controller.getEvaQuesDist);
router.get('/getEvaQuesUnDist',auth.isSignedIn, controller.getEvaQuesUnDist);
router.get('/getEvaQuesNormalStatic',auth.isSignedIn, controller.getEvaQuesNormalStatic);
router.get('/getEvaQuesStaticInfo',auth.isSignedIn, controller.getEvaQuesStaticInfo);
router.get('/getEvaQuesUnNormalStatic',auth.isSignedIn, controller.getEvaQuesUnNormalStatic);
router.get('/getEvaQuesResult',auth.isSignedIn, controller.getEvaQuesResult);
router.post('/distQuestionaire',auth.isSignedIn, controller.distQuestionaire);
router.get('/getTeachClassAttendList',auth.isSignedIn, controller.getTeachClassAttendList);
router.get('/getClassAttendList',auth.isSignedIn, controller.getClassAttendList);
router.get('/getStudentAttendByTeachClassId',auth.isSignedIn, controller.getStudentAttendByTeachClassId);
router.get('/getStudentAttendByClassId',auth.isSignedIn, controller.getStudentAttendByClassId);
router.get('/teachClassAttendExport',auth.isSignedIn, controller.teachClassAttendExport);
router.get('/classAttendExport',auth.isSignedIn, controller.classAttendExport);
router.get('/teachClassAttendInfoExport',auth.isSignedIn, controller.teachClassAttendInfoExport);
router.get('/classAttendInfoExport',auth.isSignedIn, controller.classAttendInfoExport);
router.get('/teachClassTrend',auth.isSignedIn, controller.teachClassTrend);
router.get('/teachClassAttendExportTend',auth.isSignedIn, controller.teachClassAttendExportTend);
router.get('/getElecFenceList',auth.isSignedIn, controller.getElecFenceList);
router.get('/getElecFenceHistory',auth.isSignedIn, controller.getElecFenceHistory);
router.get('/getElecFenceCurrent',auth.isSignedIn, controller.getElecFenceCurrent);
router.get('/getElecSetInfo',auth.isSignedIn, controller.getElecSetInfo);
router.post('/setElecFenceInfo',auth.isSignedIn, controller.setElecFenceInfo);
router.post('/notice',auth.isSignedIn, controller.notice);
router.post('/switchElec',auth.isSignedIn, controller.switchElec);
router.get('/classTrend',auth.isSignedIn, controller.classTrend);
router.get('/classAttendExportTrend',auth.isSignedIn, controller.classAttendExportTrend);
router.get('/getCurrentSemester',auth.isSignedIn, controller.getCurrentSemester);
router.get('/getAttendacneSettingList',auth.isSignedIn, controller.getAttendacneSettingList);
router.get('/getTeachingclassAttendByTeacher',auth.isSignedIn, controller.getTeachingclassAttendByTeacher);
router.get('/getAttendanceByPeriod',auth.isSignedIn, controller.getAttendanceByPeriod);
router.get('/getClassAttendanceGroupByPro',auth.isSignedIn, controller.getClassAttendanceGroupByPro);
router.get('/getClassAttendanceGroupByclass',auth.isSignedIn, controller.getClassAttendanceGroupByclass);
router.get('/getClassAttendanceGroupByCollege',auth.isSignedIn, controller.getClassAttendanceGroupByCollege);
router.get('/exportTeachingclassByTeacher',auth.isSignedIn, controller.exportTeachingclassByTeacher);
router.get('/exportClassAttendanceByPeriod',auth.isSignedIn, controller.exportClassAttendanceByPeriod);
router.get('/exportClassAttendanceGroupByCollege',auth.isSignedIn, controller.exportClassAttendanceGroupByCollege);
router.get('/exportClassAttendanceGroupByPro',auth.isSignedIn, controller.exportClassAttendanceGroupByPro);
router.get('/exportClassAttendanceGroupByclass',auth.isSignedIn, controller.exportClassAttendanceGroupByclass);
router.put('/updateAttendacne',auth.isSignedIn, controller.updateAttendacne);
module.exports = router;
