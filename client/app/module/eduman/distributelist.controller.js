/**
 * Created by Administrator on 2017/6/22.
 * 分配页面
 */
angular.module('dleduWebApp')
	.controller('DistributeListCtrl', function ($scope, $state, AuthService, EduManService, messageService) {
		$scope.distributeListFn={
			//问卷列表
			records: [],
			//当前操作的class
			currentRecord: {},
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			switchType: function(type){
				if(type == 'uncomplete'){
					this.getEvaQuesUnDist();
				}else{
					this.getEvaQuesDist();
				}
			},

			// 获取评教问卷已分配列表
			getEvaQuesDist: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
				EduManService.getEvaQuesDist(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},


			// 获取评教问卷未分配列表
			getEvaQuesUnDist: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
				EduManService.getEvaQuesUnDist(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},


			//根据名称查询
			findClassByPage: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
				EduManService.getEvaQuesList(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page.totalElements = data.page.totalElements;
						that.page.totalPages = data.page.totalPages;
					})
					.catch(function (error) {

					})
			},

			//撤销分配
			cancleDist: function(index){
				var params = {
					id: this.currentRecord.id,
					userId: AuthService.getUser().id,
				}
				EduManService.deleteEvaQues(params).$promise
					.then(function (data) {
						messageService.openMsg("学生删除成功！");
						_this.getStudentList();
					})
					.catch(function (error) {
						messageService.openMsg("学生删除失败！");
					})
			},

			//删除提示
			deletePrompt: function (entity) {
				var that = this;
				that.currentRecord = entity;
				messageService.getMsg("您确定要撤销问卷吗？", that.cancleDist)
			},


			init: function () {
				if($state.params.id == 1){
					$("#myTab  a:last").tab("show");
					this.getEvaQuesDist();
				}else{
					this.getEvaQuesUnDist();
				}
			}
		};
		$scope.distributeListFn.init();
	});