/**
 * Created by Administrator on 2017/6/21.
 */
'use strict';

angular.module('dleduWebApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('eduman', {
				abstract: true,
				parent: 'base'
			})
			.state('attendlist', {
				parent: 'base',
				url   : '/attendlist',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'AttendListCtrl',
						templateUrl: 'app/module/eduman/attendlist.html'
					}
				},
				ncyBreadcrumb: {
					label: '考勤记录'
				}
			})
            .state('attenddetail', {
                parent: 'attendlist',
                url   : '/attenddetail/:id/:classes',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'AttendDetailCtrl',
                        templateUrl: 'app/module/eduman/attendDetail.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '考勤详情'
                }
            })
			.state('coursescore', {
				parent: 'base',
				url   : '/coursescore',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'CourseScoreCtrl',
						templateUrl: 'app/module/eduman/coursescore.html'
					}
				},
				ncyBreadcrumb: {
					label: '课程评分'
				}
			})
            .state('coursescoredetail', {
                parent: 'coursescore',
                url   : '/coursescoredetail/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'CourseScoreDetailCtrl',
                        templateUrl: 'app/module/eduman/courseCoreDetail.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '课程评分详情'
                }
            })


			.state('evaquestion', {
				parent: 'base',
				url   : '/evaquestion',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EvaQuestionCtrl',
						templateUrl: 'app/module/eduman/evaquestion.html'
					}
				},
				ncyBreadcrumb: {
					label: '评教问卷'
				}
			})
			.state('evaquesshow', {
				parent: 'base',
				url   : '/evaquesshow/:id',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'EvaQuesShowCtrl',
						templateUrl: 'app/module/eduman/evaquesshow.html'
					}
				},
				ncyBreadcrumb: {
					label: '评教问卷详情'
				}
			})
			.state('elecfence', {
				parent: 'base',
				url   : '/elecfence',
				access: {requiredLogin: true},
				views : {
					'content@base': {
						controller : 'ElecFenceCtrl',
						templateUrl: 'app/module/eduman/elecfence.html'
					}
				},
				ncyBreadcrumb: {
					label: '电子围栏'
				}
			})
	});
