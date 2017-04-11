'use strict';

angular.module('dleduWebApp')
    .controller('CollegeHandleCtrl', function ($scope,AuthService,CollegeService, $state,messageService) {
        $scope.handleFn={
            title:"新建院系",
            prompt:"填写以下信息以建立新的院系",
            handle:"create",
            params:{
                id:0,
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
            getCollegeById:function () {
                var that= this;
                var params={
                    id: that.params.id
                }
                CollegeService.getCollegeById(params).$promise
                    .then(function (data) {
                        that.params.name=data.name;
                    })
                    .catch(function (error) {
                        //messageService.openMsg("学院添加失败")
                    })
            },
            updateCollege:function () {
                var that=this;
                CollegeService.updateCollege(this.params).$promise
                    .then(function (data) {
                        $state.go("collegefinish",{handle:"edit"})
                    })
                    .catch(function (error) {
                        //messageService.openMsg("学院添加失败")
                    })
            },
            submit:function () {
                var that=this;
                if(that.handle=="edit"){
                    that.updateCollege();
                }else {
                    that.addCollege();
                }
            },
            init:function () {
                var that=this;
                that.handle=$state.params.handle;
                if(that.handle=="edit"){
                    that.params.id=$state.params.id;
                    that.title="编辑院系信息";
                    that.getCollegeById();
                };

            }
        };
        $scope.handleFn.init();
    });