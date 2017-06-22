/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

var express = require('express');
var controller = require('./eduman.controller');
var auth = require('../../middleware/auth');

var router = express.Router();


router.get('/getEvaQuesList',auth.isSignedIn, controller.getEvaQuesList);
router.post('/addEvaQues',auth.isSignedIn, controller.addEvaQues);
router.delete('/deleteEvaQues',auth.isSignedIn, controller.deleteEvaQues);
router.put('/updateEvaQues',auth.isSignedIn, controller.updateEvaQues);

module.exports = router;
