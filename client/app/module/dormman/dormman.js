/**
 * Created by Administrator on 2017/6/21.
 */
'use strict';

angular.module('dleduWebApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('dormmansys', {
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
					label: '宿舍楼管理'
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
					label: '宿舍楼编辑'
				}
			})
			.state('dormman', {
				parent: 'base',
				url   : '/dormman',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'DormManCtrl',
						templateUrl: 'app/module/dormman/dormMan.html'
					}
				},
				ncyBreadcrumb: {
					label: '宿舍信息'
				}
			})
			.state('dormedit', {
				parent: 'dormman',
				url   : '/dormEdit/:id',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'DormEditCtrl',
						templateUrl: 'app/module/dormman/dormEdit.html'
					}
				},
				ncyBreadcrumb: {
					label: '宿舍编辑'
				}
			})
			.state('dormstuinfo', {
				parent: 'dormman',
				url   : '/dormStuInfo/:id',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'DormStuInfoCtrl',
						templateUrl: 'app/module/dormman/dormStuInfo.html'
					}
				},
				ncyBreadcrumb: {
					label: '学生明细'
				}
			})
	});
