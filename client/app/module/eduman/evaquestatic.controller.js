/**
 * Created by Administrator on 2017/6/23.
 */
angular.module('dleduWebApp')
	.controller('EvaQueStaticCtrl', function ($scope, $state, ngDialog, AuthService, EduManService) {
		$scope.evaQueStaticFn = {
			//统计列表
			records: [],
			//基本信息
			staticInfo: {},
			quePersonInfo: null, //答题详情
			id: 0,
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			switchType: function(type){
				if(type == 'normal'){
					this.getEvaQuesNormalStatic();
				}else{
					this.getEvaQuesUnNormalStatic();
				}
			},

			// 获取评教问卷基本信息
			getEvaQuesStaticInfo: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					id: that.id
				};
				EduManService.getEvaQuesStaticInfo(params).$promise
					.then(function (data) {
						that.staticInfo = data;
					})
					.catch(function (error) {

					})
			},


			// 获取评教问卷分题统计
			getEvaQuesUnNormalStatic: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
				EduManService.getEvaQuesUnNormalStatic(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},

			// 获取评教问卷常规
			getEvaQuesNormalStatic: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
				EduManService.getEvaQuesNormalStatic(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},

			//显示个人问卷详情
			showQueInfo: function(index){
				//var id = this.records.data[index].id;
				var that = this;
				EduManService.getEvaQuesResult().$promise
					.then(function(data){
						that.quePersonInfo = data;
					})
					.catch(function(e){

					});
				ngDialog.open({
					template: 'queInfoDialog',
					width: 600,
					scope: $scope
				})
			},


			init: function () {
				this.id = $state.params.id;
				this.getEvaQuesNormalStatic();
				this.getEvaQuesStaticInfo();
			}
		};
		$scope.evaQueStaticFn.init();
	});