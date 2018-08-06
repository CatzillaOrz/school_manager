'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('index', {
                url   : '/index',
                access: {requiredLogin: false},
                views : {
                    root: {
                        controller : 'IndexSchoolCtrl',
                        templateUrl: 'app/index/templet1/indexSchool.html'
                    }
                },
            })
    });

