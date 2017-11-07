'use strict';

angular.module('dleduWebApp')
    .controller('feedbackCtl', function ($scope,FeedbackService, messageService,CommonService) {
        $scope.feedbackFun={
            feedbackList:[],
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            params:{
                messenger:"",
                finished:"",
                character:"",
                userName:"",
            },
            getFeedbackList:function () {
                var _this=this;
                var params=_this.params;
                params.pageNumber= _this.page.pageNumber,
                params.pageSize= _this.page.pageSize,
                FeedbackService.getFeedbackList(params).success(function (data) {
                    _this.feedbackList=data.data;
                    _this.page.totalElements=data.page.totalElements;
                    _this.page.totalPages=data.page.totalPages;
                })
            },
            init:function(){
                var _this = this;
                _this.getFeedbackList();
            }
        };
        $scope.feedbackFun.init();
    })