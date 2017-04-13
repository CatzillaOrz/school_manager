'use strict';

angular.module('dleduWebApp')
    .controller('MajorHandleCtrl', function ($scope, $state,CollegeService,MajorService,AuthService,messageService) {
        $scope.handleFn={
            title:"",
            prompt:"",
            handle:"",
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
            complete:false,
            /**
             *
             */
            addMajor:function () {
                var that=this;
                var params=that.params;
                params.collegeId=that.collegeId;
                MajorService.addMajor(that.params).$promise
                    .then(function (data) {
                        that.complete = true;
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
                        that.complete = true;
                    })
                    .catch(function (error) {
                        //messageService.openMsg("专业添加失败")
                    })
            },
            submit:function () {
                var that=this;
                if(that.handle=="编辑专业信息"){
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
                    pageSize: 100
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
                that.params.id=$state.params.id;
                that.handle=$state.current.ncyBreadcrumbLabel;
                that.getCollegeDropList();
                if(that.handle=="编辑专业信息"){
                    that.params.id=$state.params.id;
                    that.getMajorById();
                }
                that.title=that.handle;
                that.prompt=$state.current.data.prompt;
                that.completeMSG=$state.current.data.completeMSG;

            }
        };
        $scope.handleFn.init();
    });