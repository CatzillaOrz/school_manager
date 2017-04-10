'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('classlist', {
                parent: 'base',
                url   : '/class/list',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'ClassListCtrl',
                        templateUrl: 'app/module/class/classList.html'
                    }
                }
            })
            .state('classhandle', {
                parent: 'base',
                url   : '/class/handle/:handle/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'ClassHandleCtrl',
                        templateUrl: 'app/module/class/classHandle.html'
                    }
                }
            })
            .state('classfinish', {
                parent: 'base',
                url   : '/class/finish/:handle',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'ClassFinishCtrl',
                        templateUrl: 'app/module/class/classHandleFinish.html'
                    }
                }
            })
    });
