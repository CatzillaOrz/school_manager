'use strict';

angular.module('dleduWebApp')
    .controller('MajorHandleCtrl', function ($scope, $state) {
        $scope.handleFn={
            title:"新建专业",
            prompt:"填写以下信息以建立新的专业",
            collegeId:"",
            init:function () {
                var that=this;
                var handle=$state.params.handle;
                if(handle=="edit"){
                    that.collegeId=$state.params.id;
                    that.title="编辑专业信息"
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