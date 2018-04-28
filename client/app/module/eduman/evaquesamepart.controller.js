/**
 * Created by Administrator on 2017/6/21.
 * 同行评教
 */
angular.module('dleduWebApp')
	.controller('EvaQueSamePartCtrl', function ($scope, AuthService, EduManService, RoleAuthService, ngDialog) {
		$scope.evaQuesListFn={
			//问卷列表
			records: [],
			record: null,
			//当前操作的class
			currentRecord: {},
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

			init: function () {
				this.getEvaQuesList();
			}
		};
		$scope.evaQuesListFn.init();
	});