'use strict';

angular.module('dleduWebApp')
    .controller('TeachClassClassesUpdateCtrl', function ($scope, $state, CourseService, AuthService, messageService, $timeout, Select2LoadOptionsService, TeacherService, TeachClassService) {
        $scope.classesUpdateFn = {
            params: {
                ids: [],
                teachingClassId: 0
            },
            teacherIds:["0.default"],
            classDropList: [],
            //班级下拉列表配置
            select2ClassOptions:function(){
                var that=this;
                return {
                    ajax: {
                        url: "api/class/getClassDropListOrg",
                        dataType: 'json',
                        //delay: 250,
                        data: function (query) {
                            var params={
                                orgId: AuthService.getUser().orgId,
                                pageNumber: 1,
                                pageSize: 100,

                            }
                            params.name=query.term;
                            return params;
                        },
                        processResults: function (data, params) {
                            params.page = params.page || 1;
                            return {
                                results: data.data,
                                pagination: {
                                    more: (params.page * 30) < data.total_count
                                }
                            };
                        },
                        cache: true
                    },
                    allowClear: true,
                    templateResult: function (data) {
                        if (data.id === '') { // adjust for custom placeholder values
                            return 'Custom styled placeholder text';
                            hat.classDropList=[];
                        }
                        that.classDropList.push(data);
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
                    messageService.openMsg("您还没有选择班级！");
                    return;
                }
                var params={
                    teachingClassId:_this.params.teachingClassId,
                    ids:ids
                }
                _this.addTeachClassClasses(params);
            },
            addTeachClassClasses:function (params) {
                var _this=this;
                TeachClassService.addTeachClassClasses(params).$promise
                    .then(function (data) {
                        messageService.openMsg("修改班级成功");
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

            addOneClass:function () {
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
            $scope.classesUpdateFn.init();
        })
    });