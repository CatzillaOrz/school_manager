'use strict';

angular.module('dleduWebService')
    .factory('PtService', function($http) {
        return {
            getTeams: function (params) {
                return $http({
                    method: 'GET',
                    url: '/api/userCenter/pt/getTeams',
                    params: params
                });
            }

        };
    });
