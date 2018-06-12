'use strict';

angular.module('dleduWebApp')
    .controller('InstructorListCtrl', function ($scope,$state, ClassService,AuthService,messageService,StudentService) {
        $scope.instructorListFn={
            classes:{},
            params:{
                orgId: AuthService.getUser().orgId,
                pageNumber: 1,
                pageSize: 10
            },
            page: {
                totalElements: 0,
                pageNumber: 1,
                pageSize: 10
            },
            classTeacherList: [],
            currentTeacher: {},
            getClassTeacherList:function () {
                var _this=this;
                this.params.pageNumber = this.page.pageNumber;
                ClassService.getInstructorList(_this.params).$promise
                    .then(function (data) {
                        _this.classTeacherList=data.data;
                        _this.page.totalElements = data.page.totalElements;

                    })
                    .catch(function (error) {
                        //messageService.openMsg("班级添加失败")
                    })
            },
            //删除
            deleteClassTeacher: function () {
                var _this = $scope.instructorListFn;
                var ids=[];
                ids.push( _this.currentTeacher.accountId);
                var params = {
                    ids:ids,
                    classesId: _this.currentTeacher.classesId,
                }
                ClassService.deleteClassTeacher(params).$promise
                    .then(function (data) {
                        messageService.openMsg("解除班主任成功！");
                        _this.getClassTeacherList();
                    })
                    .catch(function (error) {
                        messageService.openMsg("解除班主任失败！");
                    })
            },
            //删除提示
            deletePrompt: function (entity) {
                var that=this;
                that.currentTeacher = entity;
                messageService.getMsg("您确定要删除此班主任吗？", that.deleteClassTeacher)
            }
        };
        $scope.instructorListFn.getClassTeacherList();

    });
