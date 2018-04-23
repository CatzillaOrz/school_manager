/**
 * Created by Administrator on 2017/6/23.
 * 教师评学统计页面
 */
angular.module('dleduWebApp')
	.controller('EvaQueStaticTeaCtrl', function ($scope, $state, $window, $filter, ngDialog, AuthService, EduManService, messageService) {
		$scope.evaQueStaticFn = {
			//是否显示未提交人数
			isShowUnCompelteStu: 'close', //默认未提交人数
			//统计列表
			records: [],
			//统计基本信息
			staticInfo: {},
			quePersonInfo: null, //答题详情
			id: 0, //判断链接从哪块过来。0从问卷列表过来，1从已分配页面过来
			type: '', //判断统计所有问卷信息还是针对某个问卷
			requestEnd: true, //判断请求是否结束
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
				if(!that.requestEnd){
					messageService.openMsg("请稍候点击！");
					return;
				}
				that.requestEnd = false;
				EduManService.getEvaQuesUncompleteStu(params).$promise
					.then(function (data) {
						that.requestEnd = true;
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {
						that.requestEnd = true;
						messageService.openMsg("查询异常！");
					})
			},

			//查看已经提交的评语
			lookComment: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					type: that.type
				};
				that.type == 0 ? params.questionnaireId = that.id : params.questionnaireAssginId = that.id;
				if(!that.requestEnd){
					messageService.openMsg("请稍候点击！");
					return;
				}
				that.requestEnd = false;
				EduManService.lookComment(params).$promise
					.then(function (data) {
						that.requestEnd = true;
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {
						that.requestEnd = true;
						messageService.openMsg("查询异常！");

					})
			},

			//显示未提交人数
			showUncompelteStu: function(type){
				this.isShowUnCompelteStu = type;
				this.records = [];
				this.page = {
					totalElements: 0,
					totalPages: 0,
					pageNumber: 1,
					pageSize: 6
				};
				if(this.isShowUnCompelteStu == 'uncomplete'){
					this.getEvaQuesUncompleteStu();
				}else if(this.isShowUnCompelteStu == 'look') {
					this.lookComment();
				}
			},

			//确定是否导出excel
			confirmExcel: function(){
				var endDate = $filter("date")(this.staticInfo.endDate, "yyyy-MM-dd"), currentDate = new Date().Format("yyyy-MM-dd");
				var currentTime = new Date(currentDate + ' 00:00:00').getTime(), endTime = new Date(endDate + ' 00:00:00').getTime() + 86400000;
				if(currentTime < endTime){
					messageService.getMsg("该问卷还未结束，您确认现在导出报表吗？", this.exportQuesResult);
				}else{
					this.exportQuesResult();
				}
			},

			//导出问卷答题结果
			exportQuesResult: function(){
				var that = $scope.evaQueStaticFn;
				var params = {
					orgId: AuthService.getUser().orgId,
					type: that.type
				};
				that.type == 0 ? params.questionnaireId = that.id : params.questionnaireAssginId = that.id;
				EduManService.exportQuesResult(params).$promise
					.then(function(data){
						if(data && data.result){
							$window.location.href = data.data;
						}else{
							messageService.openMsg("导出报表失败！");
						}
					})
					.catch(function(e){
						messageService.openMsg("导出报表异常！");
					});
			},

			init: function () {
				this.id = $state.params.id; //问卷id;
				this.type = $state.params.type;
				this.getEvaQuesStaticInfo();
				//this.getEvaQuesUncompleteStu();
			}
		};
		$scope.evaQueStaticFn.init();
	});