'use strict';

angular.module('dleduWebApp')
	.controller('courseHandleCtrl', function ($scope, $state, CourseService, AuthService, messageService, $timeout) {
        /**
		 * 此控制层是创建和编辑共用
         * @type {{title: string, prompt: string, handle: string, params: {id: number, orgId, name: string, userId, courseDesc: string, courseProp: string}, page: {totalElements: number, totalPages: number, pageNumber: number, pageSize: number}, complete: boolean, addCourse: addCourse, getCourseById: getCourseById, updateCourse: updateCourse, submit: submit, init: init}}
         */
		$scope.handleFn = {
			//提示title
			title: "新建课程",
			//提示信息
			prompt: "填写以下信息以建立新的课程",
			//操作类型
			handle: "create",
			//提交参数
			params: {
				id: 0,
				orgId: AuthService.getUser().orgId,
				name: "",
				userId: AuthService.getUser().id,
				courseDesc: "",
                courseProp: "",
                credit: "",
                code:""
			},
			//操作完成标识
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
			//更新课程
			updateCourse: function () {
				var that = this;
				var params = that.params;
				params.orgId = AuthService.getUser().orgId;
				params.userId = AuthService.getUser().id;
				CourseService.updateCourse(params).$promise
					.then(function (data) {
						that.complete = true;
					})
					.catch(function (error) {
						var re = /[^\u4e00-\u9fa5]/;
						if (re.test(error.data)) {
							messageService.openMsg(error.data);
						} else {

							messageService.openMsg("更新失败");
						}
					})
			},
			//表单提交
			submit: function () {
				var that = this;
				if (that.handle == "编辑课程信息") {
					that.updateCourse();
				} else {
					that.addCourse();
				}
			},
			//页面初始化
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