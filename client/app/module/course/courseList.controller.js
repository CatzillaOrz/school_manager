/**
 * 基础课程列表
 */
'use strict';

angular.module('dleduWebApp')
	.controller('CourseListCtrl', function ($scope, CourseService, AuthService, messageService) {
		$scope.courseListFn = {
			//课程列表
			courseList: [],
			//当前操作的course
			currentCourse: {},
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},
			params: {
				name: "",
			},

			// 获取课程列表
			getCourseList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
				params.name = that.params.name;
				CourseService.getCourseList(params).$promise
					.then(function (data) {
						that.courseList = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},
			//根据名称查询
			findCourseByPage: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
				params.name = that.params.name;
				CourseService.getCourseList(params).$promise
					.then(function (data) {
						that.courseList = data.data;
                        that.page.totalElements=data.page.totalElements;
                        that.page.totalPages=data.page.totalPages;
					})
					.catch(function (error) {

					})
			},
			//删除
			deleteCourse: function () {
				var _this = $scope.courseListFn;
				var params = {
					id: _this.currentCourse.id,
					userId: AuthService.getUser().id,
				}
				CourseService.deleteCourse(params).$promise
					.then(function (data) {
						messageService.openMsg("课程删除成功！");
						_this.getCourseList();
					})
					.catch(function (error) {
						messageService.openMsg("课程删除失败！");
					})
			},
			//删除提示
			deletePrompt: function (entity) {
				var that = this;
				that.currentCourse = entity;
				messageService.getMsg("您确定要删除此课程吗？", that.deleteCourse)
			},
			init: function () {
				this.getCourseList();
			}
		};
		$scope.courseListFn.init();
	});
