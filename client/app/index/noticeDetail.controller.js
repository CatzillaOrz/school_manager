/**
 * Created by Administrator on 2017/5/26.
 */

'use strict';

angular.module('dleduWebApp')
    .controller('noticeDetailCtrl', function ($scope, $rootScope,AuthService, CollegeService, $state, messageService, $timeout,SchoolService,$sce,NewsService) {
        $scope.noticeDetailFn={
            notice:{},
            params:{
                id:""
            },
            getNewsById:function () {
                var _this=this;
                var params = _this.params;
                NewsService.getNewsById(params).$promise
                    .then(function (data) {
                        _this.notice=data;
                    })
                    .catch(function (error) {

                    })
            },

            trustAsHtml:function (str) {
                return $sce.trustAsHtml(str);
            },


            init:function () {
                var _this=this;
                _this.params.id=$state.params.id;
                _this.getNewsById();
            }
        };
        $timeout(function () {

            $scope.noticeDetailFn.init();

        })
        var height = document.documentElement.clientHeight - 50 - 100;
        $(".content-container").css("min-height", height + "px")
    });