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
            host: 'gateway-org',
            path: '/v1/classes/list',
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
            host: 'gateway-org',
            path: '/v1/classes/add',
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
        RestClient.delete({
            host: 'gateway-org',
            path: '/v1/classes/delete/' + params.id,
            params: {userId: params.userId}
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

    //编辑评教问卷
    updateEvaQues: function (params, access_token, callback) {
        RestClient.put({
            host: 'gateway-org',
            path: '/v1/classes/update',
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
            host: 'gateway-org',
            path: '/v1/classes/list',
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
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/classes/list',
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
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/classes/list',
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
            host: 'gateway-org',
            path: '/v1/classes/list',
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
            host: 'gateway-org',
            path: '/v1/classes/list',
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
            host: 'gateway-org',
            path: '/v1/classes/list',
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

    //查询学生答题详情
    getEvaQuesResult: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/classes/list',
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

    //撤销分配
    cancleDist: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway-org',
            path: '/v1/students/delete/'+params.id,
            params:{userId:params.userId}
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }) .catch(function (e) {
            callback(e);
        });
    },
    //分配评教问卷
    distQuestionaire: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-org',
            path: '/v1/classes/add',
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
            path: '/api/web/v1/classes/ClassAdministrative',
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
};


Promise.promisifyAll(EduManService, {suffix: "Sync"});

module.exports = EduManService;
