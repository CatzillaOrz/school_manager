'use strict';

angular.module('dleduWebApp')
    .controller('ClassListCtrl', function ($scope, ClassService,AuthService) {
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
            params: {},

            // 获取班级列表
            getClassList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                }
                ClassService.getClassList(params).$promise
                    .then(function (data) {
                        that.classList = data.data;
                    })
                    .catch(function (error) {

                    })
            },
            //根据名称查询
            findClassByName: function () {

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
                this.currentClass = entity;
                messageService.getMsg("您确定要删除此班级吗？", this.deleteClass)
            },
            init: function () {
                this.getClassList();
            }
        };
        $scope.classListFn.init();
    });
