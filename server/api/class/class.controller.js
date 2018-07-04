
'use strict';

var _ = require('lodash'),
     ClassService = require('../../services/classService');
var XLSX = require('xlsx');

module.exports = {
    getClassList : function (req, res) {
        ClassService.getClassListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addClass:function (req,res) {
        ClassService.addClassSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteClass:function (req,res) {
        ClassService.deleteClassSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateClass:function (req,res) {
        ClassService.updateClassSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getClassById: function (req, res) {
        ClassService.getClassByIdSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    geClassDropList : function (req, res) {
        ClassService.geClassDropListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    saveClassTeacher:function (req,res) {
        ClassService.saveClassTeacherSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getClassTeacherList : function (req, res) {
        ClassService.getClassTeacherListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getInstructorList : function (req, res) {
        ClassService.getInstructorListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteClassTeacher:function (req,res) {
        ClassService.deleteClassTeacherSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getClassDropListOrg: function (req, res) {
        ClassService.getClassDropListOrgSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportClass: function (req, res) {
        ClassService.getClassListSync(req.query, req.user.access_token)
            .then(function (data) {
                var datas = [
                    ["班级名称", "班级编号", "院系","专业", "年级", "学制", "导员", "创建时间"]
                ];
                var values = data.data;
                for (var index in values) {
                    var item = values[index];
                    datas.push([item.name, item.code, item.collegeName, item.professionalName, item.teachingYear,
                        item.schoolingLength, item.teachers, item.createdDate]);
                }
                var ws = XLSX.utils.aoa_to_sheet(datas);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "班级信息");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
};


