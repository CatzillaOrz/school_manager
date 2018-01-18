'use strict';
/**
 * 创建编辑学期
 */
angular.module('dleduWebApp')
	.controller('WeekListCtrl', function ($scope, $state, AuthService, StudentService, messageService, CommonService,
										  SchoolYearService, ngDialog) {
		$scope.weekList = {
			//学期参数
			week: {
				semesterId: "",
				name: "",
				start: "",
				lastDate: "",
				userId: AuthService.getUser().id
			},
			isShowDialog: false,
			records: [],
			currentRecord: null,
			//表单提交
			submit: function () {
				var that = this;
				that.addSemester();
			},

			addWeekDialog: function(){
				this.isShowDialog = true;
				ngDialog.open({
					template: 'weekDialog',
					width: 700,
					scope: $scope
				})
			},

			//增加
			addSemester: function () {
				var that = this;
				var params = that.week;
				SchoolYearService.addWeek(params).$promise
					.then(function (data) {
						messageService.openMsg("新增学周成功！");
						that.getWeekList();
						that.week.start = "";
						that.week.lastDate = "";
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error, "新增学周异常！"));
					})
			},
			//查询学周列表
			getWeekList: function () {
				var _this = this;
				var params = {};
				params.semesterId = this.week.semesterId;
				params.pageSize = 99999;
				params.pageNumber = 1;
				SchoolYearService.getWeekList(params).$promise
					.then(function (data) {
						_this.records = data.data;
					})
					.catch(function (error) {

					})
			},

			//删除学期
			deleteWeek: function () {
				var _this = $scope.weekList;
				var params = {
					id: _this.currentRecord.id,
					userId: AuthService.getUser().id,
				}
				SchoolYearService.deleteWeek(params).$promise
					.then(function (data) {
						messageService.openMsg("学周删除成功！");
						_this.getWeekList();
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error, "学周删除失败！"));
					})
			},
			//学期删除提示
			deleteWeekPrompt: function (record) {
				this.currentRecord = record;
				messageService.getMsg("您确定要删除此学周吗？", this.deleteWeek)
			},

			//通过id查询学年
			getSemesterById: function () {
				var _this = this;
				var params = {};
				params.id = this.week.semesterId;
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
				that.week.semesterId = $state.params.id;
				that.getWeekList();
				that.getSemesterById();
			}
		};
		$scope.weekList.init();
	});

