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
    });
