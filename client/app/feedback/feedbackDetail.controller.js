'use strict';

angular.module('dleduWebApp')
    .controller('feedbackDetailCtl', function ($scope,FeedbackService, $state,CommonService) {
        $scope.feedbackFun={
            feedback:{},
            commentList:[],
            isReplay:false,
            replayContent:'',
            replayName:'发表评论',
            replayBut:'回复',
            replayId:null,
            findFeedbackById:function () {
                var _this=this;
                FeedbackService.findFeedbackById({id:$state.params.id}).success(function (data) {
                    _this.feedback = data
                })
            },
            findCommentById:function () {
                var _this=this;
                FeedbackService.findCommentById({id:$state.params.id}).success(function (data) {
                    _this.commentList = data
                })
            },
            replayOrCancel:function (demain) {
                var _this=this;
                _this.isReplay = !_this.isReplay;
                _this.replayId = demain.id;
                _this.replayContent = _this.isReplay?"回复"+demain.name+':':'';
                _this.replayBut = _this.isReplay?"取消":"回复";
                _this.replayName =  _this.isReplay?'确认回复':'发表评论';
            },
            replayComment:function () {
                var _this=this;
                if(_this.isReplay){
                    FeedbackService.saveCComment({newFeedbackComment:{id:_this.replayId},content:_this.replayContent}).success(function (data) {
                        if(data.cause =="success" ){
                            _this.findCommentById();
                            _this.isReplay = false;
                            _this.replayContent = '';
                        }
                    })
                }else{
                    FeedbackService.saveComment({newFeedback:{id:_this.feedback.id},content:_this.replayContent}).success(function (data) {
                        if(data.cause =="success" ){
                            _this.findCommentById();
                            _this.isReplay = false;
                            _this.replayContent = '';
                        }
                    })
                }
            },
            delComment:function(id){
                var _this=this;
                FeedbackService.delCommentById({id:id}).success(function (data) {
                    _this.findCommentById();
                })
            },
            delCComment:function(id){
                var _this=this;
                FeedbackService.delCCommentById({id:id}).success(function (data) {
                    _this.findCommentById();
                })
            },
            init:function(){
                var _this = this;
                _this.findFeedbackById();
                _this.findCommentById();
            }
        };
        $scope.feedbackFun.init();
    })