/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./dormMan.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getDormBuildings',auth.isSignedIn, controller.getDormBuildings);
router.get('/getDormBuildingInfo',auth.isSignedIn, controller.getDormBuildingInfo);
router.post('/addDormBuilding',auth.isSignedIn, controller.addDormBuilding);
router.delete('/delDormBuilding',auth.isSignedIn, controller.delDormBuilding);
router.put('/updateDormBuilding',auth.isSignedIn, controller.updateDormBuilding);

router.get('/getDorms',auth.isSignedIn, controller.getDorms);
router.get('/getDormInfo',auth.isSignedIn, controller.getDormInfo);
router.post('/addDorm',auth.isSignedIn, controller.addDorm);
router.delete('/delDorm',auth.isSignedIn, controller.delDorm);
router.put('/updateDorm',auth.isSignedIn, controller.updateDorm);

router.get('/validationDorm',auth.isSignedIn, controller.validationDorm);
router.get('/getDistedMajors',auth.isSignedIn, controller.getDistedMajors);
router.get('/getDormStus',auth.isSignedIn, controller.getDormStus);
router.put('/closeDorms',auth.isSignedIn, controller.closeDorms);
router.post('/assignDorms',auth.isSignedIn, controller.assignDorms);
router.post('/updateDistedInfo',auth.isSignedIn, controller.updateDistedInfo);
router.get('/getDormDistedInfo',auth.isSignedIn, controller.getDormDistedInfo);
router.put('/openDorms',auth.isSignedIn, controller.openDorms);
router.post('/distedBed',auth.isSignedIn, controller.distedBed);
router.get('/getStusByMajor',auth.isSignedIn, controller.getStusByMajor);
router.delete('/delBedStu',auth.isSignedIn, controller.delBedStu);

module.exports = router;
