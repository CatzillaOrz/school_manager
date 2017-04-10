'use strict';

angular.module('dleduWebApp')
    .controller('TeacherHandleCtrl', function ($scope, $state) {
        $scope.handleFn={
            title:"新建教师信息",
            prompt:"填写以下信息以建立教师信息",
            teacherId:"",
            init:function () {
                var that=this;
                var handle=$state.params.handle;
                if(handle=="edit"){
                    that.teacherId=$state.params.id;
                    that.title="编辑教师信息"
                    that.prompt="填写以下信息以建立教师信息";
                };
                $('.repeater').repeater({
                    isFirstItemUndeletable: false,
                    defaultValues: {
                        'text-input': '',
                    },
                    show: function () {
                        $(this).slideDown();
                    },
                    hide: function (deleteElement) {
                        // if(confirm('Are you sure you want to delete this element?')) {
                            $(this).slideUp(deleteElement);
                        // }
                    },
                    ready: function (setIndexes) {

                    }
                });
            }
        };
        $scope.handleFn.init();
    });