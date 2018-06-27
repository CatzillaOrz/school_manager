
'use strict';

var _ = require('lodash'),
    CollegeService = require('../../services/collegeService');
var XLSX = require('xlsx');

module.exports = {
    getCollegeList : function (req, res) {
        CollegeService.getCollegeListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addCollege:function (req,res) {
        CollegeService.addCollegeSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteCollege:function (req,res) {
        CollegeService.deleteCollegeSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateCollege:function (req,res) {
        CollegeService.updateCollegeSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getCollegeById: function (req, res) {
        CollegeService.getCollegeByIdSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getCollegeDropList : function (req, res) {
        CollegeService.getCollegeDropListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportCollege: function (req, res) {
        CollegeService.getCollegeListSync(req.query, req.user.access_token)
            .then(function (data) {
                var datas = [
                    ["院系名称", "院系编号","创建时间"]
                ];
                var values = data.data;
                for (var index in values) {
                    var item = values[index];
                    datas.push([item.name, item.code, item.createdDate]);
                }
                var ws = XLSX.utils.aoa_to_sheet(datas);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "院系信息");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

};


