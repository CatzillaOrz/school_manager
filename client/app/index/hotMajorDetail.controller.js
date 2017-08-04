/**
 * Created by Administrator on 2017/5/26.
 */

'use strict';

angular.module('dleduWebApp')
    .controller('hotMajorDetailCtrl', function ($scope, $rootScope,AuthService, CollegeService, $state, messageService, $timeout,SchoolService,$sce) {
        $scope.hotMajorFn={
            hotMajor:{},
           params:{
                id:""
            },
            //精品课程查询
            getHotMajorById:function () {
                var _this=this;
                var params = _this.params;
                SchoolService.getHotMajorById(params).$promise
                    .then(function (data) {
                        _this.hotMajor=data.data;
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
                _this.getHotMajorById();
            }
        };
        $timeout(function () {

            $scope.hotMajorFn.init();

        })
        var height = document.documentElement.clientHeight - 82 - 100;
        $(".content-container").css("min-height", height + "px")
    });