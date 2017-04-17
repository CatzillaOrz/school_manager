'use strict';

angular.module('dleduWebApp')
    .controller('TeacherHandleCtrl', function ($scope, $state,TeacherService,AuthService,messageService,CollegeService,$timeout,Select2LoadOptionsService) {
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
                        that.collegeId=data.collegeId;
                        that.getCollegeById(that.collegeId);
                    })
                    .catch(function (error) {
                        //messageService.openMsg("教师添加失败")
                    })
            },
            updateTeacher:function () {
                var that=this;
                var params=that.params;
                params.collegeId=that.collegeId;
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
        $timeout(function () {
            $scope.handleFn.init();
        })
    });