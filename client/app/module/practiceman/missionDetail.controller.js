/**
 * Created by Administrator on 2017/6/22.
 * 实践小组管理
 */
angular.module('dleduWebApp')
	.controller('MissionDetailCtrl', function ($scope, $state, AuthService, EduManService, messageService, CommonService,
		PracticeManService) {
		$scope.practiceGroupMan = {
			weekTaskList: [],
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},
			currentEntity: null,
			//查询条件
			queryOption: {
				name: '',
			},

			// 获取课程列表
			getPracticeGroupList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					id: $state.params.id
				};
				PracticeManService.getMissionDetail(params).$promise
					.then(function (data) {
						that.records = data.data.data;
						that.page = data.data.page;
					})
					.catch(function (error) {

					})
			},

			deleteWeekTask: function () {
				var that = $scope.practiceGroupMan;
				var params = {
					id: that.currentEntity.id
				};
				PracticeManService.deleteWeekTask(params).$promise
					.then(function (data) {
						messageService.openMsg("删除成功！");
						that.getPracticeGroupList();
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error, "删除失败！"));
					})
			},
			//删除提示
			deletePrompt: function (entity) {
				var that = this;
				that.currentEntity = entity;
				messageService.getMsg("您确定要删除此条记录吗？", that.deleteWeekTask)
			},

			init: function () {
				this.getPracticeGroupList();
			},
			taskStatus: function(task) {
				if (task.studentTaskStatus == "uncommit") {
				  return "未提交";
				} else if (task.studentTaskStatus == "checkPending") {
				  return "待审核";
				} else if (task.studentTaskStatus == "notPass") {
				  return "未通过";
				} else if (task.studentTaskStatus == "backTo") {
				  return "已打回";
				} else if (task.studentTaskStatus == "finish") {
				  return "已通过";
				} else {
				  return "状态出错";
				}
			  }
		};
		$scope.practiceGroupMan.init();
	});