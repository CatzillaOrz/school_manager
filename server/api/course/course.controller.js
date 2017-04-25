'use strict';

var _ = require('lodash'),
	CourseService = require('../../services/courseService');

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
	}

};


