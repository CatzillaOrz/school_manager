/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
    .factory('NewsService', function ($http, $q,$resource) {

        return {
            getNewsList: function (params) {
                var newsesList = $resource('api/news/getNewsList');
                return newsesList.get(params);
            },
            addNews:function (params) {
                var newses=$resource('api/news/addNews');
                return newses.save(params);
            },
            deleteNews:function (params) {
                var newses=$resource('api/news/deleteNews');
                return newses.remove(params);
            },
            updateNews: function (params) {
                var newses = $resource('api/news/updateNews','',{
                    update: {method:'PUT'}});
                return newses.update(params);
            },
            getNewsById: function (params) {
                var newses = $resource('api/news/getNewsById');
                return newses.get(params);
            },
            publishNews:function (params) {
                var newses = $resource('api/news/publishNews','',{
                    update: {method:'PUT'}});
                return newses.update(params);
            },
            getNewsListByOrg: function (params) {
                var newsesList = $resource('api/news/getNewsListByOrg');
                return newsesList.get(params);
            },
        }

    });