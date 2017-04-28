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