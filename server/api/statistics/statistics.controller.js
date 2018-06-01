'use strict';

var _ = require('lodash'),
StatisticsService = require('../../services/statisticsService');
var XLSX = require('xlsx');

module.exports = {
    stuReport: function (req, res) {
        StatisticsService.stuReportSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    studentAttending: function (req, res) {
        StatisticsService.studentAttendingSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    teachingSummary: function (req, res) {
        StatisticsService.teachingSummarySync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getStudentActive: function (req, res) {
        StatisticsService.getStudentActiveSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getEnterpriseDetail: function (req, res) {
        StatisticsService.getEnterpriseDetailSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportEnterpriseDetail: function (req, res) {
        StatisticsService.getEnterpriseDetailSync(req.query, req.user.access_token)
            .then(function (data) {
                var datas = [
                    ["企业名称", "企业地址", "实习人数", "企业导师人数", "联系电话", "邮箱"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    datas.push([item.name, item.address, item.stuNum, item.mentorNum, item.telephone,  item.mailbox]);
                }
                var ws = XLSX.utils.aoa_to_sheet(datas);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "实践企业统计表");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getStuProcess: function (req, res) {
        StatisticsService.getStuProcessSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportStuProcess: function (req, res) {
        StatisticsService.getStuProcessSync(req.query, req.user.access_token)
            .then(function (data) {
                var datas = [
                    ["姓名", "学号", "班级", "年级", "专业", "学院",
                     "日志", "周志", "月报"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    datas.push([item.studentName, item.jobNum, item.className, item.grade, item.professionalName,  item.collegeName,  
                        item.dailyNum, item.weeklyNum, item.monthlyNum]);
                }
                var ws = XLSX.utils.aoa_to_sheet(datas);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "学生参与过程明细表");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getStuJournal: function (req, res) {
        StatisticsService.getStuJournalSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportStuJournal: function (req, res) {
        StatisticsService.getStuJournalSync(req.query, req.user.access_token)
            .then(function (data) {
                var datas = [
                    ["学院", "专业", "班级", "年级", "学号", "姓名",
                    "周日志标题", "提交时间", "回复数"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    datas.push([item.collegeName, item.professionalName, item.className, item.grade, item.jobNum, item.studentName,
                        item.summaryTitle, item.createdDate, item.replyNum]);
                }
                var ws = XLSX.utils.aoa_to_sheet(datas);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "学生周日志明细表");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    }
};


