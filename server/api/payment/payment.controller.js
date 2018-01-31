
'use strict';

var _ = require('lodash'),
    inspect = require('util').inspect;
var Busboy = require('busboy'),
    path = require('path'),
    os = require('os'),
    fs = require('fs');
var _ = require('lodash'),
    paymentService = require('../../services/paymentService');

module.exports = {
    getPaymentList : function (req, res) {
        paymentService.getPaymentListSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deletePayment : function (req, res) {
        paymentService.deletePaymentSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getPayment: function (req, res) {
        paymentService.getPaymentSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    publishPayment:function (req,res) {
        paymentService.publishPaymentSync(req.body)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updatepaymenttype:function (req,res) {
        paymentService.updatepaymenttypeSync(req.body)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getPaymentCal: function (req, res) {
        paymentService.getPaymentCalSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updatelastdate:function (req,res) {
        paymentService.updatelastdateSync(req.body)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getProfessional: function (req, res) {
        paymentService.getProfessionalSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getPersonCostList: function (req, res) {
        paymentService.getPersonCostListSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getOrderCostList: function (req, res) {
        paymentService.getOrderCostListSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getPersonPayDetail: function (req, res) {
        paymentService.getPersonPayDetailSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    importPayment: function (req, res) {
        var filePath = req.file.path + path.extname(req.file.originalname);
        fs.rename(req.file.path, filePath, function (err) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            paymentService.importPaymentSync(filePath, req.body)
                .then(function (json) {
                    res.json(json);
                })
                .catch(function (e) {
                    res.status(500).json(e);
                })
        });
    },
    addPersonalCost: function (req, res) {
        var filePath = req.file.path + path.extname(req.file.originalname);
        fs.rename(req.file.path, filePath, function (err) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            paymentService.addPersonalCostSync(filePath, req.body)
                .then(function (json) {
                    res.json(json);
                })
                .catch(function (e) {
                    res.status(500).json(e);
                })
        });
    },
    updatePayment: function (req, res) {
        var filePath = req.file.path + path.extname(req.file.originalname);
        fs.rename(req.file.path, filePath, function (err) {
            if (err) {
                res.status(500).send(err);
                return;
            }
            paymentService.updatePaymentSync(filePath, req.body)
                .then(function (json) {
                    res.json(json);
                })
                .catch(function (e) {
                    res.status(500).json(e);
                })
        });

    },
    stopPublishPayment:function (req,res) {
        paymentService.stopPublishPaymentSync(req.body)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
};


