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
            host: 'gateway-school',
            path: '/v1/schoolcourse/findcourse',
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
            host: 'gateway-school',
            path: '/v1/schoolcourse/deletecourse/' + params.id,

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
            host:"dd",
            path: 'api/web/v1/organ/getbydomainname',
            params:params
        }).then(function (res) {
            if (res.status.code == 200) {

                callback(null, res.entity);
            } else {
                ErrorCode.getErrorSync(res.entity)
                    .then(function(err){
                        callback(err);
                    });
            }
        })
            .catch(function (e) {
                callback(e);
            });
    }
};


Promise.promisifyAll(SchoolService, {suffix: "Sync"});

module.exports = SchoolService;
