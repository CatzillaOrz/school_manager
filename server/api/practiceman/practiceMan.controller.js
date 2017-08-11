'use strict';

var _ = require('lodash'),
    PracticeManService = require('../../services/practiceManService');

module.exports = {
    getEntTutorList: function (req, res) {
        PracticeManService.getEntTutorListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEntTutorInfo: function (req, res) {
        PracticeManService.getEntTutorInfoSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },


    addEntTutor: function (req, res) {
        PracticeManService.addEntTutorSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    delEntTutor: function (req, res) {
        PracticeManService.delEntTutorSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateEntTutor:function (req,res) {
        PracticeManService.updateEntTutorSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    addPracticeGroup: function (req, res) {
        PracticeManService.addPracticeGroupSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    updatePracticeGroup:function (req,res) {
        PracticeManService.updatePracticeGroupSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getPracticeGroupInfo: function (req, res) {
        PracticeManService.getPracticeGroupInfoSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getPracticeGroupList: function (req, res) {
        PracticeManService.getPracticeGroupListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    delPracticeGroup: function (req, res) {
        PracticeManService.delPracticeGroupSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
};


