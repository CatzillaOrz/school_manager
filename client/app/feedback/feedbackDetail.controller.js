'use strict';

angular.module('dleduWebApp')
    .controller('feedbackDetailCtl', function ($scope,FeedbackService, $state,messageService) {
        $scope.feedbackFun={
            feedback:{},
            commentList:[],
            isReplay:false,
            replayContent:'',
            replayName:'发表评论',
            replayBut:'回复',
            replayId:null,
            finished:$state.params.finished,
            findFeedbackById:function () {
                var _this=this;
                FeedbackService.findFeedbackById({id:$state.params.id}).success(function (data) {
                    _this.feedback = data
                })
            },
            findCommentById:function () {
                var _this=this;
                FeedbackService.findCommentById({id:$state.params.id}).success(function (data) {
                    _this.commentList = _.map(data,function(item){
                        item.isShowDelBut = false;
                        item.ccommentListDomains=_.map(item.ccommentListDomains,function(item2){
                            item2.isShowReplayBut = false;
                            return item2;
                        })
                        return item;
                    })
                })
            },
            replayOrCancel:function (id,name) {
                var _this=this;
                _this.isReplay = !_this.isReplay;
                _this.replayId = id;
                _this.replayContent = _this.isReplay?"回复"+name+':':'';
                _this.replayBut = _this.isReplay?"取消":"回复";
                _this.replayName =  _this.isReplay?'确认回复':'发表评论';
            },
            openPicture:function(url){
                window.open(url);
            },
            replayComment:function () {

                var _this=this;
                if(_this.replayContent == ''){
                    messageService.openMsg("评论内容不能为空！");
                    return;
                }
                if(_this.isReplay){
                    FeedbackService.saveCComment({newFeedbackComment:{id:_this.replayId},content:_this.replayContent}).success(function (data) {
                        if(data.cause =="success" ){
                            _this.findCommentById();
                            _this.isReplay = false;
                            _this.replayContent = '';
                            _this.replayBut = "回复";
                            _this.replayName = '发表评论';
                        }
                    })
                }else{
                    FeedbackService.saveComment({newFeedback:{id:_this.feedback.id},content:_this.replayContent}).success(function (data) {
                        if(data.cause =="success" ){
                            _this.findCommentById();
                            _this.isReplay = false;
                            _this.replayContent = '';
                            _this.replayBut = "回复";
                            _this.replayName = '发表评论';
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