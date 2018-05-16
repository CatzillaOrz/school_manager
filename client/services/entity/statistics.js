'use strict';

angular.module('dleduWebService')
    .factory('StatisticsService', function ($http, $q, $resource) {

        return {
            getStuProcess: function (params) {
                var statistics = $resource('api/statistics/getStuProcess');
                return statistics.save(params);
            },
            getStuJournal: function (params) {
                var statistics = $resource('api/statistics/getStuJournal');
                return statistics.save(params);
            },
            getEnterpriseDetail: function (params) {
                var statistics = $resource('api/statistics/getEnterpriseDetail');
                return statistics.save(params);
            },
            exportStuJournal: function(params){
                return $http({
					method: 'GET',
					url: "api/statistics/exportStuJournal",
					params: params
				});
            },
            exportEnterpriseDetail: function(params){
                return $http({
					method: 'GET',
					url: "api/statistics/exportEnterpriseDetail",
					params: params
				});
            },
            exportStuProcess: function(params){
                return $http({
					method: 'GET',
					url: "api/statistics/exportStuProcess",
					params: params
				});
            }
        }

    });