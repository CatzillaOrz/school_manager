
'use strict';

var _ = require('lodash'),
    SchoolYearService = require('../../services/schoolYearService');

module.exports = {
    getSchoolYearList : function (req, res) {
        SchoolYearService.getSchoolYearListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addSchoolYear:function (req,res) {
        SchoolYearService.addSchoolYearSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteSchoolYear:function (req,res) {
        SchoolYearService.deleteSchoolYearSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateSchoolYear:function (req,res) {
        SchoolYearService.updateSchoolYearSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getSchoolYearById: function (req, res) {
        SchoolYearService.getSchoolYearByIdSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getSchoolYearDropList : function (req, res) {
        SchoolYearService.getSchoolYearDropListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addSemesterWeek:function (req,res) {
        SchoolYearService.addSemesterWeekSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addPeriod:function (req,res) {
        SchoolYearService.addPeriodSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getPeriodList: function (req, res) {
        SchoolYearService.getPeriodListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updatePeriod:function (req,res) {
        SchoolYearService.updatePeriodSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deletePeriod:function (req,res) {
        SchoolYearService.deletePeriodSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getPeriodById: function (req, res) {
        SchoolYearService.getPeriodByIdSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getTeachWeekList: function (req, res) {
        SchoolYearService.getTeachWeekListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getSemesterList: function (req, res) {
        SchoolYearService.getSemesterListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getSemesterById: function (req, res) {
        SchoolYearService.getSemesterByIdSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addSemester:function (req,res) {
        SchoolYearService.addSemesterSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateSemester:function (req,res) {
        SchoolYearService.updateSemesterSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteTerm:function (req,res) {
        SchoolYearService.deleteTermSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getCurrentWeek: function (req, res) {
        SchoolYearService.getCurrentWeekSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getWeekList: function (req, res) {
        SchoolYearService.getWeekListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addWeek:function (req,res) {
        SchoolYearService.addWeekSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteWeek:function (req,res) {
        SchoolYearService.deleteWeekSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getCurrentPeriod:function (req,res) {
        SchoolYearService.getCurrentPeriodSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

};


