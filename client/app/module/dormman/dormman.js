/**
 * Created by Administrator on 2017/6/21.
 */
'use strict';

angular.module('dleduWebApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('dormman', {
				abstract: true,
				parent: 'base'
			})
			.state('dormbuildingman', {
				parent: 'base',
				url   : '/dormbuildingman',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'DormBuildingManCtrl',
						templateUrl: 'app/module/dormman/dormBuildingMan.html'
					}
				},
				ncyBreadcrumb: {
					label: '宿舍楼信息'
				}
			})
			.state('dormbuildingedit', {
				parent: 'dormbuildingman',
				url   : '/dormbuildingEdit/:id',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'DormBuildingEditCtrl',
						templateUrl: 'app/module/dormman/dormBuildingEdit.html'
					}
				},
				ncyBreadcrumb: {
					label: '宿舍信息'
				}
			})

	});
