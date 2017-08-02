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
				this.page.pageNumber = 1;
				this.records = [];
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
					pageSize: that.page.pageSize,
					questionnaireAssginId: that.id,
					teachingClassId: that.staticInfo.teachingClassId
				};
				EduManService.getEvaQuesUnNormalStatic(params).$promise
					.then(function (data) {
						that.records = data.data;
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
					pageSize: that.page.pageSize,
					id: that.id
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
				var questionnaireAssginStudentId = this.records[index].id;
				var questionnaireAssginId = this.id;
				var that = this;
				EduManService.getEvaQuesResult({questionnaireAssginStudentId: questionnaireAssginStudentId, questionnaireAssginId: questionnaireAssginId}).$promise
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

			//计算平均的得分和试题分数
			showScoreAndAvg: function(record){
				if(record.totalCount){
					var avg = (record.totalScore/record.totalCount).toFixed(2);
					return '(满分' + record.score + '; 平均得分'+ avg + ')';
				}else{
					return '(满分' + record.score + '; 平均得分0.00)';
				}
			},

			init: function () {
				this.id = $state.params.id;
				this.getEvaQuesNormalStatic();
				this.getEvaQuesStaticInfo();
			}
		};
		$scope.evaQueStaticFn.init();
	});