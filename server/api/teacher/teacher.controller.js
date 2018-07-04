
'use strict';

var _ = require('lodash'),
     TeacherService = require('../../services/teacherService');
var XLSX = require('xlsx');

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
    getSimpleTeachers: function (req, res) {
        TeacherService.getSimpleTeachersSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getImpResult:function (req, res) {
        TeacherService.getImpResultSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportTea: function (req, res) {
        TeacherService.getTeacherListSync(req.query, req.user.access_token)
            .then(function (data) {
                var datas = [
                    ["姓名", "工号","性别", "院系", "电话"]
                ];
                var values = data.data;
                for (var index in values) {
                    var item = values[index];
                    datas.push([item.name, item.jobNumber, item.sex, item.collegeName, item.phone]);
                }
                var ws = XLSX.utils.aoa_to_sheet(datas);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "教师信息");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
};


