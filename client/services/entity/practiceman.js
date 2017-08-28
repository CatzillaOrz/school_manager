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
        }

    });