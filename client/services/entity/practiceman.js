/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
    .factory('PracticeManService', function ($http, $q,$resource) {

        return {
            getEntTutorList: function (params) {
                var practiceman = $resource('api/practiceman/getEntTutorList');
                return practiceman.get(params);
            },
            getEntTutorInfo: function (params) {
                var practiceman = $resource('api/practiceman/getEntTutorInfo');
                return practiceman.get(params);
            },
            addEntTutor: function (params) {
                var practiceman = $resource('api/practiceman/addEntTutor');
                return practiceman.save(params);
            },
            delEntTutor:function (params) {
                var practiceman = $resource('api/practiceman/delEntTutor');
                return practiceman.remove(params);
            },
            updateEntTutor: function (params) {
                var practiceman = $resource('api/practiceman/updateEntTutor','',{
                    update: {method:'PUT'}});
                return practiceman.update(params);
            },
            getPracticeGroupList: function (params) {
                var practiceman = $resource('api/practiceman/getPracticeGroupList');
                return practiceman.get(params);
            },
            getPracticeGroupInfo: function (params) {
                var practiceman = $resource('api/practiceman/getPracticeGroupInfo');
                return practiceman.get(params);
            },
            addPracticeGroup: function (params) {
                var practiceman = $resource('api/practiceman/addPracticeGroup');
                return practiceman.save(params);
            },
            updatePracticeGroup: function (params) {
                var practiceman = $resource('api/practiceman/updatePracticeGroup','',{
                    update: {method:'PUT'}});
                return practiceman.update(params);
            },
            delPracticeGroup:function (params) {
                var practiceman = $resource('api/practiceman/delPracticeGroup');
                return practiceman.remove(params);
            },
            isExistInGroup:function (params) {
                var practiceman = $resource('api/practiceman/isExistInGroup');
                return practiceman.get(params);
            },
            getPeopleStats: function (params) {
                var practiceman = $resource('api/practiceman/getPeopleStats');
                return practiceman.save(params);
            },
            getTaskStats: function (params) {
                var practiceman = $resource('api/practiceman/getTaskStats');
                return practiceman.save(params);
            },
            getPeopleDetail: function (params) {
                var practiceman = $resource('api/practiceman/getPeopleDetail');
                return practiceman.save(params);
            },
            exportPeople: function (params) {
                return $http({
                    method: 'GET',
                    url: "api/practiceman/exportPeople",
                    params: params
                });
            },
            exportPeopleStats: function (params) {
                return $http({
                    method: 'GET',
                    url: "api/practiceman/exportPeopleStats",
                    params: params
                });
            },
            exportTaskStats: function (params) {
                return $http({
                    method: 'GET',
                    url: "api/practiceman/exportTaskStats",
                    params: params
                });
            },
        }

    });