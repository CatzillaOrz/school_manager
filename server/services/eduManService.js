/**
 * Created by Administrator on 2017/2/16.
 * 教务管理
 */
'use strict';


var Promise = require('bluebird'),
    RestClient = require('./helper/RestClient'),
    Config = require('../config/environment'),
    ErrorCode = require('../common/errorCode');

var EduManService = {

    //查询评教问卷列表
    getEvaQuesList: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/questionnaire/query',
            access_token: access_token,
            params: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
            .catch(function (e) {
                callback(e);
            });
    },

    //新增评教问卷
    addEvaQues: function (params, access_token, callback) {
        RestClient.post({
            host: 'dd',
            path: '/api/web/v1/questionnaire/create',
            access_token: access_token,
            entity: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                 callback(ErrorCode.errorHandle(res));
            }
        }).catch(function (e) {
            callback(e);
        });
    },

    //撤销评教问卷
    deleteEvaQues: function (params, access_token, callback) {
        var urlParam = {
            host: 'dd',
            path: '/api/web/v1/questionnaire/cancelAssignedList',
            access_token: access_token
        }
        if(params.delType == 'all'){//删除所有
            urlParam.path = '/api/web/v1/questionnaire/cancelAssignedAll?questionnaireId=' + params.questionnaireId;
        }else{
            urlParam.entity = params.ids.split(",");
        }
        RestClient.delete(urlParam).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }).catch(function (e) {
            callback(e);
        });
    },

    //编辑评教问卷
    updateEvaQues: function (params, access_token, callback) {
        RestClient.put({
            host: 'dd',
            path: '/api/web/v1/questionnaire/update',
            access_token: access_token,
            entity: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }).catch(function (e) {
            callback(e);
        });
    },

    //查询评教问卷列表
    getEvaQuesInfo: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/questionnaire/queryDetail',
            access_token: access_token,
            params: params
        }).then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    callback(ErrorCode.errorHandle(res));
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },

    //查询已经分配的列表
    getEvaQuesDist: function (params, access_token, callback) {
        params.accessToken = "Bearer " + access_token;
        RestClient.get({
            host: 'dd',
            path: '/api/web/v2/findassigned',
            access_token: access_token,
            params: params
        }).then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    callback(ErrorCode.errorHandle(res));
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },

    //查询未分配的列表
    getEvaQuesUnDist: function (params, access_token, callback) {
        params.accessToken = "Bearer " + access_token;
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/questionnaire/organ/teachingClassesList',
            access_token: access_token,
            params: params
        }).then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    callback(ErrorCode.errorHandle(res));
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },

    //查询常规统计
    getEvaQuesNormalStatic: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/questionnaire/Quesniare/regularStatistics',
            access_token: access_token,
            params: params
        }).then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    callback(ErrorCode.errorHandle(res));
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },

    //查询分题统计
    getEvaQuesUnNormalStatic: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/questionnaire/Quesniare/partStatistics',
            access_token: access_token,
            params: params
        }).then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    callback(ErrorCode.errorHandle(res));
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },

    //查询问卷统计基本信息
    getEvaQuesStaticInfo: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/questionnaire/assignQuesniare/queryById',
            params: params,
            access_token: access_token
        }).then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    callback(ErrorCode.errorHandle(res));
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },

    //查询学生答题详情
    getEvaQuesResult: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/questionnaire/student/getQuestionsInfo',
            params: params,
            access_token: access_token
        }).then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    callback(ErrorCode.errorHandle(res));
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },

    //分配评教问卷
    distQuestionaire: function (params, access_token, callback) {
        RestClient.post({
            host: 'dd',
            path: '/api/web/v2/assigned',
            access_token: access_token,
            entity: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }).catch(function (e) {
            callback(e);
        });
    },

    //按教学班查询考勤列表
    getTeachClassAttendList: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/classes/ClassAttendance',
            params: params,
            access_token:access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
            .catch(function (e) {
                callback(e);
            });
    },
    //按行政班查询考勤列表
    getClassAttendList: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/classes/attendancebyclass',
            params: params,
            access_token:access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
            .catch(function (e) {
                callback(e);
            });
    },
    //通过教学班id查询学生考勤
    getStudentAttendByTeachClassId: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/classes/ClassAttendanceInfo',
            params: params,
            access_token:access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
            .catch(function (e) {
                callback(e);
            });
    },
    //通过行政班id查询学生考勤
    getStudentAttendByClassId: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/classes/ClassAdministrativeInfo',
            params: params,
            access_token:access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
            .catch(function (e) {
                callback(e);
            });
    },
    teachClassAttendExport: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/classes/exportAttendanceClass',
            params: params,
            access_token:access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
            .catch(function (e) {
                callback(e);
            });
    },
    classAttendExport: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/classes/exportAdministrativeClass',
            params: params,
            access_token:access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
            .catch(function (e) {
                callback(e);
            });
    },
    teachClassAttendInfoExport: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/classes/exportAttendanceClassInfo',
            params: params,
            access_token:access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
            .catch(function (e) {
                callback(e);
            });
    },
    classAttendInfoExport: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/classes/exportAdministrativeClassInfo',
            params: params,
            access_token:access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
            .catch(function (e) {
                callback(e);
            });
    },
    teachClassTrend: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/classes/AttendanceWeekTendency',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },

    teachClassAttendExportTend: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/classes/exportAttendanceWeekTendency',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    //获取电子围栏列表页面
    getElecFenceList: function (params, access_token, callback) {
        params.accessToken = "Bearer " + access_token;
        RestClient.get({
            host: 'gateway-org-auth',
            path: '/v1/shool/queryelectricfence',
            params: params,
            access_token: access_token
        }).then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    callback(ErrorCode.errorHandle(res));
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },
    //获取电子围栏历史记录
    getElecFenceHistory: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/electricFence/queryHistory',
            params: params,
            access_token: access_token
        }).then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    callback(ErrorCode.errorHandle(res));
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },

    //获取电子围栏当天轨迹信息
    getElecFenceCurrent: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/electricFence/querlocus',
            params: params,
            access_token: access_token
        }).then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    callback(ErrorCode.errorHandle(res));
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },

    //获取设置信息
    getElecSetInfo: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/electricFence/queryInit',
            params: params,
            access_token: access_token
        }).then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    callback(ErrorCode.errorHandle(res));
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },

    //获取设置信息
    setElecFenceInfo: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-org',
            path: '/v1/electricFence/electricFenceCreate',
            entity: params,
            access_token: access_token
        }).then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    callback(ErrorCode.errorHandle(res));
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },

    //通知班主任
    notice: function (params, access_token, callback) {
        RestClient.post({
            host: 'dd',
            path: '/api/web/v1/electricFence/assigned',
            access_token: access_token,
            params: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }).catch(function (e) {
            callback(e);
        });
    },

    //开启关闭围栏
    switchElec: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-org',
            path: '/v1/electricFence/fenceswitch',
            access_token: access_token,
            params: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }).catch(function (e) {
            callback(e);
        });
    },


    classTrend: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/classes/AdministrativeWeekTendency',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    classAttendExportTrend: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/classes/exportAdministrativeWeekTendency',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    getCurrentSemester: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/semester/getorgsemester',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    getAttendacneSettingList: function (params, access_token, callback) {
        RestClient.get({
            host:  'dd',
            path: '/api/web/v1/organ/getAttendacneList',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    getTeachingclassAttendByTeacher: function (params, access_token, callback) {
        RestClient.get({
            host:  'dd',
            path: '/api/web/v1/attendance/teachingclassByTeacher',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    getAttendanceByPeriod: function (params, access_token, callback) {
        RestClient.get({
            host:  'dd',
            path: '/api/web/v1/attendance/attendanceByPeriod',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    getClassAttendanceGroupByPro: function (params, access_token, callback) {
        RestClient.get({
            host:  'dd',
            path: '/api/web/v1/attendance/classAttendanceGroupByPro',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    getClassAttendanceGroupByclass: function (params, access_token, callback) {
        RestClient.get({
            host:  'dd',
            path: '/api/web/v1/attendance/classAttendanceGroupByclass',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    getClassAttendanceGroupByCollege: function (params, access_token, callback) {
        RestClient.get({
            host:  'dd',
            path: '/api/web/v1/attendance/classAttendanceGroupByCollege',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    exportTeachingclassByTeacher: function (params, access_token, callback) {
        RestClient.get({
            host:  'dd',
            path: '/api/web/v1/attendance/exportTeachingclassByTeacher',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    exportClassAttendanceByPeriod: function (params, access_token, callback) {
        RestClient.get({
            host:  'dd',
            path: '/api/web/v1/attendance/exportClassAttendanceByPeriod',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    exportClassAttendanceGroupByCollege: function (params, access_token, callback) {
        RestClient.get({
            host:  'dd',
            path: '/api/web/v1/attendance/exportClassAttendanceGroupByCollege',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    exportClassAttendanceGroupByPro: function (params, access_token, callback) {
        RestClient.get({
            host:  'dd',
            path: '/api/web/v1/attendance/exportClassAttendanceGroupByPro',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    exportClassAttendanceGroupByclass: function (params, access_token, callback) {
        RestClient.get({
            host:  'dd',
            path: '/api/web/v1/attendance/exportClassAttendanceGroupByclass',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    updateAttendacne: function (params, access_token, callback) {
        RestClient.put({
            host:  'dd',
            path: '/api/web/v1/organ/attentionUpdate',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    getAttendListByCondition: function (params, access_token, callback) {
        RestClient.get({
            host:  'dd',
            path: '/api/web/v1/attendancerecor/searchbywhere',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    getAttendChangeLog: function (params, access_token, callback) {
        RestClient.get({
            host:  'dd',
            path: '/api/web/v1/attendancerecor/viewlog',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    updateAttend: function (params, access_token, callback) {
        RestClient.put({
            host: 'dd',
            path: '/api/web/v1/attendancerecor/modifyattendance',
            access_token: access_token,
            params: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }).catch(function (e) {
            callback(e);
        });
    },
    getAttendStopLogs: function (params, access_token, callback) {
        RestClient.get({
            host:  'gateway-org',
            path: '/v1/pauselog/getbywhere',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    getInsRollCallList: function (params, access_token, callback) {
        RestClient.get({
            host:  'dd',
            path: '/api/web/v1/instructor/rollcall',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
    getClassRollCallDetails: function (params, access_token, callback) {
        RestClient.get({
            host:  'dd',
            path: '/api/web/v1/rollcall/classdetails',
            params: params,
            access_token: access_token
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        })
    },
};


Promise.promisifyAll(EduManService, {suffix: "Sync"});

module.exports = EduManService;
