'use strict';

angular.module('dleduWebApp')
    .controller('ClassListCtrl', function ($scope, ClassService) {
        $scope.classListFn={
            //学院列表
            classList:[],
            /**
             * 获取学院列表
             */
            getClassList:function () {
                var that=this;
                // CollegeService.getCollegeList().$promise
                //     .then(function (data) {
                //         that.classList=data.data;
                //     })
                //     .catch(function (error) {
                //
                //     })
            },
            init:function () {
                this.getClassList();
            }
        };
        $scope.classListFn.init();
    });
