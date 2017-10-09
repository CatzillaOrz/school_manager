'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('geo', {
            url   : '/geo',
            access: {requiredLogin: false},
            views : {
                'root': {
                    controller : 'studentGeoCtl',
                    templateUrl: 'app/studentGeo/studentGeo.html'
                }
            },
        })
    });
