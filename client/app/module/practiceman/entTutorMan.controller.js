/**
 * Created by Administrator on 2017/6/22.
 * 企业导师管理
 */
angular.module('dleduWebApp')
	.controller('EntTutorManCtrl', function ($scope, $state, AuthService, messageService, PracticeManService, CommonService,
											 AccountService, ImpBatchService) {
		$scope.entTutorMan = {
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

			//查询条件
			queryOption: {
				name: '',
			},

			// 获取企业导师列表
			getEntTutorList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					name: that.queryOption.name
				};
				CommonService.delEmptyProperty(params);
				PracticeManService.getEntTutorList(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
						that.page.pageNumber++;
					})
					.catch(function (error) {

					})
			},

			//删除企业导师
			delEntTutor: function () {
				var that = $scope.entTutorMan;
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
				var _this = $scope.entTutorMan;
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
				this.getEntTutorList();
			}
		};
		$scope.entTutorMan.init();
	});