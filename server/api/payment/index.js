'use strict';

var express = require('express');
var controller = require('./payment.controller');
var auth = require('../../middleware/auth');
var multer  = require('multer');
var upload = multer({ dest: './uploads/' });

var router = express.Router();
router.get('/getPaymentList', auth.isSignedIn,controller.getPaymentList);
router.delete('/deletePayment', auth.isSignedIn,controller.deletePayment);
router.put('/publishPayment', auth.isSignedIn,controller.publishPayment);
router.get('/getPayment', auth.isSignedIn,controller.getPayment);
router.put('/updatepaymenttype', auth.isSignedIn,controller.updatepaymenttype);
router.put('/updatelastdate', auth.isSignedIn,controller.updatelastdate);
router.get('/getPaymentCal', auth.isSignedIn,controller.getPaymentCal);
router.get('/getProfessional', auth.isSignedIn,controller.getProfessional);
router.get('/getPersonCostList', auth.isSignedIn,controller.getPersonCostList);
router.get('/getOrderCostList', auth.isSignedIn,controller.getOrderCostList);
router.get('/getPersonPayDetail', auth.isSignedIn,controller.getPersonPayDetail);
router.post('/importPayment',auth.isSignedIn, upload.single('file'), controller.importPayment);
router.post('/updatePayment',auth.isSignedIn, upload.single('file'), controller.updatePayment);
module.exports = router;