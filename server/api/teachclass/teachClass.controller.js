'use strict';

var _ = require('lodash'),
	TeachClassService = require('../../services/teachClassService');

module.exports = {
	getTeachClassList: function (req, res) {
		TeachClassService.getTeachClassListSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},
	addTeachClass: function (req, res) {
		TeachClassService.addTeachClassSync(req.body, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},
	deleteTeachClass: function (req, res) {
		TeachClassService.deleteTeachClassSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},
	updateTeachClass: function (req, res) {
		TeachClassService.updateTeachClassSync(req.body, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},
	getTeachClassById: function (req, res) {
		TeachClassService.getTeachClassByIdSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},
	getTeachClassDropListOrg: function (req, res) {
		TeachClassService.getTeachClassDropListOrgSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},
    getTeachClassTeacherList: function (req, res) {
        TeachClassService.getTeachClassTeacherListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getTeachClassStudentList: function (req, res) {
        TeachClassService.getTeachClassStudentListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteTeachClassTeacher: function (req, res) {
        TeachClassService.deleteTeachClassTeacherSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteTeachClassStudent: function (req, res) {
        TeachClassService.deleteTeachClassStudentSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getTeachClassClassesListById: function (req, res) {
        TeachClassService.getTeachClassClassesListByIdSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addTeachClassClasses: function (req, res) {
        TeachClassService.addTeachClassClassesSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteTeachClassClasses: function (req, res) {
        TeachClassService.deleteTeachClassClassesSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addTeachClassTeacher: function (req, res) {
        TeachClassService.addTeachClassTeacherSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    addTeachClassStudent: function (req, res) {
        TeachClassService.addTeachClassStudentSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    deleteTeachClassOneStudent: function (req, res) {
        TeachClassService.deleteTeachClassOneStudentSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getTeachClassClassesList: function (req, res) {
        TeachClassService.getTeachClassClassesListSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getCourseSchedule: function (req, res) {
        TeachClassService.getCourseScheduleSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    saveCourseSchedule: function (req, res) {
        TeachClassService.saveCourseScheduleSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    delCourseSchedule: function (req, res) {
        TeachClassService.delCourseScheduleSync(req.query, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    getCourseSchedules: function (req, res) {
        TeachClassService.getCourseSchedulesSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
    saveCourseSchedules: function (req, res) {
        TeachClassService.saveCourseSchedulesSync(req.body, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(e.code).send(e.message);
            })
    },
	getImpMustResult:function (req, res) {
		TeachClassService.getImpMustResultSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},
	getImpOptionResult:function (req, res) {
		TeachClassService.getImpOptionResultSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},

	getHolidayList:function (req, res) {
		TeachClassService.getHolidayListSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},

	getHolidayById:function (req, res) {
		TeachClassService.getHolidayByIdSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},

	addHoliday: function (req, res) {
		TeachClassService.addHolidaySync(req.body, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},

	updateHoliday: function (req, res) {
		TeachClassService.updateHolidaySync(req.body, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},

	delHoliday: function (req, res) {
		TeachClassService.delHolidaySync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},

	getChangeCourseList:function (req, res) {
		TeachClassService.getChangeCourseListSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},

	getChangeCourseById:function (req, res) {
		TeachClassService.getChangeCourseByIdSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},

	addChangeCourse: function (req, res) {
		TeachClassService.addChangeCourseSync(req.body, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},

	updateChangeCourse: function (req, res) {
		TeachClassService.updateChangeCourseSync(req.body, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},

	delChangeCourse: function (req, res) {
		TeachClassService.delChangeCourseSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},
};


