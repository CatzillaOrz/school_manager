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

module.exports = router;
