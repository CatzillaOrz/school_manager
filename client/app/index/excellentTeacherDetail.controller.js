/**
 * Created by Administrator on 2017/5/26.
 */

'use strict';

angular.module('dleduWebApp')
    .controller('excellentTeacherDetailCtrl', function ($scope, $rootScope,AuthService, CollegeService, $state, messageService, $timeout,SchoolService,$sce) {
        $scope.excellentTeacherDetailFn={
            excellentTeacher:{},
           params:{
                id:""
            },
            //精品课程查询
            getExcellentTeacherById:function () {
                var _this=this;
                var params = _this.params;
                SchoolService.getExcellentTeacherById(params).$promise
                    .then(function (data) {
                        _this.excellentTeacher=data.data;
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
                _this.getExcellentTeacherById();
            }
        };
        $timeout(function () {

            $scope.excellentTeacherDetailFn.init();
        })
        var height = document.documentElement.clientHeight - 50 - 100;
        $(".content-container").css("min-height", height + "px");
    });