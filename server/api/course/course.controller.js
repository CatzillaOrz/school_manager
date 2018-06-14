'use strict';

var _ = require('lodash'),
	CourseService = require('../../services/courseService');
var XLSX = require('xlsx');

module.exports = {
	getCourseList: function (req, res) {
		CourseService.getCourseListSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},

	getCourseListIn: function (req, res) {
		/*var data = {
            "data": [
                {
                    "id": 210,
                    "name": "java",
                    "teacherName": "杨海",
                    "grade":66
                },
                {
                    "id": 211,
                    "name": "英语",
                    "teacherName": "李二",
                    "grade":88
                },
                {
                    "id": 212,
                    "name": "长跑",
                    "teacherName": "刘安",
                    "grade":95
                }
            ],
            "page": {
                "totalElements": 3,
                "totalPages": 1,
                "pageNumber": 1,
                "pageSize": 10
            }
        }
        res.json(data);
        return;*/
		CourseService.getCourseListInSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},

	//获取课程信息
	getCsdInfo: function (req, res) {
		/*var data = {
			"data":{
				"id": '20170903',
	            "schoolYear": '16-17第1学期',
	            "major": '信息技术',
	            "teacherName": "王磊",
	            "overall": 55,
	            "data": [
	                {
	                    "time": "2017-2-3",
	                    "pitch": "1-2节",
	                    "classroom": '逸夫楼2层2013',
	                    "fivebit": 10,
	                    "fourbit": 4,
	                    "threebit": 2,
	                    "twobit": 0,
	                    "onebit": 4
	                },
	                {
	                    "time": "2017-2-5",
	                    "pitch": "3-4节",
	                    "classroom": '逸夫楼4层2013',
	                    "fivebit": 15,
	                    "fourbit": 4,
	                    "threebit": 2,
	                    "twobit": 0,
	                    "onebit": 4
	                },
	                {
	                    "time": "2017-2-9",
	                    "pitch": "5-6节",
	                    "classroom": '逸夫楼2层2003',
	                    "fivebit": 10,
	                    "fourbit": 0,
	                    "threebit": 1,
	                    "twobit": 0,
	                    "onebit": 4
	                }
	            ]
			},
			"page": {
                "totalElements": 3,
                "totalPages": 1,
                "pageNumber": 1,
                "pageSize": 10
            } 
            
        }
        res.json(data);
        return;*/
		CourseService.getCsdInfoSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},


	//获取课程评教信息
	getDetailInfo: function (req, res) {
		/*var data = {
            "data": {
                "major": "信息技术",
                "id": 201313,
                "time": 2017,
	            "data": [
	                {
	                    "class": "通信05-01",
	                    "pitch": "1-2节",
	                    "ber": 5,
	                    "time": "2017-3-7 14:09:21",
	                    "content": "老师讲太快 老师讲太快 老师讲太快 老师讲太快 "
	                },
	                {
	                    "class": "通信05-02",
	                    "pitch": "1-2节",
	                    "ber": 1,
	                    "time": "2017-3-5 14:09:21",
	                    "content": "讲的非常好"
	                },
	                {
	                    "class": "通信05-01",
	                    "pitch": "1-2节",
	                    "ber": 5,
	                    "time":" 2017-4-7 14:09:21",
	                    "content": "没有逻辑"
	                }
	            ]
	        },
            "page": {
                "totalElements": 3,
                "totalPages": 1,
                "pageNumber": 1,
                "pageSize": 10
            }         
        }
        res.json(data);
        return;*/
		CourseService.getDetailInfoSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},
	
	addCourse: function (req, res) {
		CourseService.addCourseSync(req.body, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},
	deleteCourse: function (req, res) {
		CourseService.deleteCourseSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},
	updateCourse: function (req, res) {
		CourseService.updateCourseSync(req.body, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},
	getCourseById: function (req, res) {
		CourseService.getCourseByIdSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},
	getCourseDropListOrg: function (req, res) {
		CourseService.getCourseDropListOrgSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},
	getImpResult:function (req, res) {
		CourseService.getImpResultSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},
	exportCourse: function (req, res) {
		CourseService.getCourseListSync(req.query, req.user.access_token)
			.then(function (data) {
				var datas = [
					["课程名称", "课程编号","课程性质", "学分", "课程描述"]
				];
				var values = data.data;
				for (var index in values) {
					var item = values[index];
					datas.push([item.name, item.code, item.courseProp, item.credit, item.courseDesc]);
				}
				var ws = XLSX.utils.aoa_to_sheet(datas);
				var wb = XLSX.utils.book_new();
				XLSX.utils.book_append_sheet(wb, ws, "课程信息");
				res.status(200).send(XLSX.write(wb, {type: 'binary', bookType: 'xlsx'}));
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},

};


