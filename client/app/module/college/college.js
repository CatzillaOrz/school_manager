'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('collegelist', {
                parent: 'base',
                url   : '/college/list',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'CollegeListCtrl',
                        templateUrl: 'app/module/college/collegeList.html'
                    }
                }
            })
            .state('collegehandle', {
                parent: 'base',
                url   : '/college/handle/:handle/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'CollegeHandleCtrl',
                        templateUrl: 'app/module/college/collegeHandle.html'
                    }
                }
            })
            .state('collegefinish', {
                parent: 'base',
                url   : '/college/finish/:handle',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'CollegeFinishCtrl',
                        templateUrl: 'app/module/college/collegeHandleFinish.html'
                    }
                }
            })
    });
