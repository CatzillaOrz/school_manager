/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
    .factory('MajorService', function ($http, $q,$resource) {

        return {
            getMajorList: function (params) {
                var majorList = $resource('api/major/getMajorList');
                return majorList.get(params);
            },
            addMajor:function (params) {
                var major=$resource('api/major/addMajor');
                return major.save(params);
            },
            deleteMajor:function (params) {
                var major=$resource('api/major/deleteMajor');
                return major.remove(params);
            },
            updateMajor: function (params) {
                var major = $resource('api/major/updateMajor','',{
                    update: {method:'PUT'}});
                return major.update(params);
            },
            getMajorById: function (params) {
                var major = $resource('api/major/getMajorById');
                return major.get(params);
            },

        }

    });