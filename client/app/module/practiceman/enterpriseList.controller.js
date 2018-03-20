/**
 * Created by Administrator on 2017/6/22.
 * 企业导师管理
 */
angular.module('dleduWebApp')
	.controller('enterpriseListCtrl', function ($scope, $state, AuthService, messageService, PracticeManService, CommonService,
											 AccountService, ImpBatchService) {
		$scope.enterpriseList = {
			//列表
			records: [],
			//当前操作的class
			currentRecord: {},
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			//查询条件
			queryOption: {
				name: '',
			},

			// 获取企业列表
			getEnterpriseList: function () {
				var that = this;
				var params = {
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					name: that.queryOption.name
				};
				PracticeManService.getEnterpriseList(params).$promise
					.then(function (data) {
						that.records = data.data.data;
						console.log(that.records);
						that.page = data.data.page;
						that.page.pageNumber++;
					})
					.catch(function (error) {

					})
			},

			//删除企业
			delEntTutor: function () {
				var that = $scope.enterpriseList;
				var params = {
					orgId: AuthService.getUser().orgId,
					id: that.currentRecord.id
				};
				PracticeManService.delEntTutor(params).$promise
					.then(function (data) {
						messageService.openMsg("删除成功！");
						that.getEntTutorList();
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error,"删除失败！"));
					})
			},

			//删除提示
			deletePrompt: function (entity) {
				var that = this;
				that.currentRecord = entity;
				messageService.getMsg("您确定要删除此条记录吗？", that.delEntTutor)
			},

			//重置密码
			resetPassword: function () {
				var _this = $scope.enterpriseList;
				AccountService.resetPassword( _this.currentRecord.accountId)
					.success(function (data) {
						messageService.openMsg("重置密码成功！");
						_this.getEntTutorList();
					})
					.error(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error,"重置密码失败！"));
					})
			},
			resetPasswordPrompt: function (entity) {
				var that = this;
				that.currentRecord = entity;
				messageService.getMsg("您确定要重置"+that.currentRecord.name+"的密码吗？", that.resetPassword)
			},


			/**
			 * 弹出批量导入弹出框
			 */
			openImpBatch: function(){
				var params = {
					template: 'importDialog',
					width: 600,
					scope: $scope,
				};
				ImpBatchService.openImpBatch(params);
			},

			/**
			 * 弹出批量导入弹出框
			 */
			importantBatch: function(file){
				var params = {
					file: file,
					orgId: AuthService.getUser().orgId,
					userId: AuthService.getUser().id,
					uploadType: 'entTutor'
				};
				var dialogParams = {
					template: 'importResultDialog',
					width: 600,
					scope: $scope
				};
				ImpBatchService.importantBatch(params, this, dialogParams, this.getEntTutorList);
			},

			//选择文件事件
			selected: function($newFiles){
				ImpBatchService.selected($newFiles);
			},

			/**
			 * 下载模板
			 */
			downLoad: function(){
				ImpBatchService.downLoad('entTutor');
			},


			init: function () {
				this.getEnterpriseList();
			}
		};
		$scope.enterpriseList.init();
	});