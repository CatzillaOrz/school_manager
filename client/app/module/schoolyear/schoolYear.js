'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('period', {
                abstract: true,
                parent: 'base'
            })
            .state('periodlist', {
                parent: 'period',
                url   : '/period/list/:position',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'SchoolYearListCtrl',
                        templateUrl: 'app/module/schoolyear/schoolYearList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '学期管理'
                }
            })
            .state('termlist', {
                parent: 'period',
                url   : '/period/termlist',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TermListCtrl',
                        templateUrl: 'app/module/schoolyear/termList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '学期安排'
                }
            })
            .state('lessonlist', {
                parent: 'period',
                url   : '/period/lessonlist',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'LessonListCtrl',
                        templateUrl: 'app/module/schoolyear/lessonList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '课节安排'
                }
            })
            .state('periodCreate', {
                parent: 'period',
                url   : '/period/create',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'PeriodHandlerCtrl',
                        templateUrl: 'app/module/schoolyear/schoolYearHandler.html'
                    }
                },
                data:{
                    prompt:'新建学期',
                    completeMSG:'恭喜你，新建学期成功！'
                },
                ncyBreadcrumb: {
                    label: '学时管理'
                }
            })
            .state('periodEdit', {
                parent: 'period',
                url   : '/period/edit/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'PeriodHandlerCtrl',
                        templateUrl: 'app/module/schoolyear/schoolYearHandler.html'
                    }
                },
                data:{
                    prompt:'编辑学期',
                    completeMSG:'恭喜你，编辑学期成功！'
                },
                ncyBreadcrumb: {
                    label: '编辑学期'
                }
            })
            .state('semesterCreate', {
                parent: 'period',
                url   : '/semester/create',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'SemesterHandlerCtrl',
                        templateUrl: 'app/module/schoolyear/semesterHandle.html'
                    }
                },
                data:{
                    prompt:'新建课节',
                    completeMSG:'恭喜你，新建课节成功！'
                },
                ncyBreadcrumb: {
                    label: '学时管理'
                }
            })
        .state('semesterEdit', {
            parent: 'period',
            url   : '/semester/edit/:id',
            access: {requiredLogin: true},
            views : {
                'content@base': {
                    controller : 'SemesterHandlerCtrl',
                    templateUrl: 'app/module/schoolyear/semesterHandle.html'
                }
            },
            data:{
                prompt:'编辑课节',
                completeMSG:'恭喜你，编辑课节成功！'
            },
            ncyBreadcrumb: {
                label: '编辑课节'
            }
        })
        .state('weeklist', {
            parent: 'termlist',
            url   : '/period/weeklist/:id',
            access: {requiredLogin: true},
            views : {
                'content@base': {
                    controller : 'WeekListCtrl',
                    templateUrl: 'app/module/schoolyear/weekList.html'
                }
            },
            ncyBreadcrumb: {
                label: '学周管理'
            }
        })

    });
