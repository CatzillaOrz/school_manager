'use strict';

var _ = require('lodash'),
	QualityCreditService = require('../../services/qualityCreditService');
var XLSX = require('xlsx');

module.exports = {
	getQualityCreditReportList: function (req, res) {
		QualityCreditService.getQualityCreditReportListSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},

	getQualityCreditTemList: function (req, res) {
		QualityCreditService.getQualityCreditTemListSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},

	addTemplate: function (req, res) {
		QualityCreditService.addTemplateSync(req.body, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},
	delTemplate: function (req, res) {
		QualityCreditService.delTemplateSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},
	updateTemplate: function (req, res) {
		QualityCreditService.updateTemplateSync(req.body, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},
	getTemplateById: function (req, res) {
		QualityCreditService.getTemplateByIdSync(req.query, req.user.access_token)
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


	exportReport: function (req, res) {
		QualityCreditService.exportReportSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},

	exportReportById: function (req, res) {
		QualityCreditService.exportReportByIdSync(req.query, req.user.access_token)
			.then(function (data) {
				res.json(data);
			})
			.catch(function (e) {
				res.status(e.code).send(e.message);
			})
	},

};


