'use strict';

angular.module('dleduWebApp')
    .controller('StudentFinishCtrl', function ($scope, $state) {
        $scope.FinishFn={
            title:"新建学生信息",
            prompt:"恭喜你，新建学生信息成功！",
            collegeId:"",
            init:function () {
                var that=this;
                var handle=$state.params.handle;
                if(handle=="edit"){
                    that.title="编辑学生信息";
                    that.prompt="恭喜你，编辑学生信息！";
                }
            }
        };
        $scope.FinishFn.init();
    });