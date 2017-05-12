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
    });
