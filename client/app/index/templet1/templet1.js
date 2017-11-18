'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('templet1', {
                url   : '/templet1',
                access: {requiredLogin: false},
                views : {
                    root: {
                        controller : 'templet1Ctrl',
                        templateUrl: 'app/index/templet1/templet1.html'
                    }
                },
            })
    });

