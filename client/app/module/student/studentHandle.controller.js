'use strict';

angular.module('dleduWebApp')
    .controller('StudentHandleCtrl', function ($scope, $state) {
        $scope.handleFn={
            title:"新建学生信息",
            prompt:"填写学生信息",
            studentId:"",
            init:function () {
                var that=this;
                var handle=$state.params.handle;
                if(handle=="edit"){
                    that.studentId=$state.params.id;
                    that.title="编辑学生信息"
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