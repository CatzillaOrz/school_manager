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
router.get('/lookComment',auth.isSignedIn, controller.lookComment);
router.get('/getEvaQuesStaticInfo',auth.isSignedIn, controller.getEvaQuesStaticInfo);
router.get('/getEvaQuesUncompleteStu',auth.isSignedIn, controller.getEvaQuesUncompleteStu);
router.get('/exportQuesResult',auth.isSignedIn, controller.exportQuesResult);
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
router.get('/getAttendListByCondition',auth.isSignedIn, controller.getAttendListByCondition);
router.get('/getAttendChangeLog',auth.isSignedIn, controller.getAttendChangeLog);
router.put('/updateAttend',auth.isSignedIn, controller.updateAttend);
router.get('/getAttendStopLogs',auth.isSignedIn, controller.getAttendStopLogs);
router.get('/getInsRollCallList',auth.isSignedIn, controller.getInsRollCallList);
router.get('/getClassRollCallDetails',auth.isSignedIn, controller.getClassRollCallDetails);
router.get('/exportRollCallInfo',auth.isSignedIn, controller.exportRollCallInfo);
router.get('/getTeachClassDataList',auth.isSignedIn, controller.getTeachClassDataList);
router.get('/getCollageDataList',auth.isSignedIn, controller.getCollageDataList);
router.get('/collageDataExport',auth.isSignedIn, controller.collageDataExport);
router.get('/teachClassDataExport',auth.isSignedIn, controller.teachClassDataExport);

//教学督导
router.get('/getTeachingSupervisorList',auth.isSignedIn, controller.getTeachingSupervisorList);
router.get('/getTeachingSupervisorInfo',auth.isSignedIn, controller.getTeachingSupervisorInfo);
router.get('/getTeachingSupervisorTem',auth.isSignedIn, controller.getTeachingSupervisorTem);
router.put('/updateTeachingSupervisor',auth.isSignedIn, controller.updateTeachingSupervisor);
router.post('/addTeachingSupervisor',auth.isSignedIn, controller.addTeachingSupervisor);
router.post('/addTeachingTemplateStu',auth.isSignedIn, controller.addTeachingTemplateStu);
router.get('/exportTea',auth.isSignedIn, controller.exportTea);
router.get('/exportStu',auth.isSignedIn, controller.exportStu);

router.post('/distTeaching',auth.isSignedIn, controller.distTeaching);
router.get('/getDistedTeaching',auth.isSignedIn, controller.getDistedTeaching);
router.post('/delTeaching',auth.isSignedIn, controller.delTeaching);
router.get('/getDistTeaching',auth.isSignedIn, controller.getDistTeaching);
router.get('/getSamePartList',auth.isSignedIn, controller.getSamePartList);
router.post('/saveWeight',auth.isSignedIn, controller.saveWeight);

module.exports = router;
