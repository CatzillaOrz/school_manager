/**
 * Created by Administrator on 2017/6/23.
 */
angular.module('dleduWebApp')
	.controller('EvaQueStaticCtrl', function ($scope, $state, ngDialog, AuthService, EduManService) {
		$scope.evaQueStaticFn = {
			//是否显示未提交人数
			isShowUnCompelteStu: false,
			//统计列表
			records: [],
			//统计基本信息
			staticInfo: {},
			quePersonInfo: null, //答题详情
			id: 0, //判断链接从哪块过来。0从问卷列表过来，1从已分配页面过来
			type: '', //判断统计所有问卷信息还是针对某个问卷
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 6
			},

			// 获取评教问卷统计信息
			getEvaQuesStaticInfo: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					type: that.type
				};
				that.type == 0 ? params.questionnaireId = that.id : params.questionnaireAssginId = that.id;;
				EduManService.getEvaQuesStaticInfo(params).$promise
					.then(function (data) {
						that.staticInfo = data.data;
					})
					.catch(function (error) {

					})
			},


			// 获取评教问卷未提交学生信息
			getEvaQuesUncompleteStu: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					type: that.type
				};
				that.type == 0 ? params.questionnaireId = that.id : params.questionnaireAssginId = that.id;
				EduManService.getEvaQuesUncompleteStu(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},

			//导出
			exportExcel: function () {
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

			//显示未提交人数
			showUncompelteStu: function(){
				if(!this.isShowUnCompelteStu){
					this.isShowUnCompelteStu = true;
				}else{
					this.isShowUnCompelteStu = false;
				}
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

			init: function () {
				this.id = $state.params.id; //问卷id;
				this.type = $state.params.type;
				this.getEvaQuesStaticInfo();
				this.getEvaQuesUncompleteStu();
			}
		};
		$scope.evaQueStaticFn.init();
	});