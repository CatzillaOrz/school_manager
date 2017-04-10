'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('majorlist', {
                parent: 'base',
                url   : '/major/list',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'MajorListCtrl',
                        templateUrl: 'app/module/major/majorList.html'
                    }
                }
            })
            .state('majorhandle', {
                parent: 'base',
                url   : '/major/handle/:handle/:id',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'MajorHandleCtrl',
                        templateUrl: 'app/module/major/majorHandle.html'
                    }
                }
            })
            .state('majorfinish', {
                parent: 'base',
                url   : '/major/finish/:handle',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'MajorFinishCtrl',
                        templateUrl: 'app/module/major/majorHandleFinish.html'
                    }
                }
            })
    });
