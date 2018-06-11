'use strict';

angular.module('dleduWebService')
    .factory('StatisticsService', function ($http, $q, $resource) {

        return {
            stuReport: function (params) {
                var statistics = $resource('api/statistics/stuReport');
                return statistics.save(params);
            },
            studentAttending: function (params) {
                var statistics = $resource('api/statistics/studentAttending');
                return statistics.save(params);
            },
            teachingSummary: function (params) {
                var statistics = $resource('api/statistics/teachingSummary');
                return statistics.save(params);
            },
            getStudentActive: function (params) {
                var statistics = $resource('api/statistics/getStudentActive');
                return statistics.save(params);
            },
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
            },
            exportStudentActive: function(params){
                return $http({
					method: 'GET',
					url: "api/statistics/exportStudentActive",
					params: params
				});
            },
            exportStudentAttending: function(params){
                return $http({
					method: 'GET',
					url: "api/statistics/exportStudentAttending",
					params: params
				});
            },
            exportStuReport: function(params){
                return $http({
					method: 'GET',
					url: "api/statistics/exportStuReport",
					params: params
				});
            },
            exportTeachingSummary: function(params){
                return $http({
					method: 'GET',
					url: "api/statistics/exportTeachingSummary",
					params: params
				});
            }
        }

    });