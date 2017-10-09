angular.module('dleduWebService')
    .factory('GeoService', function ($http) {
        return {
            getOrgan:function(params){
                return $http({
                    method: "GET",
                    url: "api/geo/getOrgan",
                    params:params
                });
            },
            getAttendancestatistics:function(params){
                return $http({
                    method: "GET",
                    url: "api/geo/getAttendancestatistics",
                    params:params
                });
            },
            departmentsummary:function(params){
                return $http({
                    method: "GET",
                    url: "api/geo/departmentsummary",
                    params:params
                });
            },
            attendancerate:function(params){
                return $http({
                    method: "GET",
                    url: "api/geo/attendancerate",
                    params:params
                });
            },
            realtimestatistics:function(params){
                return $http({
                    method: "GET",
                    url: "api/geo/realtimestatistics",
                    params:params
                });
            },
            termtoclassrate:function(params){
                return $http({
                    method: "GET",
                    url: "api/geo/termtoclassrate",
                    params:params
                });
            },
            classranking:function(params){
                return $http({
                    method: "GET",
                    url: "api/geo/classranking",
                    params:params
                });
            },
            teacherranking:function(params){
                return $http({
                    method: "GET",
                    url: "api/geo/teacherranking",
                    params:params
                });
            },
            comprehensivepraise:function(params){
                return $http({
                    method: "GET",
                    url: "api/geo/comprehensivepraise",
                    params:params
                });
            },
        }
    });
