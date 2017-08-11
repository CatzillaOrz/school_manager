/**
 * Created by Administrator on 2017/6/21.
 */
'use strict';

angular.module('dleduWebApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('practiceman', {
				abstract: true,
				parent: 'base'
			})
			.state('enttutorman', {
				parent: 'base',
				url   : '/entTutorMan',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EntTutorManCtrl',
						templateUrl: 'app/module/practiceman/entTutorMan.html'
					}
				},
				ncyBreadcrumb: {
					label: '企业导师管理'
				}
			})
			.state('editenttutor', {
				parent: 'base',
				url   : '/editEntTutor/:id',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EidtEntTutorCtrl',
						templateUrl: 'app/module/practiceman/editEntTutor.html'
					}
				},
				ncyBreadcrumb: {
					label: '编辑企业导师'
				}
			})
			.state('practicegroupman', {
				parent: 'base',
				url   : '/practiceGroupMan',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'PracticeGroupManCtrl',
						templateUrl: 'app/module/practiceman/practiceGroupMan.html'
					}
				},
				ncyBreadcrumb: {
					label: '实践小组管理'
				}
			})
			.state('createpracticegroup', {
				parent: 'base',
				url   : '/createPracticeGroup/:id/:tutorId',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'CreatePracticeGroupCtrl',
						templateUrl: 'app/module/practiceman/createPracticeGroup.html'
					}
				},
				data:{
					prompt:'填写以下信息以修改院系',
					completeMSG:'恭喜你，编辑院系成功！'
				},
				ncyBreadcrumb: {
					label: '创建实践小组'
				}
			})
	});
