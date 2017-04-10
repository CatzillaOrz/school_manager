'use strict';

angular.module('dleduWebApp')
    .controller('MajorFinishCtrl', function ($scope, $state) {
        $scope.FinishFn={
            title:"新建专业",
            prompt:"恭喜你，新建专业成功！",
            collegeId:"",
            init:function () {
                var that=this;
                var handle=$state.params.handle;
                if(handle=="edit"){
                    that.title="编辑专业信息";
                    that.prompt="恭喜你，编辑专业成功！";
                }
            }
        };
        $scope.FinishFn.init();
    });