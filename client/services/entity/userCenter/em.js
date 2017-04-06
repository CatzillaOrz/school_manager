'use strict';

angular.module('dleduWebService')
    .factory('EmService', function($http) {
        return {
            getCourseT: function (params) {
                return $http({
                    method: 'GET',
                    url: '/api/userCenter/em/getCourseT',
                    params: params
                });
            },
            getCourseS: function (params) {
                return $http({
                    method: 'GET',
                    url: '/api/userCenter/em/getCourseS',
                    params: params
                });
            }
        };
    });
