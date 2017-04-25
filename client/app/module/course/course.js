'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('course', {
                abstract: true,
                parent: 'base'
            })
            .state('courselist', {
                parent: 'course',
                url   : '/course/list',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'CourseListCtrl',
                        templateUrl: 'app/module/course/courseList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '课程管理'
                }
            })
            .state('courseEdit', {
                parent: 'course',
                url   : '/courseedit/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'courseHandleCtrl',
                        templateUrl: 'app/module/course/courseHandle.html'
                    }
                },
                data:{
                    prompt:'填写以下信息以修改课程',
                    completeMSG:'恭喜你，编辑课程成功！'
                },
                ncyBreadcrumb: {
                    label: '编辑课程信息'
                }
            })
            .state('courseCreat', {
                parent: 'course',
                url   : '/coursecreate',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'courseHandleCtrl',
                        templateUrl: 'app/module/course/courseHandle.html'
                    }
                },
                data:{
                    prompt:'填写以下信息以建立新的课程',
                    completeMSG:'恭喜你，新建课程成功！'
                },
                ncyBreadcrumb: {
                    label: '新建课程信息'
                }
            })

    });
