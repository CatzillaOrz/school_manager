'use strict';

var _ = require('lodash'),
    PracticeManService = require('../../services/practiceManService');
var XLSX = require('xlsx');

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

    isExistInGroup: function (req, res) {
        PracticeManService.isExistInGroupSync(req.query, req.user.access_token)
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
    getPeopleStats: function (req, res) {
        PracticeManService.getPeopleStatsSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getTaskStats: function (req, res) {
        PracticeManService.getTaskStatsSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getCompanyName: function (req, res) {
        PracticeManService.getCompanyNameSync(req.query, req.user.access_token)
            .then(function (data) {
                for(var i = 0, len = data.data.length; i < len; i++){
                    var temp = data.data[i];
                    temp.id = i + 1;
                }
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getPeopleDetail: function (req, res) {
        PracticeManService.getPeopleDetailSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportPeople: function (req, res) {
        PracticeManService.getPeopleDetailSync(req.query, req.user.access_token)
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
                res.status(200).send(XLSX.write(wb, { type: 'binary', bookType: 'xlsx' }));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportPeopleStats: function (req, res) {
        PracticeManService.getPeopleStatsSync(req.query, req.user.access_token)
            .then(function (data) {
                //res.json(data);
                var datas = [
                    ["院系", "专业", "班级", "学生人数", "实践人数", "未实践人数"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    datas.push([item.collegeName, item.professionalName, item.className, item.stuNum,
                        item.praticeNum, item.notPraticeNum]);
                }
                var ws = XLSX.utils.aoa_to_sheet(datas);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "实践人数统计");
                res.status(200).send(XLSX.write(wb, { type: 'binary', bookType: 'xlsx' }));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportTaskStats: function (req, res) {
        PracticeManService.getTaskStatsSync(req.query, req.user.access_token)
            .then(function (data) {
                //res.json(data);
                var datas = [
                    ["学号", "姓名", "实习公司", "企业导师", "总任务", "通过", "未通过", "被打回", "待审核", "未提交"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    datas.push([item.jobNum, item.studentName, item.enterpriseName, item.mentorName,
                        item.totalNum, item.passNum, item.notPassNum, item.backToNum, item.checkPendingNum, item.uncommitNum]);
                }
                var ws = XLSX.utils.aoa_to_sheet(datas);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "实践任务统计");
                res.status(200).send(XLSX.write(wb, { type: 'binary', bookType: 'xlsx' }));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
};


