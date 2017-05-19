'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('/', {
                url   : '/',
                access: {requiredLogin: false},
                views : {
                    root: {
                        controller : 'IndexCtrl',
                        templateUrl: 'app/index/index.html'
                    }
                },

            })

    });
