'use strict';

angular.module('dleduWebApp')
    .controller('TeacherListCtrl', function ($scope, ClassService) {
        $scope.majorListFn={
            //学院列表
            majorList:[],
            /**
             * 获取学院列表
             */
            getClassList:function () {
                var that=this;
                ClassService.getClassList().$promise
                    .then(function (data) {
                        that.majorList=data.data;
                    })
                    .catch(function (error) {

                    })
            },
            init:function () {
                this.getClassList();
            }
        };
        $scope.majorListFn.init();
    });
