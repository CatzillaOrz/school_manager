'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('teacher', {
                abstract: true,
                parent: 'base'
            })
            // .state('teacherlist', {
            //     parent: 'base',
            //     url   : '/teacher/list',
            //     access: {requiredLogin: true},
            //     views : {
            //         'content@base': {
            //             controller : 'TeacherListCtrl',
            //             templateUrl: 'app/module/teacher/teacherList.html'
            //         }
            //     }
            // })
            // .state('teacherhandle', {
            //     parent: 'base',
            //     url   : '/teacher/handle/:handle/:id',
            //     access: {requiredLogin: true},
            //     views : {
            //         'content@base': {
            //             controller : 'TeacherHandleCtrl',
            //             templateUrl: 'app/module/teacher/teacherHandle.html'
            //         }
            //     }
            // })
            .state('teacherlist', {
                parent: 'teacher',
                url   : '/teacher/list/:collegeId',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeacherListCtrl',
                        templateUrl: 'app/module/teacher/teacherList.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '教师管理'
                }
            })
            .state('teacherListSimplify', {
                parent: 'base',
                url   : '/teacherListSimplify',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeacherListCtrl',
                        templateUrl: 'app/module/teacher/teacherListSimplify.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '课表信息'
                }
            })
            .state('teacherEdit', {
                parent: 'teacher',
                url   : '/teacheredit/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeacherHandleCtrl',
                        templateUrl: 'app/module/teacher/teacherHandle.html'
                    }
                },
                data:{
                    prompt:'填写以下信息以修改教师',
                    completeMSG:'恭喜你，编辑教师成功！'
                },
                ncyBreadcrumb: {
                    label: '编辑教师信息'
                }
            })
            .state('teacherCreat', {
                parent: 'teacher',
                url   : '/teachercreate',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeacherHandleCtrl',
                        templateUrl: 'app/module/teacher/teacherHandle.html'
                    }
                },
                data:{
                    prompt:'填写以下信息以建立新的教师',
                    completeMSG:'恭喜你，新建教师成功！'
                },
                ncyBreadcrumb: {
                    label: '新建教师信息'
                }
            })

    });
