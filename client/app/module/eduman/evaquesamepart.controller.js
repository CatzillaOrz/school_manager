/**
 * Created by Administrator on 2017/6/21.
 * 同行评教
 */
angular.module('dleduWebApp')
	.controller('EvaQueSamePartCtrl', function ($scope, $state, AuthService, EduManService, RoleAuthService, ngDialog, messageService) {
		$scope.evaQuesListFn={
			//问卷列表
			records: [],
			record: null,
			//当前操作的class
			currentRecord: {},
			endDate: '',
			isShowDialog: false, //is show dialog
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			//控制按钮权限
			isUseAuth: function(type){
				return RoleAuthService.isUseAuthority(type);
			},

			// 获取评教问卷列表
			getEvaQuesList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					type: 30 //教师评学 30同行 默认10学生评教
				};
				EduManService.getEvaQuesList(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},

			//根据名称查询
			findClassByPage: function () {
				this.getEvaQuesList();
			},

			// 获取评教问卷信息
			getEvaQuesInfo: function (id) {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					id: id
				};
				EduManService.getEvaQuesInfo(params).$promise
					.then(function (data) {
						that.record = data;
					})
					.catch(function (error) {

					})
			},

			/**
			 * 预览问卷
			 */
			preViewQue: function($index){
				var id = this.records[$index].id;
				this.getEvaQuesInfo(id);
				ngDialog.open({
					template: 'queInfoDialog',
					width: 700,
					scope: $scope
				})
			},

			/**
			 * edit enddate
			 */
			openEditDate: function($index){
				this.isShowDialog = true;
				this.currentRecord = this.records[$index];
				this.endDate = this.currentRecord.endDate.substring(0, 10);
				ngDialog.open({
					template: 'editDate',
					width: 550,
					scope: $scope
				})
			},

			submit: function(){
				this.editDate();
			},

			editDate: function(){
				var that = this;
				var cloneParams = angular.copy({quesId: that.currentRecord.id, endDate: that.endDate});
				cloneParams.endDate = cloneParams.endDate + ' 23:59:59';
				EduManService.updateEvaDate(cloneParams).$promise
					.then(function (data) {
						if(data.success){
							messageService.openMsg("修改成功!");
							that.getEvaQuesList();
						}else{
							messageService.openMsg(data.message);
						}
					})
					.catch(function (error) {

					})
			},

			init: function () {
				this.getEvaQuesList();
				if($state.current.name == "evaquesamepartreport"){
					$scope.isReport = true;//是否是统计报表
				}
			}
		};
		$scope.evaQuesListFn.init();
	});