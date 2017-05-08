'use strict';

angular.module('dleduWebApp')
    .controller('ClassTeacherCtrl', function ($scope,$state, ClassService,AuthService,messageService,Select2LoadOptionsService) {
        $scope.classTeacherFn={
            classes:{},
            params:{
                id:0
            },
            teacherIds:["0.default"],
            teacherDropList:[],
            select2Options:function () {
                var _this=this;
                return{
                    ajax: Select2LoadOptionsService.getLoadOptions("api/teacher/getTeacherDropListOrg",{
                        orgId: AuthService.getUser().orgId,
                        pageNumber: 1,
                        pageSize: 100
                    },"name"),

                    templateResult: function (data) {

                    if (data.id === '') { // adjust for custom placeholder values
                        _this.teacherDropList=[];
                        return 'Custom styled placeholder text';
                    }
                     _this.teacherDropList.push(data);
                    return data.name;
                }
                }
            },
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
            submit:function () {
                var _this=this;
                var ids=_.filter(_this.teacherIds, function(value) {
                   if(value.indexOf(".default")==-1){
                        return value;
                   }
                });
                if(ids.length==0){
                    messageService.openMsg("您还没有选择哪位老师作为班主任！");
                    return;
                }
                var params={
                    classesId:_this.params.id,
                    ids:ids
                }
                _this.saveClassTeacher(params);
            },
            saveClassTeacher:function (params) {
                var _this=this;
                ClassService.saveClassTeacher(params).$promise
                    .then(function (data) {
                        $state.go("classDetail",{id:_this.params.id})
                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg(error.data);
                        }else {

                            messageService.openMsg("添加失败");
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
            init:function () {
                var _this=this;
                _this.params.id = $state.params.id;
                _this.getClassById();

            }
        };
        $scope.classTeacherFn.init();

    });
