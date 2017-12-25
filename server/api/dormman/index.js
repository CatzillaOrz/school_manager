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


module.exports = router;
