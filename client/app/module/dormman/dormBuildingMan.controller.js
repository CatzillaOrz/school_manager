/**
 * Created by Administrator on 2017/6/22.
 * 宿舍楼管理
 */
angular.module('dleduWebApp')
	.controller('DormBuildingManCtrl', function ($scope, $state, $timeout, DormManService, CommonService, messageService) {
		$scope.dormBuildingMan = {
			currentRecord: null,
			//参数
			params: {
				name: ""
			},
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			//获取导师
			getDormBuildings: function () {
				var that = this;
				var params = this.params;
				params.pageNumber = this.page.pageNumber;
				params.pageSize = this.page.pageSize;
				DormManService.getDormBuildings(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
						that.page.pageNumber++;
					})
					.catch(function (error) {

					})
			},

			//删除
			delDormBuilding: function () {
				var that = $scope.dormBuildingMan;
				var params = {
					id: that.currentRecord.id
				};
				DormManService.delDormBuilding(params).$promise
					.then(function (data) {
						messageService.openMsg("删除成功！");
						that.getDormBuildings();
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error,"删除失败！"));
					})
			},

			//删除提示
			deletePrompt: function (entity) {
				var that = this;
				that.currentRecord = entity;
				messageService.getMsg("注意：删除楼栋，此楼栋下所有关联的宿舍、学生信息都会删除！您确定还要删除楼栋吗？", that.delDormBuilding);
			},


			init: function () {
				this.getDormBuildings();
			}
		};
		$scope.dormBuildingMan.init();
	});