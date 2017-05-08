'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('school', {
                abstract: true,
                parent: 'base'
            })
            .state('setlogo', {
                parent: 'school',
                url   : '/setlogo',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                         controller : 'SetLogoCtrl',
                        templateUrl: 'app/module/school/setLogo.html'
                    }
                },
                ncyBreadcrumb: {
                    label: '设置学校Logo'
                }
            })
    });
