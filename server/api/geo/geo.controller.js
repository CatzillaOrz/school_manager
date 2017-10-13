
'use strict';

var _ = require('lodash'),
    geoService = require('../../services/geoService');

module.exports = {
    getOrgan : function (req, res) {
        geoService.getOrganSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getAttendancestatistics : function (req, res) {
        geoService.getAttendancestatisticsSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    departmentsummary : function (req, res) {
        geoService.departmentsummarySync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    attendancerate : function (req, res) {
        geoService.attendancerateSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    realtimestatistics : function (req, res) {
        geoService.realtimestatisticsSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    termtoclassrate: function (req, res) {
        geoService.termtoclassrateSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    classranking: function (req, res) {
        geoService.classrankingSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    teacherranking: function (req, res) {
        geoService.teacherrankingSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    comprehensivepraise: function (req, res) {
        geoService.comprehensivepraiseSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    hotreviews: function (req, res) {
        geoService.hotreviewsSync(req.query)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
};


