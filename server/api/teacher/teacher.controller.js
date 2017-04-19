
'use strict';

var _ = require('lodash'),
     TeacherService = require('../../services/teacherService');

module.exports = {
    getTeacherList : function (req, res) {
        TeacherService.getTeacherListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addTeacher:function (req,res) {
        TeacherService.addTeacherSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteTeacher:function (req,res) {
        TeacherService.deleteTeacherSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateTeacher:function (req,res) {
        TeacherService.updateTeacherSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getTeacherById: function (req, res) {
        TeacherService.getTeacherByIdSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getTeacherDropListOrg: function (req, res) {
        TeacherService.getTeacherDropListOrgSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

};


