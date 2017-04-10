'use strict';

angular.module('dleduWebApp')
    .controller('TeacherFinishCtrl', function ($scope, $state) {
        $scope.FinishFn={
            title:"新建教师信息",
            prompt:"恭喜你，教师信息成功！",
            collegeId:"",
            init:function () {
                var that=this;
                var handle=$state.params.handle;
                if(handle=="edit"){
                    that.title="编辑教师信息";
                    that.prompt="恭喜你，编辑教师信息成功！";
                }
            }
        };
        $scope.FinishFn.init();
    });