'use strict';

angular.module('dleduWebApp')
	.controller('TeachClassAddCtrl', function ($scope, $state, CourseService, AuthService, messageService, $timeout) {
		$scope.handleFn = {
			title: "新建教学班",
			prompt: "填写以下信息以建立新的教学班",
			handle: "create",
			params: {
				id: 0,
				orgId: AuthService.getUser().orgId,
				name: "",
				userId: AuthService.getUser().id,
				courseDesc: "",
				courseProp: ""
			},
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},
			complete: false,
			/**
			 *新增课程
			 */
			addCourse: function () {
				var that = this;
				var params = that.params;
				CourseService.addCourse(params).$promise
					.then(function (data) {
						that.complete = true;
					})
					.catch(function (error) {
						var re = /[^\u4e00-\u9fa5]/;
						if (re.test(error.data)) {
							messageService.openMsg(error.data);
						} else {
							messageService.openMsg("添加失败");
						}
					})
			},
			//获取课程信息通过id
			getCourseById: function () {
				var that = this;
				var params = {
					id: that.params.id
				}
				CourseService.getCourseById(params).$promise
					.then(function (data) {
						that.params = data
					})
					.catch(function (error) {
					})
			},
			submit: function () {
				var that = this;
				if (that.handle == "编辑课程信息") {
					that.updateCourse();
				} else {
					that.addCourse();
				}
			},
			init: function () {
				var that = this;
				that.params.id = $state.params.id;
				that.handle = $state.current.ncyBreadcrumbLabel;
				if (that.handle == "编辑课程信息") {
					that.getCourseById();
				}
				that.title = that.handle;
				that.prompt = $state.current.data.prompt;
				that.completeMSG = $state.current.data.completeMSG;

			}
		};
		$timeout(function () {
			$scope.handleFn.init();
		})
	});