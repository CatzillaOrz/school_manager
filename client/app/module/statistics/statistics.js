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
            .state('impartProcess', {
                parent: 'base',
                url   : '/impartProcess',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeachingSummaryCtrl',
                        templateUrl: 'app/module/statistics/impartProcess.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '教师指导过程明细'
                }
            })
            .state('stuRoutineCount', {
                parent: 'base',
                url   : '/stuRoutineCount',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeachingSummaryCtrl',
                        templateUrl: 'app/module/statistics/stuRoutineCount.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '签到统计汇总'
                }
            })
            .state('stuRoutineDetail', {
                parent: 'base',
                url   : '/stuRoutineDetail/:id/:jobNum/:studentName/:grade/:collegeName/:professionalName/:className',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeachingSummaryCtrl',
                        templateUrl: 'app/module/statistics/stuRoutineDetail.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '签到统计详情'
                }
            })
            .state('enterpriseDetail', {
                parent: 'base',
                url   : '/enterpriseDetail',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeachingSummaryCtrl',
                        templateUrl: 'app/module/statistics/enterpriseDetail.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '实践企业统计表'
                }
            })
            .state('taskDetail', {
                parent: 'base',
                url   : '/taskDetail',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeachingSummaryCtrl',
                        templateUrl: 'app/module/statistics/taskDetail.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '实践任务明细'
                }
            })
            .state('stuReport', {
                parent: 'base',
                url   : '/stuReport',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeachingSummaryCtrl',
                        templateUrl: 'app/module/statistics/stuReport.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '学生实践报告成绩明细'
                }
            })
            .state('stuScore', {
                parent: 'base',
                url   : '/stuScore',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeachingSummaryCtrl',
                        templateUrl: 'app/module/statistics/stuScore.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '学生实习成绩汇总'
                }
            })
	});
