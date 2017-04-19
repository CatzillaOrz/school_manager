'use strict';

angular.module('dleduWebApp')
    .controller('CollegeHandleCtrl', function ($scope,AuthService,CollegeService, $state,messageService,$timeout) {
        $scope.handleFn={
            title:"",
            prompt:"",
            handle:"",
            params:{
                id:0,
                orgId: AuthService.getUser().orgId,
                name:"",
                userId:AuthService.getUser().id
            },
            complete:false,
            /**
             *
             */
            addCollege:function () {
                var that=this;
                CollegeService.addCollege(that.params).$promise
                    .then(function (data) {
                        that.complete = true;
                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg(error.data);
                        }else {

                            messageService.openMsg("添加失败");
                        }
                    })
            },
            getCollegeById:function () {
                var that= this;
                var params={
                    id: that.params.id
                };
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
                        that.complete = true;
                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg(error.data);
                        }else {

                            messageService.openMsg("更新失败");
                        }
                    })
            },
            submit:function () {
                var that=this;
                if(that.handle=="编辑院系信息"){
                    that.updateCollege();
                }else {
                    that.addCollege();
                }
            },
            init:function () {
                var that=this;
                that.params.id=$state.params.id;
                that.handle=$state.current.ncyBreadcrumbLabel;
                if(that.handle=="编辑院系信息"){
                    that.params.id=$state.params.id;
                    that.getCollegeById();
                }
                that.title=that.handle;
                that.prompt=$state.current.data.prompt;
                that.completeMSG=$state.current.data.completeMSG;
            }
        };

        $timeout(function () {
            $scope.handleFn.init();
        })
    });