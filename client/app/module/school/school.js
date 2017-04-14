'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('major', {
                abstract: true,
                parent: 'base'
            })
            .state('useraccount', {
                parent: 'base',
                url   : '/account/useraccount',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        // controller : 'UserAccountCtrl',
                        templateUrl: 'app/account/userAccount.html'
                    }
                }
            })
    });
