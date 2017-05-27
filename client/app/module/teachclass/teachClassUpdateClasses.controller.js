'use strict';

angular.module('dleduWebApp')
    .controller('TeachClassClassesUpdateCtrl', function ($scope, $state, CourseService, AuthService, messageService, $timeout, Select2LoadOptionsService, TeacherService, TeachClassService) {
        /**
         * 更新教学班关联的行政班
         * @type {{params: {ids: Array, teachingClassId: number}, classesIds: [*], classDropList: Array, select2ClassOptions: select2ClassOptions, submit: submit, addTeachClassClasses: addTeachClassClasses, addOneClass: addOneClass, removeOneClassTeacher: removeOneClassTeacher, init: init}}
         */
        $scope.classesUpdateFn = {
            //参数
            params: {
                ids: [],
                teachingClassId: 0
            },
            //模拟教师数据
            classesIds:["0.default"],
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
            //提交
            submit:function () {
                var _this=this;
                var ids=_.filter(_this.classesIds, function(value) {
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
            //保存
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
                            messageService.openMsg("更新失败");

                        }else {

                            messageService.openMsg(error.data);
                        }
                    })

            },
            //增加行政班
            addOneClass:function () {
                var _this=this;
                var temp=_.uniq(_this.classesIds);
                if(temp.length!=_this.classesIds.length){
                    return;
                }
                _this.classesIds.push(_this.classesIds.length+".default")
            },
            //移除一个行政班
            removeOneClass:function (index) {
                var _this=this;
                _this.classesIds.splice(index,1)
            },
            init: function () {
                var _this = this;
                _this.params.teachingClassId = $state.params.id;
            }
        }
        ;
        $timeout(function () {
            $scope.classesUpdateFn.init();
            $scope.$watch('classesUpdateFn.classesIds', function(newValue, oldValue) {
                var temp=_.uniq($scope.classesUpdateFn.classesIds);
                if(temp.length!=$scope.classesUpdateFn.classesIds.length){
                    messageService.openMsg("您选择的班级重复了！");
                }
            },true);
        })
    });