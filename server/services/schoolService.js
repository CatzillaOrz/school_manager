/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';


var Promise = require('bluebird'),
    RestClient = require('./helper/RestClient'),
    Config = require('../config/environment'),
    ErrorCode = require('../common/errorCode');

var SchoolService = {
    getLogoList: function (params, callback) {
        RestClient.get({
            host: 'gateway-school',
            path: '/v1/school/infomanager/findschoollogoinfo',
            params
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
    addLogo: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-school',
            path: '/v1/school/infomanager/saveandupdateschoollogoinfo',
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
    addShuffImage: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-school',
            path: '/v1/school/intrductionandimage/savaschoolshuffimageinfo',
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
    getShuffImageList: function (params, callback) {
        RestClient.get({
            host: 'gateway-school',
            path: '/v1/school/intrductionandimage/findimage',
            params
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
    updateShuffImage: function (params, access_token, callback) {
        RestClient.put({
            host: 'gateway-school',
            path: '/v1/school/intrductionandimage/updateschoolshuffimageinfo',
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
    addSchoolInfo: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-school',
            path: '/v1/school/intrductionandimage/savaandupdateinfo',
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
    deleteShuffImage: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway-school',
            path: '/v1/school/intrductionandimage/deleteschoolshuffimageinfo/' + params.id,

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
    getSchoolInfo: function (params, callback) {
        RestClient.get({
            host: 'gateway-school',
            path: '/v1/school/intrductionandimage/findintroduction',
            params
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
    addHotMajor: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-school',
            path: '/v1/schoolhotspecialty/saveinfo',
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
    getHotMajor: function (params, callback) {
        RestClient.get({
            host: 'gateway-school',
            path: '/v1/schoolhotspecialty/findinfo',
            params
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
    updateHotMajor: function (params, access_token, callback) {
        RestClient.put({
            host: 'gateway-school',
            path: '/v1/schoolhotspecialty/updateinfo',
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
    deleteHotMajor: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway-school',
            path: '/v1/schoolhotspecialty/deleteinfo/' + params.id,

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

    ////

    addExcellentTeacher: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-school',
            path: '/v1/schoolexcellentteacher/saveteacher',
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
    getExcellentTeacherList: function (params, callback) {
        RestClient.get({
            host: 'gateway-school',
            path: '/v1/schoolexcellentteacher/findteacherinfo',
            params
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
    updateExcellentTeacher: function (params, access_token, callback) {
        RestClient.put({
            host: 'gateway-school',
            path: '/v1/schoolexcellentteacher/updateteacher',
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
    deleteExcellentTeacher: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway-school',
            path: '/v1/schoolexcellentteacher/deleteteacher/' + params.id,

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

    addBoutiqueCourse: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-school',
            path: '/v1/schoolcourse/savecourse',
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
    getBoutiqueCourseList: function (params, callback) {
        RestClient.get({
            host: 'em',
            path: '/api/web/v1/schoolcourse/findcourse',
            params:params
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
    updateBoutiqueCourse: function (params, access_token, callback) {
        RestClient.put({
            host: 'gateway-school',
            path: '/v1/schoolcourse/updatecourse',
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
    deleteBoutiqueCourse: function (params, access_token, callback) {
        RestClient.delete({
            host: 'em',
            path: '/api/web/v1/schoolcourse/deletecourse/' + params.id,

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
    getSchoolByDomain: function(params, callback){
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/org/getbydomainname',
            params:params
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
    getBoutiqueCourseDropList: function (params, callback) {
        RestClient.get({
            host: 'em',
            path: '/api/web/v1/school/course/getschoolcourse',
            params:{schoolId:params.orgId}
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
    getHotMajorById: function (params, callback) {
        RestClient.get({
            host: 'gateway-school',
            path: '/v1/schoolhotspecialty/findid',
            params:params
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
    getExcellentTeacherById: function (params, callback) {
        RestClient.get({
            host: 'gateway-school',
            path: '/v1/schoolexcellentteacher/findid',
            params:params
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
    getApplyList: function (params, callback) {
        RestClient.get({
            host: 'em',
            path: '/api/web/v1/schoolcourse/apply/list',
            params:params
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
    getSchoolStatistics: function (params, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/trainingmanage/groupstatistics?orgId=' + params.orgId,
            params:params
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
    handleApply: function (params, callback) {
        RestClient.put({
            host: 'em',
            path: '/api/web/v1/schoolcourse/apply/put',
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

    //school news
    addNews: function (params, access_token, callback) {
        RestClient.post({
            host: 'hy',
            path: '/api/web/v1/news/newsShow/addNews',
            entity: params,
            access_token: access_token,
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
    getSchoolNewList: function (params, access_token, callback) {
        RestClient.get({
            host: 'hy',
            path: '/api/web/v1/news/newsShow/newsLists',
            params:params,
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
    getDetailById: function (params, access_token, callback) {
        RestClient.get({
            host: 'hy',
            path: '/api/web/v1/news/newsShow/newsDetail',
            params:params,
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
    updateNews: function (params, access_token, callback) {
        RestClient.post({
            host: 'hy',
            path: '/api/web/v1/news/newsShow/updateNews',
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

    delNews: function (params, access_token, callback) {
        RestClient.delete({
            host: 'hy',
            access_token: access_token,
            path: '/api/web/v1/news/newsShow/deleteNews',
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

    publishNews: function (params, access_token, callback) {
        RestClient.put({
            host: 'hy',
            path: '/api/web/v1/news/newsShow/Publish',
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
    canclePublish: function (params, access_token, callback) {
        RestClient.put({
            host: 'hy',
            path: '/api/web/v1/news/newsShow/noPublish',
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

    batchPublishNews: function (params, access_token, callback) {
        RestClient.put({
            host: 'hy',
            path: '/api/web/v1/news/newsShow/Publishes',
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
    batchDelNews: function (params, access_token, callback) {
        RestClient.put({
            host: 'hy',
            path: '/api/web/v1/news/newsShow/deleteNewss',
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


    //app发布通知
    addAppNotice: function (params, access_token, callback) {
        RestClient.post({
            host: 'dd',
            path: '/api/web/v1/homepage/add',
            entity: params,
            access_token: access_token,
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
    getAppNoticeList: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/homepage/query',
            params:params,
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
    getAppNoticeDetail: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/homepage/queryById',
            params:params,
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
    updateAppNotice: function (params, access_token, callback) {
        RestClient.post({
            host: 'dd',
            path: '/api/web/v1/homepage/update',
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

    deleteAppNotice: function (params, access_token, callback) {
        RestClient.delete({
            host: 'dd',
            access_token: access_token,
            path: '/api/web/v1/homepage/delete',
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
    getAllSchool: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/homepage/listAllOrgInfo',
            params:params,
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
	//快捷入口菜单
    getDefMenu: function (params, access_token, callback) {
        RestClient.get({
            host: 'dd',
            path: '/api/web/v1/menus/custommenu/getCustomMenu',
            params:params,
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
    //保存快捷目录
    saveDefMenu: function (params, access_token, callback) {
        RestClient.post({
            host: 'dd',
            path: '/api/web/v1/menus/custommenu/save',
            params: params,
            access_token: access_token,
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

};


Promise.promisifyAll(SchoolService, {suffix: "Sync"});

module.exports = SchoolService;
