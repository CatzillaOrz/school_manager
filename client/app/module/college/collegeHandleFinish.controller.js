'use strict';

angular.module('dleduWebApp')
    .controller('CollegeFinishCtrl', function ($scope, $state) {
        $scope.FinishFn={
            title:"新建院系",
            prompt:"恭喜你，新建院系成功！",
            collegeId:"",
            init:function () {
                var that=this;
                var handle=$state.params.handle;
                if(handle=="edit"){
                    that.title="编辑院系信息";
                    that.prompt="恭喜你，编辑院系成功！";
                }
            }
        };
        $scope.FinishFn.init();
    });