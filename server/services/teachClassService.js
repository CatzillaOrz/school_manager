/**
 * Created by Administrator on 2017/2/16.
 */
'use strict';


var Promise = require('bluebird'),
	RestClient = require('./helper/RestClient'),
	Config = require('../config/environment'),
	ErrorCode = require('../common/errorCode');

var TeachClassService = {

	getTeachClassList: function (params, access_token, callback) {
		RestClient.get({
			host: 'gateway-org',
			path: '/v1/teachingclass/list',
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
	addTeachClass: function (params, access_token, callback) {
		RestClient.post({
			host: 'gateway-org',
			path: '/v1/teachingclass/add',
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
	deleteTeachClass: function (params, access_token, callback) {
		RestClient.delete({
			host: 'gateway-org',
			path: '/v1/teachingclass/delete/' + params.id,
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
	updateTeachClass: function (params, access_token, callback) {
		RestClient.put({
			host: 'gateway-org',
			path: '/v1/teachingclass/update',
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
	getTeachClassById: function (params, access_token, callback) {
		RestClient.get({
			host: 'gateway-org',
			path: '/v1/teachingclass/get/' + params.id,
			access_token: access_token
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
	getTeachClassDropListOrg: function (params, access_token, callback) {
		RestClient.get({
			host: 'gateway-org',
			path: '/v1/teachingclass/droplist',
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
    getTeachClassTeacherList: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/teachingclassteacher/list',
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
    getTeachClassStudentList: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/teachingclassstudent/list',
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
    deleteTeachClassTeacher: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway-org',
            path: '/v1/teachingclassteacher/delete/' + params.teachingClassId,
            params
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
    deleteTeachClassStudent: function (params, access_token, callback) {
	    var ids;
	    if((typeof params.ids=='object')&&params.ids.constructor==Array){
	        ids=params.ids;
        }else {
            ids=params.ids.split(",");
        }
        RestClient.delete({
            host: 'gateway-org',
            path: '/v1/teachingclassstudent/delete',

            entity: {
                teachingClassId:params.teachingClassId,
                ids:ids
            }
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
    getTeachClassClassesListById: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/teachingclassclasses/list',
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
    addTeachClassClasses: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-org',
            path: '/v1/teachingclassclasses/add',
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
    deleteTeachClassClasses: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway-org',
            path: '/v1/teachingclassclasses/delete/' + params.teachingClassId,
            params
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
    addTeachClassTeacher: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-org',
            path: '/v1/teachingclassteacher/add',
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
    addTeachClassStudent: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-org',
            path: '/v1/teachingclassstudent/add',
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
    deleteTeachClassOneStudent: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway-org',
            path: '/v1/teachingclassstudent/delete/' + params.teachingClassId+"?studentId="+params.studentId
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
    getTeachClassClassesList: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/teachingclassclasses/list',
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
    getCourseSchedule: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/schooltimetable/get/' + params.teachingClassId,
            access_token: access_token
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
    saveCourseSchedule: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-org',
            path: '/v1/schooltimetable/add',
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
    delCourseSchedule: function (params, access_token, callback) {
        RestClient.delete({
            host: 'gateway-org',
            path: '/v1/schooltimetable/delete',
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
    getCourseSchedules: function (params, access_token, callback) {
        RestClient.put({
            host: 'gateway-org',
            path: '/v1/schooltimetable/get',
            entity: params.teachingClassIds
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
    saveCourseSchedules: function (params, access_token, callback) {
        RestClient.post({
            host: 'gateway-org',
            path: '/v1/schooltimetable/addbatch',
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
	getCourseSchedulesByTeacher: function (params, access_token, callback) {
		RestClient.get({
			host: 'dd',
            path: '/api/web/v1/teacher/course/getweek',
			access_token: access_token,
			params: params
		}).then(function (res) {
			if (res.status.code == 200) {
				callback(null, {data :res.entity});
			} else {
				callback(ErrorCode.errorHandle(res));
			}
		}) .catch(function (e) {
			callback(e);
		});
	},
	getImpMustResult: function (params, access_token, callback) {
		RestClient.get({
			host: 'gateway-org',
			path: '/v1/teachingclass/importmustmsg',
			access_token: access_token,
			params: params
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
	getImpOptionResult: function (params, access_token, callback) {
		RestClient.get({
			host: 'gateway-org',
			path: '/v1/teachingclass/importoptionmsg',
			access_token: access_token,
			params: params
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

	//获取节假日列表
	getHolidayList: function (params, access_token, callback) {
		RestClient.get({
			host: 'gateway-org',
			path: '/v1/schoolholiday/list',
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

	//获取节假日通过id
	getHolidayById: function (params, access_token, callback) {
		RestClient.get({
			host: 'gateway-org',
			path: '/v1/schoolholiday/get/'+params.id,
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

	//添加节假日
	addHoliday: function (params, access_token, callback) {
		RestClient.post({
			host: 'gateway-org',
			path: '/v1/schoolholiday/add',
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

	//编辑
	updateHoliday: function (params, access_token, callback) {
		RestClient.put({
			host: 'gateway-org',
			path: '/v1/schoolholiday/update',
			access_token: access_token,
			entity: params
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

	//删除节假日
	delHoliday: function (params, access_token, callback) {
		RestClient.delete({
			host: 'gateway-org',
			path: '/v1/schoolholiday/delete/' + params.id,
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

	//获取列表
	getChangeCourseList: function (params, access_token, callback) {
		RestClient.get({
			host: 'gateway-org',
			path: '/v1/schooladjust/list',
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

	//获取通过id
	getChangeCourseById: function (params, access_token, callback) {
		RestClient.get({
			host: 'gateway-org',
			path: '/v1/schooladjust/get/'+params.id,
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

	addChangeCourse: function (params, access_token, callback) {
		RestClient.post({
			host: 'gateway-org',
			path: '/v1/schooladjust/add',
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

	//编辑
	updateChangeCourse: function (params, access_token, callback) {
		RestClient.post({
			host: 'gateway-org',
			path: '/v1/schooladjust/update',
			access_token: access_token,
			entity: params
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

	delChangeCourse: function (params, access_token, callback) {
		RestClient.delete({
			host: 'gateway-org',
			path: '/v1/schooladjust/delete/' + params.id,
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
    getTeacherChangeCourseList: function (params, access_token, callback) {
        RestClient.get({
            host: 'gateway-org',
            path: '/v1/ddschooltimetable/listtempadjustcourse',
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
};


Promise.promisifyAll(TeachClassService, {suffix: "Sync"});

module.exports = TeachClassService;
