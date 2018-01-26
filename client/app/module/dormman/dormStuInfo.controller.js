/**
 * Created by Administrator on 2017/6/22.
 * 宿舍学生明细
 */
angular.module('dleduWebApp')
	.controller('DormStuInfoCtrl', function ($scope, $state, $timeout, DormManService, CommonService, messageService,
											 ngDialog) {
		$scope.dormStuInfo = {
			currentRecord: null,
			//获取宿舍学生明细
			getDormStus: function () {
				var that = this;
				var params = {};
				params.roomId  = $state.params.id;
				DormManService.getDormStus(params).$promise
					.then(function (data) {
						if(data.result){
							that.records = data.data;
						}else{
							messageService.openMsg("查询失败！");
						}
					})
					.catch(function (error) {
						messageService.openMsg("查询异常！");
					})
			},

			/**
			 * 打开弹出框
			 */
			openBed: function(record){
				this.currentRecord = record;
				ngDialog.open({
					template: 'distBedDialog',
					width: 700,
					scope: $scope,
					preCloseCallback: function(){
					}
				})
			},

			/**
			 * 分配床位
			 */
			distBed: function(){
				DormManService.updateDistedInfo().$promise
					.then(function (data) {
						if(data.result){
							messageService.openMsg("分配床位成功！");
						}else{
							messageService.openMsg("分配床位失败！");
						}
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error,"分配床位异常！"));
					})
			},

			//移除床位
			delBed: function () {
				var that = $scope.dormMan;
				var params = {
					id: that.currentRecord.roomId
				};
				DormManService.delDorm(params).$promise
					.then(function (data) {
						messageService.openMsg("移出宿舍成功！");
						that.queryDorm();
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error,"移出宿舍失败！"));
					})
			},

			//移除提示
			deletePrompt: function (entity) {
				var that = this;
				that.currentRecord = entity;
				messageService.getMsg("您确定要把该学生移出宿舍吗？", that.delDorm);
			},


			init: function () {
				this.getDormStus($state.params.id);
			}
		};
		$scope.dormStuInfo.init();
	});