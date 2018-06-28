'use strict';

var _ = require('lodash'),
    EduManService = require('../../services/eduManService');
var XLSX = require('xlsx');

module.exports = {
    getEvaQuesList: function (req, res) {
        EduManService.getEvaQuesListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEvaQuesInfo: function (req, res) {
        EduManService.getEvaQuesInfoSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEvaQuesDist: function (req, res) {
        EduManService.getEvaQuesDistSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEvaQuesUnDist: function (req, res) {
        EduManService.getEvaQuesUnDistSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEvaQuesUncompleteStu: function (req, res) {
        EduManService.getEvaQuesUncompleteStuSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    lookComment: function (req, res) {
        EduManService.lookCommentSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getEvaQuesStaticInfo: function (req, res) {
        EduManService.getEvaQuesStaticInfoSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    exportQuesResult: function (req, res) {
        EduManService.exportQuesResultSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getTeachClassAttendList: function (req, res) {
        EduManService.getTeachClassAttendListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getClassAttendList: function (req, res) {
        EduManService.getClassAttendListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getStudentAttendByTeachClassId: function (req, res) {
        EduManService.getStudentAttendByTeachClassIdSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getStudentAttendByClassId: function (req, res) {
        EduManService.getStudentAttendByClassIdSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    teachClassAttendExport: function (req, res) {
        EduManService.teachClassAttendExportSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    classAttendExport: function (req, res) {
        EduManService.classAttendExportSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    teachClassAttendInfoExport: function (req, res) {
        EduManService.teachClassAttendInfoExportSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    classAttendInfoExport: function (req, res) {
        EduManService.classAttendInfoExportSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addEvaQues: function (req, res) {
        EduManService.addEvaQuesSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteEvaQues: function (req, res) {
        EduManService.deleteEvaQuesSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateEvaQues: function (req, res) {
        EduManService.updateEvaQuesSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateEvaDate: function (req, res) {
        EduManService.updateEvaDateSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    distQuestionaire:function (req,res) {
        EduManService.distQuestionaireSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    teachClassTrend: function (req, res) {
        EduManService.teachClassTrendSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    teachClassAttendExportTend: function (req, res) {
        EduManService.teachClassAttendExportTendSync(req.query, req.user.access_token)
            .then(function (data) {
            res.json(data);
        })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getElecFenceList: function (req, res) {
        EduManService.getElecFenceListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    //获取历史轨迹信息
    getElecFenceHistory: function (req, res) {
        EduManService.getElecFenceHistorySync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    //获取当天轨迹信息
    getElecFenceCurrent: function (req, res) {
        EduManService.getElecFenceCurrentSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    //获取多边形
    getElecSetInfo: function (req, res) {
        EduManService.getElecSetInfoSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    //设置多边形信息
    setElecFenceInfo: function (req, res) {
        EduManService.setElecFenceInfoSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    notice: function (req, res) {
        EduManService.noticeSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    switchElec: function (req, res) {
        EduManService.switchElecSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    classTrend: function (req, res) {
        EduManService.classTrendSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    classAttendExportTrend: function (req, res) {
        EduManService.classAttendExportTrendSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getCurrentSemester: function (req, res) {
        EduManService.getCurrentSemesterSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getAttendacneSettingList: function (req, res) {
        EduManService.getAttendacneSettingListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getTeachingclassAttendByTeacher: function (req, res) {
        EduManService.getTeachingclassAttendByTeacherSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getAttendanceByPeriod: function (req, res) {
        EduManService.getAttendanceByPeriodSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getClassAttendanceGroupByPro: function (req, res) {
        EduManService.getClassAttendanceGroupByProSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getClassAttendanceGroupByclass: function (req, res) {
        EduManService.getClassAttendanceGroupByclassSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getClassAttendanceGroupByCollege: function (req, res) {
        EduManService.getClassAttendanceGroupByCollegeSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportTeachingclassByTeacher: function (req, res) {
        EduManService.exportTeachingclassByTeacherSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportClassAttendanceByPeriod: function (req, res) {
        EduManService.exportClassAttendanceByPeriodSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportClassAttendanceGroupByCollege: function (req, res) {
        EduManService.exportClassAttendanceGroupByCollegeSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportClassAttendanceGroupByPro: function (req, res) {
        EduManService.exportClassAttendanceGroupByProSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportClassAttendanceGroupByclass: function (req, res) {
        EduManService.exportClassAttendanceGroupByclassSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateAttendacne: function (req, res) {
        EduManService.updateAttendacneSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getAttendListByCondition: function (req, res) {
        EduManService.getAttendListByConditionSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getAttendChangeLog: function (req, res) {
        EduManService.getAttendChangeLogSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    updateAttend: function (req, res) {
        EduManService.updateAttendSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    cancleAttend: function (req, res) {
        EduManService.cancleAttendSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    recoverAttend: function (req, res) {
        EduManService.recoverAttendSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    batchCancleAttend: function (req, res) {
        EduManService.batchCancleAttendSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    batchUpdateAttend: function (req, res) {
        EduManService.batchUpdateAttendSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getAttendStopLogs: function (req, res) {
        EduManService.getAttendStopLogsSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getInsRollCallList: function (req, res) {
        EduManService.getInsRollCallListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getClassRollCallDetails: function (req, res) {
        EduManService.getClassRollCallDetailsSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    exportRollCallInfo: function (req, res) {
        EduManService.getInsRollCallListSync(req.query, req.user.access_token)
            .then(function (data) {
                var datas = [
                    ["辅导员", "工号", "辅导员归属院系", "点名组名称", "行政班年级", "点名发起时间", "总人数",
                    "未提交人数", "已到人数", "未到人数", "请假人数"]
                ];
                for (var index in data.data) {
                    var item = data.data[index];
                    datas.push([item.tname, item.jobNumber, item.tcollegeName, item.groupName, item.grade, item.initiatingTime,
                        item.total, item.uncommitted, item.haveTo, item.nonArrival, item.leave]);
                }
                var ws = XLSX.utils.aoa_to_sheet(datas);
                var wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, ws, "导员点名信息报表");
                res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getTeachClassDataList: function (req, res) {
        EduManService.getTeachClassDataListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getCollageDataList: function (req, res) {
        EduManService.getCollageDataListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    collageDataExport: function (req, res) {
        EduManService.collageDataExportSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    teachClassDataExport: function (req, res) {
        EduManService.teachClassDataExportSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getTeachingSupervisorList: function (req, res) {
        EduManService.getTeachingSupervisorListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getTeachingSupervisorInfo: function (req, res) {
        EduManService.getTeachingSupervisorInfoSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    getTeachingSupervisorTem: function (req, res) {
        EduManService.getTeachingSupervisorTemSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    updateTeachingSupervisor: function (req, res) {
        EduManService.updateTeachingSupervisorSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addTeachingSupervisor: function (req, res) {
        EduManService.addTeachingSupervisorSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addTeachingTemplateStu: function (req, res) {
        EduManService.addTeachingTemplateStuSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportTea: function (req, res) {
        EduManService.exportTeaSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    exportStu: function (req, res) {
        EduManService.exportStuSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    distTeaching: function (req, res) {
        EduManService.distTeachingSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getDistedTeaching: function (req, res) {
        EduManService.getDistedTeachingSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    delTeaching: function (req, res) {
        EduManService.delTeachingSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getDistTeaching: function (req, res) {
        EduManService.getDistTeachingSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getSamePartList: function (req, res) {
        EduManService.getSamePartListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },

    saveWeight: function (req, res) {
        EduManService.saveWeightSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getAssignResult: function (req, res) {
        EduManService.getAssignResultSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getExportQuesResult: function (req, res) {
        EduManService.getExportQuesResultSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    exportQuesStatResult: function (req, res) {
        EduManService.exportQuesStatResultSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
};


