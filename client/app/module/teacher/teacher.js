'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('teacherlist', {
                parent: 'base',
                url   : '/teacher/list',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeacherListCtrl',
                        templateUrl: 'app/module/teacher/teacherList.html'
                    }
                }
            })
            .state('teacherhandle', {
                parent: 'base',
                url   : '/teacher/handle/:handle/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'TeacherHandleCtrl',
                        templateUrl: 'app/module/teacher/teacherHandle.html'
                    }
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
