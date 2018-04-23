/**
 * Created by Administrator on 2017/6/22.
 * 实践小组管理
 */
angular.module('dleduWebApp')
	.controller('TeachingSummaryCtrl', function ($scope, $state, AuthService, EduManService, messageService, CommonService,
		PracticeManService) {
		$scope.summaryFn = {
			page:{
				totalElements: 10,
				pageNumber: 2,
				pageSize: 10,
			},
			getPracticeGroupList: function(){}
		}
		console.log('Hello Teacher');
	});