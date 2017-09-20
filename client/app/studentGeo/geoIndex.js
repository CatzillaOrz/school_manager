'use strict';

angular.module('dleduWebApp')
    .config(function ($stateProvider) {
        $stateProvider
        .state('geo', {
            url   : '/geo',
            access: {requiredLogin: true},
            views : {
                'root': {
                    controller : 'studentGeoCtl',
                    templateUrl: 'app/studentGeo/studentGeo.html'
                }
            },
        })
    });
