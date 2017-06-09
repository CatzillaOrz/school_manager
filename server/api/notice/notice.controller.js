
'use strict';

var _ = require('lodash'),
     ClassService = require('../../services/noticeService');

module.exports = {
    getNoticeList : function (req, res) {
        ClassService.getNoticeListSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getNoticeById : function (req, res) {
        ClassService.getNoticeByIdSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
};


