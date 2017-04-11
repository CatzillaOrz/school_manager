/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
    .factory('CollegeService', function ($http, $q,$resource) {

        return {
            getCollegeList: function (params) {
                var collegeList = $resource('api/college/getCollegeList');
                return collegeList.get(params);
            },
            addCollege:function (params) {
                var college=$resource('api/college/addCollege');
                return college.save(params);
            },
            deleteCollege:function (params) {
                var college=$resource('api/college/deleteCollege');
                return college.remove(params);
            },
            updateCollege: function (params) {
                var college = $resource('api/college/updateCollege','',{
                    update: {method:'PUT'}});
                return college.update(params);
            },
            getCollegeById: function (params) {
                var college = $resource('api/college/getCollegeById');
                return college.get(params);
            },
            getCollegeDropList: function (params) {
                var majorList = $resource('api/college/getCollegeDropList');
                return majorList.get(params);
            },
        }

    });
