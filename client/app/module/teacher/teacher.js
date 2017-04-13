'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
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
                parent: 'base',
                url   : '/teacher/list',
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
            .state('teacherEdit', {
                parent: 'base',
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
                parent: 'base',
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
            .state('teacherfinish', {
                parent: 'base',
                url   : '/teacher/finish/:handle',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeacherFinishCtrl',
                        templateUrl: 'app/module/teacher/teacherHandleFinish.html'
                    }
                }
            })
    });
