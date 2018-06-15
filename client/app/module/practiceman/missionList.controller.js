angular.module('dleduWebApp')
	.controller('MissionListCtrl', function ($scope, $state, AuthService, EduManService, messageService, CommonService, ImpBatchService, $timeout, ngDialog,
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

			param: {},
			showCases: false,

			// 获取课程列表
			getPracticeGroupList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					keyWord: that.queryOption.name
				};
				PracticeManService.getMissionList(params).$promise
					.then(function (data) {
						that.weekTaskList = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},

			deleteWeekTask: function () {
				var that = $scope.practiceGroupMan;
				var params = [];
				params.push({
					id: that.currentEntity.id
				});
				PracticeManService.deleteTaskDetail(params).$promise
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

			cacheParam: function(entity){
				var that = this;
				that.param = entity;
				that.param.endDate = entity.deadLine
				// console.log(that.param);
				var params = {
                    template: 'modifyDeadline',
                    width: 600,
                    scope: $scope
                };
				ImpBatchService.openImpBatch(params);
				$timeout(function(){
					that.showCases = true;
				}, 300)
				// this.submit()
			},
			
			//修改时间
			submit: function(){
				var that = this;
				ngDialog.close();
				  PracticeManService.editTaskTime(that.param).$promise
					.then(function (data) {
						that.getPracticeGroupList();
					})

			},

			init: function () {
				this.getPracticeGroupList();
			}
		};
		$scope.practiceGroupMan.init();
	});