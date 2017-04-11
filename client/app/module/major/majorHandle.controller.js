'use strict';

angular.module('dleduWebApp')
    .controller('MajorHandleCtrl', function ($scope, $state,CollegeService,MajorService,AuthService,messageService) {
        $scope.handleFn={
            title:"新建院系",
            prompt:"填写以下信息以建立新的院系",
            handle:"create",
            collegeDropList:[],
            collegeId:0,
            params:{
                id:0,
                orgId: AuthService.getUser().orgId,
                name:"",
                userId:AuthService.getUser().id
            },
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            /**
             *
             */
            addMajor:function () {
                var that=this;
                var params=that.params;
                params.collegeId=that.collegeId;
                MajorService.addMajor(that.params).$promise
                    .then(function (data) {
                        $state.go("majorfinish")
                    })
                    .catch(function (error) {
                        messageService.openMsg("专业添加失败")
                    })
            },
            getMajorById:function () {
                var that= this;
                var params={
                    id: that.params.id
                }
                MajorService.getMajorById(params).$promise
                    .then(function (data) {
                        that.params.name=data.name;
                    })
                    .catch(function (error) {
                        //messageService.openMsg("专业添加失败")
                    })
            },
            updateMajor:function () {
                var that=this;
                var params=that.params;
                params.collegeId=that.collegeId;
                MajorService.updateMajor(this.params).$promise
                    .then(function (data) {
                        $state.go("majorfinish",{handle:"edit"})
                    })
                    .catch(function (error) {
                        //messageService.openMsg("专业添加失败")
                    })
            },
            submit:function () {
                var that=this;
                if(that.handle=="edit"){
                    that.updateMajor();
                }else {
                    that.addMajor();
                }
            },
            getCollegeDropList:function () {
                var that=this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                }
                CollegeService.getCollegeDropList(params).$promise
                    .then(function (data) {
                        that.collegeDropList=data.data;
                    })
                    .catch(function (error) {
                    })
            },
            init:function () {
                var that=this;
                that.handle=$state.params.handle;
                that.getCollegeDropList();
                if(that.handle=="edit"){
                    that.params.id=$state.params.id;
                    that.getMajorById();
                    that.title="编辑院系信息";
                    that.prompt="填写以下信息以修改专业",
                    that.getMajorById();
                };

            }
        };
        $scope.handleFn.init();
    });