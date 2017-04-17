'use strict';

angular.module('dleduWebApp')
    .controller('MajorHandleCtrl', function ($scope, $state,CollegeService,MajorService,AuthService,messageService,$timeout,Select2LoadOptionsService) {
        $scope.handleFn={
            title:"",
            prompt:"",
            handle:"",
            collegeDropList:[],
            collegeId:0,
            dropKeyWord:"",
            params:{
                id:0,
                orgId: AuthService.getUser().orgId,
                name:"",
                userId:AuthService.getUser().id,
                collegeId:""
            },
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            complete:false,
            select2Options:{
                ajax: Select2LoadOptionsService.getLoadOptions("api/college/getCollegeDropList",{
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 1,
                    pageSize: 100
                },"name"),

                templateResult: function (data) {
                    if (data.id === '') { // adjust for custom placeholder values
                        return 'Custom styled placeholder text';
                    }

                    return data.name;
                }
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
                        that.collegeId=data.collegeId;
                        that.getCollegeById(that.collegeId);
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
                    name:that.dropKeyWord,
                    pageSize: 100
                }
                CollegeService.getCollegeDropList(params).$promise
                    .then(function (data) {
                        that.collegeDropList=data.data;
                    })
                    .catch(function (error) {
                    })
            },
            getCollegeById:function (collegeId) {
                var that= this;
                var params={
                    id: collegeId
                };
                CollegeService.getCollegeById(params).$promise
                    .then(function (data) {
                        var temp={
                            id:data.id,
                            name:data.name
                        }
                        that.collegeDropList.push(temp);
                        that.collegeId=data.id;

                    })
                    .catch(function (error) {
                        //messageService.openMsg("学院添加失败")
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

        $timeout(function () {
            $scope.handleFn.init();
        })
    });