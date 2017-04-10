'use strict';

angular.module('dleduWebApp')
    .controller('ClassFinishCtrl', function ($scope, $state) {
        $scope.FinishFn={
            title:"新建班级",
            prompt:"恭喜你，新建班级成功！",
            collegeId:"",
            init:function () {
                var that=this;
                var handle=$state.params.handle;
                if(handle=="edit"){
                    that.title="编辑班级信息";
                    that.prompt="恭喜你，编辑班级成功！";
                }
            }
        };
        $scope.FinishFn.init();
    });