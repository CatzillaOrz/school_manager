/**
 * Created by Administrator on 2017/6/22.
 * 实践小组管理
 */
angular.module('dleduWebApp')
	.controller('StudentTaskDetailCtrl', function ($scope, $state, AuthService, EduManService, messageService, CommonService,
		PracticeManService) {
		$scope.stdFn = {
			stDetail: null,
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},
			mId: $state.params.mId,

			// 获取详情
			getStd: function () {
				var that = this;
				var params = {
					id: $state.params.id
				};
				PracticeManService.getStudentTaskDetail(params).$promise
					.then(function (data) {
						that.stDetail = data;
					})
					.catch(function (error) {

					})
			},
			taskStatus: function(stuTaskStatus) {
				if (stuTaskStatus == "uncommit") {
				  return "未提交";
				} else if (stuTaskStatus == "checkPending") {
				  return "待审核";
				} else if (stuTaskStatus == "notPass") {
				  return "未通过";
				} else if (stuTaskStatus == "backTo") {
				  return "已打回";
				} else if (stuTaskStatus == "pass") {
				  return "已通过";
				} else {
				  return "状态出错";
				}
			  },


			init: function () {
				this.getStd();
			}
		};
		$scope.stdFn.init();
	});