'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('index', {
                url   : '/index',
                access: {requiredLogin: false},
                views : {
                    root: {
                        controller : 'templet1Ctrl',
                        templateUrl: 'app/index/templet1/templet1.html'
                    }
                },
            })
    });

