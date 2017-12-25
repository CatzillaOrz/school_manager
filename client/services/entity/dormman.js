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
            }
        }

    });