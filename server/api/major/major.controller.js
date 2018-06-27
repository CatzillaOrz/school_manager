
'use strict';

var _ = require('lodash'),
    MajorService = require('../../services/majorService');
var XLSX = require('xlsx');

module.exports = {
    getMajorList : function (req, res) {
        MajorService.getMajorListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addMajor:function (req,res) {
        MajorService.addMajorSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteMajor:function (req,res) {
        MajorService.deleteMajorSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateMajor:function (req,res) {
        MajorService.updateMajorSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getMajorById: function (req, res) {
        MajorService.getMajorByIdSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getMajorDropList : function (req, res) {
        MajorService.getMajorDropListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportMajor: function (req, res) {
        MajorService.getMajorListSync(req.query, req.user.access_token)
            .then(function (data) {
                var datas = [
                    ["专业名称","编码", "院系","创建时间"]
                ];
                var values = data.data;
                for (var index in values) {
                    var item = values[index];
                    datas.push([item.name, item.code, item.collegeName, item.createdDate]);
                }
                var ws = XLSX.utils.aoa_to_sheet(datas);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "专业信息");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
};


