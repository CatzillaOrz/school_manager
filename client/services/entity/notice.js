/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
    .factory('NoticeService', function ($http, $q, $resource) {

        return {
            getNoticeList: function (params) {
                var coursesList = $resource('api/notice/getNoticeList');
                return coursesList.get(params);
            },
            getNoticeById: function (params) {
                var coursesList = $resource('api/notice/getNoticeById');
                return coursesList.get(params);
            }

        }

    });