/**
 * Created by wangjun on 2016/11/23.
 */
'use strict';

angular.module('dleduWebService')
    .factory('FeedbackService', function ($http) {
        return {
            getFeedbackList:function(params){
                return $http({
                    method: "GET",
                    url: "api/feedback/getFeedbackList",
                    params:params
                });
            },
            findFeedbackById:function(params){
                return $http({
                    method: "GET",
                    url: "api/feedback/findFeedbackById",
                    params:params
                });
            },
            findCommentById:function(params){
                return $http({
                    method: "GET",
                    url: "api/feedback/findCommentById",
                    params:params
                });
            },
            saveComment:function(params){
                return $http.post('api/feedback/saveComment', params);
            },
            saveCComment:function(params){
                return $http.post('api/feedback/saveCComment', params);
            },
            delCommentById:function(params){
                return $http({url: 'api/feedback/delCommentById', method: 'DELETE', params: params});
            },
            delCCommentById:function(params){
                return $http({url: 'api/feedback/delCCommentById', method: 'DELETE', params: params});
            },
        }
    });