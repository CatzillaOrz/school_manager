'use strict';

angular.module('dleduWebApp')
    .controller('ClassListCtrl', function ($scope, ClassService,AuthService,messageService) {
        $scope.classListFn={
            //班级列表
            classList: [],
            //当前操作的class
            currentClass: {},
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            params: {
                name:"",
            },

            // 获取班级列表
            getClassList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.name=that.params.name;
                ClassService.getClassList(params).$promise
                    .then(function (data) {
                        that.classList = data.data;
                        that.page=data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //根据名称查询
            findClassByPage: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.name=that.params.name;
                ClassService.getClassList(params).$promise
                    .then(function (data) {
                        that.classList = data.data;
                        that.page=data.page;
                        that.page.pageNumber+=that.page.pageNumber;
                    })
                    .catch(function (error) {

                    })
            },
            //删除
            deleteClass: function () {
                var _this = $scope.classListFn;
                var params = {
                    id: _this.currentClass.id,
                    userId: AuthService.getUser().id,
                }
                ClassService.deleteClass(params).$promise
                    .then(function (data) {
                        messageService.openMsg("班级删除成功！");
                        _this.getClassList();
                    })
                    .catch(function (error) {
                        messageService.openMsg("班级删除失败！");
                    })
            },
            //删除提示
            deletePrompt: function (entity) {
                var that=this;
                that.currentClass = entity;
                messageService.getMsg("您确定要删除此班级吗？", that.deleteClass)
            },
            init: function () {
                this.getClassList();
            }
        };
        $scope.classListFn.init();
    });
