'use strict';

angular.module('dleduWebApp')
    .controller('TeachClassTeacherUpdateCtrl', function ($scope, $state, CourseService, AuthService, messageService, $timeout, Select2LoadOptionsService, TeacherService, TeachClassService) {
        /**
         * 更新教学班老师
         * @type {{params: {ids: Array, teachingClassId: number}, teacherIds: [*], teacherDropList: Array, select2Options: select2Options, submit: submit, addTeachClassTeacher: addTeachClassTeacher, addOneClassTeacher: addOneClassTeacher, removeOneClassTeacher: removeOneClassTeacher, init: init}}
         */
        $scope.teacherUpdateFn = {
            //参数
            params: {
                ids: [],
                teachingClassId: 0
            },
            //模拟教师数据
            teacherIds:["0.default"],
            //教师下拉列表
            teacherDropList: [],
            //下拉列表
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
            //提交
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
            //保存
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
                            messageService.openMsg("更新失败");
                        }else {
                            messageService.openMsg(error.data);

                        }
                    })

            },
            //增加一个老师
            addOneClassTeacher:function () {
                var _this=this;
                var temp=_.uniq(_this.teacherIds);
                if(temp.length!=_this.teacherIds.length){
                   return;
                }
                _this.teacherIds.push(_this.teacherIds.length+".default")
            },
            //移除一个老师
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
            $scope.$watch('teacherUpdateFn.teacherIds', function(newValue, oldValue) {
                   var temp=_.uniq($scope.teacherUpdateFn.teacherIds);
                   if(temp.length!=$scope.teacherUpdateFn.teacherIds.length){
                       messageService.openMsg("您选择的老师重复了！");
                   }
            },true);
        })
    });