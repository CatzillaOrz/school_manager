'use strict';
/**
 * 创建编辑学期
 */
angular.module('dleduWebApp')
	.controller('PeriodHandlerCtrl', function ($scope, $state, AuthService, StudentService, messageService, CommonService,
											   SchoolYearService) {
		$scope.periodHandlerFn = {
			//学期参数
			semester: {
				id: "",
				name: "",
				code: "",
				startDate: "",
				endDate: "",
				orgId: AuthService.getUser().orgId,
				orgName: AuthService.getUser().orgName,
				userId: AuthService.getUser().id
			},
			//操作完成标识
			complete: false,
			//操作标识
			handle: "",
			//提示
			prompt: "",
			//表单提交
			submit: function () {
				var that = this;
				if (that.handle == "编辑学期") {
					that.updateSemester();
				} else {
					that.addSemester();
				}
			},
			//增加
			addSemester: function () {
				var that = this;
				var params = that.semester;
				SchoolYearService.addSemester(params).$promise
					.then(function (data) {
						messageService.openMsg("新增学期成功！");
						$state.go("termlist");
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error, "新增学期失败！"));
					})
			},
			//学年更新
			updateSemester: function () {
				var that = this;
				var params = that.semester;
				params.orgId = AuthService.getUser().orgId;
				params.orgName = AuthService.getUser().orgName,
				params.userId = AuthService.getUser().id;
				SchoolYearService.updateSemester(params).$promise
					.then(function (data) {
						messageService.openMsg("更新学期成功！");
						$state.go("termlist");
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error, "更新学期失败！"));
					})
			},
			//通过id查询学年
			getSemesterById: function (params) {
				var _this = this;
				SchoolYearService.getSemesterById(params).$promise
					.then(function (data) {
						_this.semester = data;
					})
					.catch(function (error) {

					})
			},

			//初始化
			init: function () {
				var that = this;
				that.handle = $state.current.ncyBreadcrumb.label;
				if ($state.params.id) {
					var params = {
						id: $state.params.id
					}
					that.getSemesterById(params);
				}
				that.title = $state.current.data.title;
				that.prompt = $state.current.data.prompt;
				that.completeMSG = $state.current.data.completeMSG;
			}
		};
		$scope.periodHandlerFn.init();
	});

