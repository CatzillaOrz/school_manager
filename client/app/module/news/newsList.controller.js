'use strict';

angular.module('dleduWebApp')
    .controller('NewsListCtrl', function ($scope, AuthService,NewsService, messageService,CommonService) {
        $scope.newsFn={
            newsList:[],
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            params:{
                title:"",
                type:"",
            },
            currentNews:{},
            /**
             * 公告通知列表
             */
            getNewsList:function () {
                var _this=this;
                var params=_this.params;
                params.pageNumber= _this.page.pageNumber,
                params.pageSize= _this.page.pageSize
                NewsService.getNewsList(params).$promise
                    .then(function (data) {
                        _this.newsList=data.data;
                        _this.page.totalElements=data.page.totalElements;
                        _this.page.totalPages=data.page.totalPages;
                    })
                    .catch(function (error) {
                    })
            },
            getSeacherNewsList:function () {
                var _this=this;
                _this.page.pageNumber=1;
                _this.getNewsList();
            },
            /**
             * 发布公告
             */
            publishNews:function (entity) {
                var _this=this;
                var params={
                    id:entity
                };
                NewsService.publishNews(params).$promise
                    .then(function (data) {
                        CommonService.msgDialog("发布成功！",1);
                        _this.getNewsList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"发布失败！"));
                    })
            },
            //删除
            deleteNews: function () {
                var _this = $scope.newsFn;
                var params = {
                    id: _this.currentNews.id,
                    userId: AuthService.getUser().id,
                }
                NewsService.deleteNews(params).$promise
                    .then(function (data) {
                        messageService.openMsg("学生删除成功！");
                        _this.getNewsList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"学生删除失败！"));
                    })
            },
            //删除提示
            deletePrompt: function (entity) {
                var that=this;
                that.currentNews = entity;
                messageService.getMsg("您确定要删除此通知吗？", that.deleteNews)
            },
            init:function () {
                var _this=this;
                _this.getNewsList();
            }
        };
        $scope.newsFn.init();

    })