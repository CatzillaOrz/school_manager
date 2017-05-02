'use strict';

angular.module('dleduWebApp')
    .controller('TeachClassTeacherUpdateCtrl', function ($scope, $state, CourseService, AuthService, messageService, $timeout, Select2LoadOptionsService, TeacherService, TeachClassService) {
        $scope.teacherUpdateFn = {
            params: {
                ids: [],
                teachingClassId: 0
            },
            teacherIds:["0.default"],
            teacherDropList: [],
            select2Options: function () {
                var _this = this;
                return {
                    ajax: Select2LoadOptionsService.getLoadOptions("api/teacher/getTeacherDropListOrg", {
                        orgId: AuthService.getUser().orgId,
                        pageNumber: 1,
                        pageSize: 100
                    }, "name"),

                    templateResult: function (data) {

                        if (data.id === '') { // adjust for custom placeholder values
                            _this.teacherDropList = [];
                            return 'Custom styled placeholder text';
                        }
                        _this.teacherDropList.push(data);
                        return data.name;
                    }
                }
            },
            submit:function () {
                var _this=this;
                var ids=_.filter(_this.teacherIds, function(value) {
                    if(value.indexOf(".default")==-1){
                        return value;
                    }
                });
                if(ids.length==0){
                    messageService.openMsg("您还没有选择哪位老师作为代课老师！");
                    return;
                }
                var params={
                    teachingClassId:_this.params.teachingClassId,
                    ids:ids
                }
                _this.addTeachClassTeacher(params);
            },
            addTeachClassTeacher:function (params) {
                var _this=this;
                TeachClassService.addTeachClassTeacher(params).$promise
                    .then(function (data) {
                        messageService.openMsg("修改代课老师成功");
                        $timeout(function () {
                            $state.go("teachClassDetail",{id:_this.params.teachingClassId});
                        })

                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg(error.data);
                        }else {

                            messageService.openMsg("更新失败");
                        }
                    })

            },

            addOneClassTeacher:function () {
                var _this=this;
                _this.teacherIds.push(_this.teacherIds.length+".default")
            },
            removeOneClassTeacher:function (index) {
                var _this=this;
                _this.teacherIds.splice(index,1)
            },
            init: function () {
                var _this = this;
                _this.params.teachingClassId = $state.params.id;
            }
        }
        ;
        $timeout(function () {
            $scope.teacherUpdateFn.init();
        })
    });