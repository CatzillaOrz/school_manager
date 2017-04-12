'use strict';

angular.module('dleduWebApp')
    .controller('StudentHandleCtrl', function ($scope, $state,AuthService,StudentService,CollegeService,MajorService,messageService,ClassService) {
        $scope.handleFn={
            title:"新建学生",
            prompt:"填写以下信息以建立新的学生",
            handle:"create",
            collegeDropList:[],
            majorDropList:[],
            classDropList:[],
            collegeId:0,
            majorId:0,
            classId:0,
            params:{
                id:0,
                orgId: AuthService.getUser().orgId,
                name:"",
                userId:AuthService.getUser().id,
                phone: "",
                email: "",
                sex:"",
                jobNumber:""
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
            addStudent:function () {
                var that=this;
                var params=that.params;
                params.collegeId=that.collegeId;
                params.professionalId=that.majorId;
                params.classesId=that.classId;
                StudentService.addStudent(that.params).$promise
                    .then(function (data) {
                        $state.go("studentfinish");
                    })
                    .catch(function (error) {
                        messageService.openMsg("学生添加失败")
                    })
            },
            getStudentById:function () {
                var that= this;
                var params={
                    id: that.params.id
                }
                StudentService.getStudentById(params).$promise
                    .then(function (data) {
                        that.params=data;
                    })
                    .catch(function (error) {
                        //messageService.openMsg("学生添加失败")
                    })
            },
            updateStudent:function () {
                var that=this;
                var params=that.params;
                params.professionalId=that.majorId;
                StudentService.updateStudent(this.params).$promise
                    .then(function (data) {
                        $state.go("studentfinish",{handle:"edit"})
                    })
                    .catch(function (error) {
                        //messageService.openMsg("学生添加失败")
                    })
            },
            submit:function () {
                var that=this;
                if(that.handle=="edit"){
                    that.updateStudent();
                }else {
                    that.addStudent();
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
            getMajorDropList:function () {
                var that=this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: 100
                }
                params.collegeId=that.collegeId;
                MajorService.getMajorDropList(params).$promise
                    .then(function (data) {
                        that.majorDropList=data.data;
                    })
                    .catch(function (error) {
                    })
            },
            getClassDropList:function () {
                var that=this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: 100
                }
                params.collegeId=that.collegeId;
                ClassService.getClassDropList(params).$promise
                    .then(function (data) {
                        that.classDropList=data.data;
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
                    that.getStudentById();
                    that.title="编辑学生信息";
                    that.prompt="填写以下信息以修改学生",
                        that.getStudentById();
                };

            }
        };
        $scope.handleFn.init();
        $scope.$watch('handleFn.collegeId', function(newValue, oldValue) {
            if (newValue!=oldValue){
                $scope.handleFn.getMajorDropList();
            }
        });
        $scope.$watch('handleFn.majorId', function(newValue, oldValue) {
            if (newValue!=oldValue){
                $scope.handleFn.getClassDropList();
            }
        });
    });