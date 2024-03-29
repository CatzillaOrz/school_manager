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

    getDorms: function (req, res) {
        DormManService.getDormsSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getDormInfo: function (req, res) {
        DormManService.getDormInfoSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    addDorm: function (req, res) {
        DormManService.addDormSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    delDorm: function (req, res) {
        DormManService.delDormSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    updateDorm: function (req, res) {
        DormManService.updateDormSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    validationDorm: function (req, res) {
        DormManService.validationDormSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getDormStus: function (req, res) {
        DormManService.getDormStusSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getDistedMajors: function (req, res) {
        DormManService.getDistedMajorsSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    assignDorms: function (req, res) {
        DormManService.assignDormsSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    closeDorms: function (req, res) {
        DormManService.closeDormsSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getDormDistedInfo: function (req, res) {
        DormManService.getDormDistedInfoSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    updateDistedInfo: function (req, res) {
        DormManService.updateDistedInfoSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    openDorms: function (req, res) {
        DormManService.openDormsSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    distedBed: function (req, res) {
        DormManService.distedBedSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getStusByMajor: function (req, res) {
        DormManService.getStusByMajorSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    delBedStu: function (req, res) {
        DormManService.delBedStuSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getStusSelected: function (req, res) {
        DormManService.getStusSelectedSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    statisticsSelDorm: function (req, res) {
        DormManService.statisticsSelDormSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    exportSelectedStu: function (req, res) {
        DormManService.getStusSelectedSync(req.query, req.user.access_token)
            .then(function (data) {
                var datas = [
                    ["姓名", "性别", "专业", "宿舍号", "铺位", "选择时间", "电话"]
                ];
                var values = data.data.data;
                for (var index in values) {
                    var item = values[index];
                    datas.push([item.stuName, item.gender, item.profName, item.roomNo,
                        item.bedName, item.createdDate, item.phone]);
                }
                var ws = XLSX.utils.aoa_to_sheet(datas);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "已选学生名单");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

};


