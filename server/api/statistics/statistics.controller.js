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
                var thead = [
                    ["企业名称", "企业地址", "实习人数", "企业导师人数", "联系电话", "邮箱"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    thead.push([item.name, item.address, item.stuNum, item.mentorNum, item.telephone,  item.mailbox]);
                }
                var ws = XLSX.utils.aoa_to_sheet(thead);
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
                var thead = [
                    ["姓名", "学号", "班级", "年级", "专业", "学院",
                     "日志", "周志", "月报"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    thead.push([item.studentName, item.jobNum, item.className, item.grade, item.professionalName,  item.collegeName,  
                        item.dailyNum, item.weeklyNum, item.monthlyNum]);
                }
                var ws = XLSX.utils.aoa_to_sheet(thead);
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
                var thead = [
                    ["学院", "专业", "班级", "年级", "学号", "姓名",
                    "周日志标题", "提交时间", "回复数"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    thead.push([item.collegeName, item.professionalName, item.className, item.grade, item.jobNum, item.studentName,
                        item.summaryTitle, item.createdDate, item.replyNum]);
                }
                var ws = XLSX.utils.aoa_to_sheet(thead);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "学生周日志明细表");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportStudentActive: function (req, res) {
        StatisticsService.getStudentActiveSync(req.query, req.user.access_token)
            .then(function (data) {
                var thead = [
                    ["姓名", "学号", "班级", "年级", "专业", "学院",
                    "激活状态"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    thead.push([item.studentName, item.jobNum, item.className, item.grade, item.professionalName,  item.collegeName, 
                        item.active ? '已激活' : '未激活']);
                }
                var ws = XLSX.utils.aoa_to_sheet(thead);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "学生周日志明细表");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportStudentAttending: function (req, res) {
        StatisticsService.getStudentAttendingSync(req.query, req.user.access_token)
            .then(function (data) {
                var thead = [
                    ["姓名", "学号", "班级", "年级", "专业", "学院",
                    "激活状态", "指导老师", "岗位/单位"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    thead.push([item.studentName, item.jobNum, item.className, item.grade, item.professionalName,  item.collegeName, 
                        item.active ? '已激活' : '未激活', item.join ? '已参与' : '未参与', item.mentorName, item.enterpriseName]);
                }
                var ws = XLSX.utils.aoa_to_sheet(thead);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "学生周日志明细表");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportStuReport: function (req, res) {
        StatisticsService.getStuReportSync(req.query, req.user.access_token)
            .then(function (data) {
                var thead = [
                    ["学院", "专业", "班级", "年级", "学号", "姓名",
                    "指导老师", "是否提交", "批阅状态", "成绩", "批阅时间", "批阅内容"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    thead.push([item.collegeName, item.professionalName, item.className, item.grade, item.jobNum, item.studentName, 
                        item.mentorName, item.commit ? '已提交' : '未提交', reportTaskStatus(item.status), item.reportTitle, item.reviewTime, item.advice]);
                }
                var ws = XLSX.utils.aoa_to_sheet(thead);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "学生周日志明细表");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportTeachingSummary: function (req, res) {
        StatisticsService.getTeachingSummarySync(req.query, req.user.access_token)
            .then(function (data) {
                var thead = [
                    ["班级", "所属专业", "学生总数", "未激活学生", "已参与学生", "未参与学生", "日志提交总数", "报告提交总数"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    thead.push([item.className, item.professionalName, item.stuNum, item.joinNum, item.notJoinNum, item.notPraticeNum, item.praticeNum, item.reportNum]);
                }
                var ws = XLSX.utils.aoa_to_sheet(thead);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "学生周日志明细表");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    }
};

function reportTaskStatus(stuTaskStatus) {
    if (stuTaskStatus == "uncommit") {
        return "未提交";
    } else if (stuTaskStatus == "checkPending") {
        return "待审核";
    } else if (stuTaskStatus == "notPass") {
        return "未通过";
    } else if (stuTaskStatus == "backTo") {
        return "已打回";
    } else if (stuTaskStatus == "finish") {
        return "已通过";
    } else {
        return "状态出错";
    }
}
