'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('studentlist', {
                parent: 'base',
                url   : '/student/list',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'StudentListCtrl',
                        templateUrl: 'app/module/student/studentList.html'
                    }
                }
            })
            .state('studenthandle', {
                parent: 'base',
                url   : '/student/handle/:handle/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'StudentHandleCtrl',
                        templateUrl: 'app/module/student/studentHandle.html'
                    }
                }
            })
            .state('studentfinish', {
                parent: 'base',
                url   : '/student/finish/:handle',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'StudentFinishCtrl',
                        templateUrl: 'app/module/student/studentHandleFinish.html'
                    }
                }
            })
    });
