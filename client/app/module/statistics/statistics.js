/**
 * Created by Administrator on 2017/6/21.
 */
'use strict';

angular.module('dleduWebApp')
	.config(function ($stateProvider) {
		$stateProvider
            .state('teachingSummary', {
                parent: 'base',
                url   : '/teachingSummary',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeachingSummaryCtrl',
                        templateUrl: 'app/module/statistics/teachingSummary.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '实践教学汇总'
                }
            })
            .state('studentAttending', {
                parent: 'base',
                url   : '/studentAttending',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeachingSummaryCtrl',
                        templateUrl: 'app/module/statistics/studentAttending.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '学生参与明细表'
                }
            })
            .state('studentActive', {
                parent: 'base',
                url   : '/studentActive',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeachingSummaryCtrl',
                        templateUrl: 'app/module/statistics/studentActive.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '学生激活明细表'
                }
            })
            .state('stuProcess', {
                parent: 'base',
                url   : '/stuProcess',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeachingSummaryCtrl',
                        templateUrl: 'app/module/statistics/stuProcess.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '学生参与过程明细'
                }
            })
            .state('stuJournal', {
                parent: 'base',
                url   : '/stuJournal',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeachingSummaryCtrl',
                        templateUrl: 'app/module/statistics/stuJournal.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '学生日志明细表'
                }
            })
	});
