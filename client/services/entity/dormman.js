/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
    .factory('DormManService', function ($http, $q,$resource) {

        return {
            getDormBuildings: function (params) {
                var dormman = $resource('api/dormman/getDormBuildings');
                return dormman.get(params);
            },
            getDormBuildingInfo: function (params) {
                var dormman = $resource('api/dormman/getDormBuildingInfo');
                return dormman.get(params);
            },
            addDormBuilding: function (params) {
                var dormman = $resource('api/dormman/addDormBuilding');
                return dormman.save(params);
            },
            delDormBuilding:function (params) {
                var dormman = $resource('api/dormman/delDormBuilding');
                return dormman.remove(params);
            },
            updateDormBuilding: function (params) {
                var dormman = $resource('api/dormman/updateDormBuilding','',{
                    update: {method:'PUT'}});
                return dormman.update(params);
            },

            getDorms: function (params) {
                var dormman = $resource('api/dormman/getDorms');
                return dormman.get(params);
            },
            getDormInfo: function (params) {
                var dormman = $resource('api/dormman/getDormInfo');
                return dormman.get(params);
            },
            addDorm: function (params) {
                var dormman = $resource('api/dormman/addDorm');
                return dormman.save(params);
            },
            delDorm:function (params) {
                var dormman = $resource('api/dormman/delDorm');
                return dormman.remove(params);
            },
            updateDorm: function (params) {
                var dormman = $resource('api/dormman/updateDorm','',{
                    update: {method:'PUT'}});
                return dormman.update(params);
            },

            validationDorm: function (params) {
                var dormman = $resource('api/dormman/validationDorm');
                return dormman.get(params);
            },
            getDistedMajors: function (params) {
                var dormman = $resource('api/dormman/getDistedMajors');
                return dormman.get(params);
            },
            getDormStus: function (params) {
                var dormman = $resource('api/dormman/getDormStus');
                return dormman.get(params);
            },
            assignDorms: function (params) {
                var dormman = $resource('api/dormman/assignDorms');
                return dormman.save(params);
            },
            closeDorms: function (params) {
                var dormman = $resource('api/dormman/closeDorms','',{
                    update: {method:'PUT'}});
                return dormman.update(params);
            },
            getDormDistedInfo: function (params) {
                var dormman = $resource('api/dormman/getDormDistedInfo');
                return dormman.get(params);
            },
            updateDistedInfo: function (params) {
                var dormman = $resource('api/dormman/updateDistedInfo');
                return dormman.save(params);
            },
            openDorms: function (params) {
                var dormman = $resource('api/dormman/openDorms','',{
                    update: {method:'PUT'}});
                return dormman.update(params);
            },
            getStusByMajor: function (params) {
                var dormman = $resource('api/dormman/getStusByMajor');
                return dormman.get(params);
            },
            distedBed: function (params) {
                var dormman = $resource('api/dormman/distedBed');
                return dormman.save(params);
            },
            delBedStu:function (params) {
                var dormman = $resource('api/dormman/delBedStu');
                return dormman.remove(params);
            },

            getStusSelected: function (params) {
                var dormman = $resource('api/dormman/getStusSelected');
                return dormman.get(params);
            },

            statisticsSelDorm: function (params) {
                var dormman = $resource('api/dormman/statisticsSelDorm');
                return dormman.get(params);
            },
            exportSelectedStu: function (params) {
                return $http({
                    method: 'GET',
                    url: "api/dormman/exportSelectedStu",
                    params: params
                });
            },
        }

    });