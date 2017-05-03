'use strict';

angular.module('dleduWebApp')
    .controller('ClassTeacherCtrl', function ($scope,$state, ClassService,AuthService,messageService,Select2LoadOptionsService) {
        /**
         * 班主任操作
         * @type {{classes: {}, params: {id: number}, teacherIds: [*], teacherDropList: Array, select2Options: select2Options, getClassById: getClassById, submit: submit, saveClassTeacher: saveClassTeacher, addOneClassTeacher: addOneClassTeacher, removeOneClassTeacher: removeOneClassTeacher, init: init}}
         */
        $scope.classTeacherFn={
            //班级对象
            classes:{},
            //参数
            params:{
                id:0
            },
            //构造添加多个版主人对象id数组
            teacherIds:["0.default"],
            //教师下拉列表
            teacherDropList:[],
            //下拉搜索
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
            //获取班级信息
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
            //提交
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
            //保存班主任
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
            //再增加一个班主任
            addOneClassTeacher:function () {
                var _this=this;
                _this.teacherIds.push(_this.teacherIds.length+".default")
            },
            //移除一个班主任
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
