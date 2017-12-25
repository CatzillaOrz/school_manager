'use strict';

var _ = require('lodash'),
    DormManService = require('../../services/dormManService');
var XLSX = require('xlsx');

module.exports = {
    getDormBuildings: function (req, res) {
        DormManService.getDormBuildingsSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getDormBuildingInfo: function (req, res) {
        DormManService.getDormBuildingInfoSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    addDormBuilding: function (req, res) {
        DormManService.addDormBuildingSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    delDormBuilding: function (req, res) {
        DormManService.delDormBuildingSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    updateDormBuilding: function (req, res) {
        DormManService.updateDormBuildingSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    exportPeople: function (req, res) {
        DormManService.getPeopleDetailSync(req.query, req.user.access_token)
            .then(function (data) {
                //res.json(data);
                var datas = [
                    ["学号", "姓名", "性别", "是否实践", "联系电话", "实习公司", "企业导师", "导师电话"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    datas.push([item.jobNum, item.studentName, item.studentSex, item.whetherPractice == 'join' ? '是' : '否',
                        item.studentPhone, item.enterpriseName, item.mentorName, item.mentorPhone]);
                }
                var ws = XLSX.utils.aoa_to_sheet(datas);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "实践学生信息");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    }
};


