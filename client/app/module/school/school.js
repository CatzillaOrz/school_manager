'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('school', {
                abstract: true,
                parent: 'base'
            })
            .state('setlogo', {
                parent: 'base',
                url   : '/setlogo',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                         controller : 'SetLogoCtrl',
                        templateUrl: 'app/module/school/setLogo.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '设置学校Logo'
                }
            })
            .state('setplayview', {
                parent: 'base',
                url   : '/setplayview',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'SetPlayViewCtrl',
                        templateUrl: 'app/module/school/setPlayView.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '设置轮播图与学校简介'
                }
            })
            .state('sethotmajor', {
                parent: 'base',
                url   : '/sethotmajor',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'SetHotMajorCtrl',
                        templateUrl: 'app/module/school/setHotMajor.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '设置热门专业'
                }
            })
            .state('setexcellentteacher', {
                parent: 'base',
                url   : '/setexcellentteacher',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'SetExcellentTeacherCtrl',
                        templateUrl: 'app/module/school/setExcellentTeacher.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '设置优秀教师'
                }
            })
            .state('setboutiquecourse', {
                parent: 'base',
                url   : '/setboutiquecourse',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'SetBoutiqueCourseCtrl',
                        templateUrl: 'app/module/school/setBoutiqueCourse.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '设置精品课程'
                }
            })
            .state('boutiquecourseapply', {
                parent: 'base',
                url   : '/boutiquecourseapply',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'BoutiqueCourseApplyCtrl',
                        templateUrl: 'app/module/school/boutiqueCourseApply.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '精品课程申请处理'
                }
            })
            .state('schoolnewlist', {
                parent: 'base',
                url   : '/schoolnewlist',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'SchoolNewListCtrl',
                        templateUrl: 'app/module/school/schoolNewList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'app校园动态'
                }
            })
            .state('setschoolnew', {
                parent: 'schoolnewlist',
                url   : '/setschoolnew/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'SetSchoolNewCtrl',
                        templateUrl: 'app/module/school/setSchoolNew.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'app校园动态设置'
                }
            })
            .state('appnoticelist', {
                parent: 'base',
                url   : '/appnoticelist/:type',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'AppNoticeListCtrl',
                        templateUrl: 'app/module/school/appNoticeList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'app发布通知'
                }
            })
            .state('appnoticeset', {
                parent: 'base',
                url   : '/appnoticelist/:role/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'AppNoticeSetCtrl',
                        templateUrl: 'app/module/school/appNoticeSet.html'
                    }
                },
                ncyBreadcrumb: {
                    label: 'app通知编辑'
                }
            })
    });
