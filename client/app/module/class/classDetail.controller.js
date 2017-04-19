'use strict';

angular.module('dleduWebApp')
    .controller('ClassDetailCtrl', function ($scope,$state, ClassService,AuthService,messageService) {
        $scope.classDetailFn={
            classes:{},
            params:{
                id:0
            },
            currentTeacher:{},
            classTeacherList:[],
            getClassById: function () {
                var that = this;
                var params = {
                    id: that.params.id
                }
                ClassService.getClassById(params).$promise
                    .then(function (data) {
                       that.classes=data;

                    })
                    .catch(function (error) {
                        //messageService.openMsg("班级添加失败")
                    })
            },
            getClassTeacherList:function () {
                var _this=this;
                var params={
                    classesId: _this.params.id
                };
                ClassService.getClassTeacherList(params).$promise
                    .then(function (data) {
                        _this.classTeacherList=data.data;

                    })
                    .catch(function (error) {
                        //messageService.openMsg("班级添加失败")
                    })
            },
            //删除
            deleteClassTeacher: function () {
                var _this = $scope.classDetailFn;
                var ids=[];
                ids.push( _this.currentTeacher.id);
                var params = {
                    ids:ids,
                    classesId: _this.params.id,
                }
                ClassService.deleteClassTeacher(params).$promise
                    .then(function (data) {
                        messageService.openMsg("班主任删除成功！");
                        _this.getClassTeacherList();
                    })
                    .catch(function (error) {
                        messageService.openMsg("班主任删除失败！");
                    })
            },
            //删除提示
            deletePrompt: function (entity) {
                var that=this;
                that.currentTeacher = entity;
                messageService.getMsg("您确定要删除此班主任吗？", that.deleteClassTeacher)
            },
            init:function () {
                var _this=this;
                _this.params.id = $state.params.id;
                _this.getClassById();
                _this.getClassTeacherList();
            }
        };
        $scope.classDetailFn.init();

    });
