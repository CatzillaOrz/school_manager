/**
 * Created by Administrator on 2017/5/26.
 */

'use strict';

angular.module('dleduWebApp')
    .controller('noticeDetailCtrl', function ($scope, $rootScope,AuthService, CollegeService, $state, messageService, $timeout,SchoolService,$sce,NoticeService) {
        $scope.noticeDetailFn={
            notice:{},
            params:{
                articleId:""
            },
            //精品课程查询
            getNoticeById:function () {
                var _this=this;
                var params = _this.params;
                NoticeService.getNoticeById(params).$promise
                    .then(function (data) {
                        _this.notice=data.news;
                    })
                    .catch(function (error) {

                    })
            },

            trustAsHtml:function (str) {
                return $sce.trustAsHtml(str);
            },


            init:function () {
                var _this=this;
                _this.params.articleId=$state.params.id;
                _this.getNoticeById();
            }
        };
        $timeout(function () {

            $scope.noticeDetailFn.init();
        })

    });