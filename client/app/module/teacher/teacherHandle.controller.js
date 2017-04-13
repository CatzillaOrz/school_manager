'use strict';

angular.module('dleduWebApp')
    .controller('TeacherHandleCtrl', function ($scope, $state,TeacherService,AuthService,messageService,CollegeService) {
        $scope.handleFn={
            title:"新建教师",
            prompt:"填写以下信息以建立新的教师",
            handle:"create",
            collegeDropList:[],
            majorDropList:[],
            collegeId:0,
            majorId:0,
            params:{
                id:0,
                orgId: AuthService.getUser().orgId,
                name:"",
                userId:AuthService.getUser().id,
                phone: "",
                email: "",
                jobNumber:"",
                sex:""
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
            addTeacher:function () {
                var that=this;
                var params=that.params;
                params.collegeId=that.collegeId;
                TeacherService.addTeacher(that.params).$promise
                    .then(function (data) {
                        that.complete = true;
                    })
                    .catch(function (error) {
                        messageService.openMsg("教师添加失败")
                    })
            },
            getTeacherById:function () {
                var that= this;
                var params={
                    id: that.params.id
                }
                TeacherService.getTeacherById(params).$promise
                    .then(function (data) {
                        that.params=data
                    })
                    .catch(function (error) {
                        //messageService.openMsg("教师添加失败")
                    })
            },
            updateTeacher:function () {
                var that=this;
                var params=that.params;
                params.professionalId=that.majorId;
                TeacherService.updateTeacher(this.params).$promise
                    .then(function (data) {
                        that.complete = true;
                    })
                    .catch(function (error) {
                        //messageService.openMsg("教师添加失败")
                    })
            },
            submit:function () {
                var that=this;
                if (that.handle == "编辑教师信息") {
                    that.updateTeacher();
                }else {
                    that.addTeacher();
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

                var that = this;
                that.params.id = $state.params.id;
                that.handle = $state.current.ncyBreadcrumbLabel;
                that.getCollegeDropList();
                if (that.handle == "编辑教师信息") {
                    that.getTeacherById();
                }
                that.title = that.handle;
                that.prompt = $state.current.data.prompt;
                that.completeMSG = $state.current.data.completeMSG;

            }
        };
        $scope.handleFn.init();
    });