'use strict';

angular.module('dleduWebApp')
    .controller('ClassHandleCtrl', function ($scope, $state, ClassService, CollegeService, MajorService, AuthService) {
        $scope.handleFn = {
            title: "",
            prompt: "",
            handle: "create",
            collegeDropList: [],
            majorDropList: [],
            collegeId: 0,
            majorId: 0,
            params: {
                id: 0,
                orgId: AuthService.getUser().orgId,
                name: "",
                userId: AuthService.getUser().id
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
            addClass: function () {
                var that = this;
                var params = that.params;
                params.professionalId = that.majorId;
                ClassService.addClass(that.params).$promise
                    .then(function (data) {
                        that.complete = true;
                    })
                    .catch(function (error) {
                        messageService.openMsg("班级添加失败")
                    })
            },
            getClassById: function () {
                var that = this;
                var params = {
                    id: that.params.id
                }
                ClassService.getClassById(params).$promise
                    .then(function (data) {
                        that.params.name = data.name;
                    })
                    .catch(function (error) {
                        //messageService.openMsg("班级添加失败")
                    })
            },
            updateClass: function () {
                var that = this;
                var params = that.params;
                params.professionalId = that.majorId;
                ClassService.updateClass(this.params).$promise
                    .then(function (data) {
                        that.complete = true;
                    })
                    .catch(function (error) {
                        //messageService.openMsg("班级添加失败")
                    })
            },
            submit: function () {
                var that = this;
                if (that.handle == "编辑班级信息") {
                    that.updateClass();
                } else {
                    that.addClass();
                }
            },
            getCollegeDropList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: 100
                }
                CollegeService.getCollegeDropList(params).$promise
                    .then(function (data) {
                        that.collegeDropList = data.data;
                    })
                    .catch(function (error) {
                    })
            },
            getMajorDropList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: 100
                }
                params.collegeId = that.collegeId;
                MajorService.getMajorDropList(params).$promise
                    .then(function (data) {
                        that.majorDropList = data.data;
                    })
                    .catch(function (error) {
                    })
            },
            init: function () {

                var that = this;
                that.params.id = $state.params.id;
                that.handle = $state.current.ncyBreadcrumbLabel;
                that.getCollegeDropList();
                if (that.handle == "编辑班级信息") {
                    that.params.id = $state.params.id;
                    that.getClassById();
                }
                that.title = that.handle;
                that.prompt = $state.current.data.prompt;
                that.completeMSG = $state.current.data.completeMSG;

            }
        };
        $scope.handleFn.init();
        $scope.$watch('handleFn.collegeId', function (newValue, oldValue) {
            if (newValue != oldValue) {
                $scope.handleFn.getMajorDropList();
            }
        });
    });