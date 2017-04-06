'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('userCenter', {
                parent: 'base',
                url   : '/userCenter',
                access: {requiredLogin: true},
                views : {
                    'content@base': {
                        templateUrl: 'app/userCenter/userCenter.html',
                        controller : 'UserCenterCtrl'
                    }
                }
            })
    });
