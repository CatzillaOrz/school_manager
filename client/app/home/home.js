'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                parent: 'base',
                url   : '/home',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'HomeCtrl',
                        templateUrl: 'app/home/home.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '首页'
                }
            })
            .state('subindex', {
                parent: 'base',
                url   : '/subindex/:type',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        controller : 'SubIndexCtrl',
                        templateUrl: 'app/home/subIndex.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '子功能首页'
                }
            })
    });
