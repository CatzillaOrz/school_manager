'use strict';

angular.module('dleduWebApp')
    .controller('TeachClassDetailCtrl', function ($scope, $state, CourseService, AuthService, messageService, $timeout, Select2LoadOptionsService, TeacherService, TeachClassService) {
        $scope.teachClassDetailFn = {
            params: {
                id: ""
            },
            teachClass: {},
            teachClassTeacherList: [],
            teachClassStudentList: [],
            currentTeacher:{},
            currentStudent:{},
            getTeachClassById: function () {
                var _this = this;
                TeachClassService.getTeachClassById(_this.params).$promise
                    .then(function (data) {
                        _this.teachClass = data;

                    })
                    .catch(function (error) {

                    })
            },
            getTeachClassTeacherList: function () {
                var _this = this;
                var params = {
                        teachingClassId: _this.params.id
                    };
                TeachClassService.getTeachClassTeacherList(params).$promise
                    .then(function (data) {
                        _this.teachClassTeacherList = data.data;

                    })
                    .catch(function (error) {

                    })
            },
            getTeachClassStudentList: function () {
                var _this = this;
                var params = {
                    teachingClassId: _this.params.id
                };
                TeachClassService.getTeachClassTeacherList(params).$promise
                    .then(function (data) {
                        _this.teachClassStudentList = data.data;

                    })
                    .catch(function (error) {

                    })
            },
            deleteTeachClassTeacher: function () {
                var _this = $scope.teachClassDetailFn;
                var params = {
                    teachingClassId: _this.params.id,
                    teacherId:_this.currentTeacher.id
                };
                TeachClassService.deleteTeachClassTeacher(params).$promise
                    .then(function (data) {
                        messageService.openMsg("解除老师成功");
                        _this.getTeachClassTeacherList();

                    })
                    .catch(function (error) {
                        messageService.openMsg("解除老师失败");
                    })
            },
            //删除提示
            deleteTeacherPrompt: function (entity) {
                var _this=this;
                _this.currentTeacher = entity;
                messageService.getMsg("您确定要删除此教学班老师吗？", _this.deleteTeachClassTeacher)
            },


            deleteTeachClassStudent: function () {
                var _this = $scope.teachClassDetailFn;
                var params = {
                    teachingClassId: _this.params.id,
                    ids:[]
                };
                params.ids.push(_this.currentStudent.id);
                TeachClassService.deleteTeachClassStudent(params).$promise
                    .then(function (data) {
                        messageService.openMsg("删除学生成功");
                        _this.getTeachClassTeacherList();

                    })
                    .catch(function (error) {
                        messageService.openMsg("删除学生失败");
                    })
            },
            //删除提示
            deleteStudentPrompt: function (entity) {
                var _this=this;
                _this.currentStudent = entity;
                messageService.getMsg("您确定要删除此教学班学生吗？", _this.deleteTeachClassStudent)
            },




            //初始化
            init: function () {
                var that = this;
                that.params.id = $state.params.id;
                that.handle = $state.current.ncyBreadcrumbLabel;
                that.title = that.handle;
                that.prompt = $state.current.data.prompt;
                that.completeMSG = $state.current.data.completeMSG;
                that.getTeachClassById();
                that.getTeachClassTeacherList();
                that.getTeachClassStudentList();
            }
        };
        $scope.teachClassDetailFn.init();
    });