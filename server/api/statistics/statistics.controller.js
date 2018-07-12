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
    getAchievementList: function (req, res) {
        StatisticsService.getAchievementListSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getImpartProcess: function (req, res) {
        StatisticsService.getImpartProcessSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    stuRoutineCount: function (req, res) {
        StatisticsService.stuRoutineCountSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    stuRoutineDetail: function (req, res) {
        StatisticsService.stuRoutineDetailSync(req.body, req.user.access_token)
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
                    "指导老师", "周日志标题", "提交时间", "回复数"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    thead.push([item.collegeName, item.professionalName, item.className, item.grade, item.jobNum, item.studentName,
                        item.counselorName, item.summaryTitle, item.createdDate, item.replyNum]);
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
                XLSX.utils.book_append_sheet(wb, ws, "学生激活明细表");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportStudentAttending: function (req, res) {
        StatisticsService.studentAttendingSync(req.query, req.user.access_token)
            .then(function (data) {
                var thead = [
                    ["姓名", "学号", "班级", "年级", "专业", "学院",
                     "指导老师", "岗位/单位"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    thead.push([item.studentName, item.jobNum, item.className, item.grade, item.professionalName,  item.collegeName, 
                        item.join ? '是' : '否', item.counselorName, item.enterpriseName]);
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
    exportStuRoutineCount: function (req, res) {
        StatisticsService.stuRoutineCountSync(req.query, req.user.access_token)
            .then(function (data) {
                var thead = [
                    ["学号", "姓名", "学院", "专业","班级", 
                     "打卡次数", "正常打卡次数", "请假天数"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    thead.push([item.jobNum, item.studentName, item.collegeName,  item.professionalName,   item.className,
                        item.signInTotalNum, item.signInNormalNum, item.leaveNum]);
                }
                var ws = XLSX.utils.aoa_to_sheet(thead);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "签到统计汇总表");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportStuRoutineDetail: function (req, res) {
        StatisticsService.stuRoutineDetailSync(req.query, req.user.access_token)
            .then(function (data) {
                var thead = [
                    ["姓名", "学号", "班级", "年级", "学院", "专业",
                     "打卡时间", "打卡地址", "备注原因", "打卡设备", "设备编号"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    thead.push([item.studentName, item.jobNum, item.className, item.grade,  item.collegeName,  item.professionalName,   
                        item.signTime, item.gpsDetail, item.gpsLocation, item.gpsType, item.gpsType]);
                }
                var ws = XLSX.utils.aoa_to_sheet(thead);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "签到统计详情表");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportStuReport: function (req, res) {
        StatisticsService.stuReportSync(req.query, req.user.access_token)
            .then(function (data) {
                var thead = [
                    ["学院", "专业", "班级", "年级", "学号", "姓名",
                    "指导老师", "是否提交", "批阅状态", "成绩", "批阅时间", "批阅内容"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    thead.push([item.collegeName, item.professionalName, item.className, item.grade, item.jobNum, item.studentName, 
                        item.counselorName, item.commit ? '已提交' : '未提交', item.commit ? reportTaskStatus(item.status) : '', item.reportTitle, item.reviewTime, item.advice]);
                }
                var ws = XLSX.utils.aoa_to_sheet(thead);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "学生实践报告明细表");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportStuScore: function (req, res) {
        StatisticsService.getAchievementListSync(req.query, req.user.access_token)
            .then(function (data) {
                var thead = [
                    ["学院", "专业", "班级", "学号", "姓名",
                    "指导老师", "企业导师", "企业单位", "考勤成绩", "周日志成绩", "实践报告成绩", "实践课程任务成绩", "总成绩"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    thead.push([item.collegeName, item.professionalName, item.className, item.jobNum, item.studentName, 
                        item.counselorName, item.enterpriseName , item.mentorName, item.signScore, item.summaryScore, item.reportScore, item.taskScore, item.totalScore]);
                }
                var ws = XLSX.utils.aoa_to_sheet(thead);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "学生实习成绩汇总表");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportImpartProcess: function (req, res) {
        StatisticsService.getImpartProcessSync(req.query, req.user.access_token)
            .then(function (data) {
                var thead = [
                    ["姓名", "工号", "院系", "指导计划", "指导学生", "日志",
                    "周志", "月报", "实习报告", "批阅篇数"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    thead.push([item.counselorName, item.jobNum, item.counselorCollegeName, item.groupName, item.groupStuNum == "noNeed" ? "不需要" : item.groupStuNum, 
                        item.dailyNum == "noNeed" ? "不需要" : item.dailyNum, item.weeklyNum == "noNeed" ? "不需要" : item.weeklyNum , item.monthlyNum == "noNeed" ? "不需要" : item.monthlyNum, item.reportNum == "noNeed" ? "不需要" : item.reportNum, item.reviewReportNum]);
                }
                var ws = XLSX.utils.aoa_to_sheet(thead);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "学生实习成绩汇总表");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportTeachingSummary: function (req, res) {
        StatisticsService.teachingSummarySync(req.query, req.user.access_token)
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
                XLSX.utils.book_append_sheet(wb, ws, "实践教学汇总");
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
