'use strict';

angular.module('dleduWebApp')
    .controller('CollegeHandleCtrl', function ($scope,AuthService,CollegeService, $state,messageService) {
        $scope.handleFn={
            title:"新建院系",
            prompt:"填写以下信息以建立新的院系",
            collegeId:"",
            params:{
                orgId: AuthService.getUser().orgId,
                name:"",
                userId:AuthService.getUser().id
            },
            /**
             *
             */
            addCollege:function () {
                var that=this;
                CollegeService.addCollege(that.params).$promise
                    .then(function (data) {
                        $state.go("collegefinish")
                    })
                    .catch(function (error) {
                        messageService.openMsg("学院添加失败")
                    })
            },
            init:function () {
                var that=this;
                var handle=$state.params.handle;
                if(handle=="edit"){
                    that.collegeId=$state.params.id;
                    that.title="编辑院系信息"
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