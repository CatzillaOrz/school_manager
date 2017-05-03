'use strict';

angular.module('dleduWebApp')
    .controller('ImportStudentCtrl', function ($scope,$state, ClassService,StudentService,AuthService,messageService,Select2LoadOptionsService,$timeout) {
        /**
         * 导入学生操作
         * @type {{classes: {}, studentList: Array, selectClassesId: string, params: {classesId: string, orgId, pageNumber: number, pageSize: number}, keyWord: string, classesDropList: Array, selectedStudents: Array, select2Options: select2Options, getClassById: getClassById, findStudentByKey: findStudentByKey, selectStudent: selectStudent, removeSelectedStudent: removeSelectedStudent, submit: submit, updateStudentToClasses: updateStudentToClasses, addAll: addAll, removeAll: removeAll, init: init}}
         */
        $scope.importStudentFn={
            //班级对象
            classes:{},
            //学生列表
            studentList:[],
            //选择的班级id
            selectClassesId:"",
            //参数
            params:{
                classesId:"",
                orgId: AuthService.getUser().orgId,
                pageNumber: 1,
                pageSize: 100
            },
            //搜索关键字
            keyWord:"",
            //班级下拉列表数据
            classesDropList:[],
            //学生下拉列表数据
            selectedStudents:[],
            //班级下拉搜索
            select2Options:function () {
                var _this=this;
                return{
                    placeholder: {
                        id: '-1', // the value of the option
                        text: '按班级筛选'
                    },
                    allowClear: true,
                    ajax: Select2LoadOptionsService.getLoadOptions("api/class/getClassDropListOrg",{
                        orgId: AuthService.getUser().orgId,
                        pageNumber: 1,
                        pageSize: 100
                    },"name"),

                    templateResult: function (data) {

                        if (data.id === '') { // adjust for custom placeholder values
                            _this.classesDropList=[];
                            return '按班级筛选';
                        }
                        _this.classesDropList.push(data);
                        return data.name;
                    }

                }
            },
            //获取班级
            getClassById: function () {
                var that = this;
                var params = {
                    id: that.params.classesId
                }
                ClassService.getClassById(params).$promise
                    .then(function (data) {
                        that.classes=data;

                    })
                    .catch(function (error) {
                        //messageService.openMsg("班级添加失败")
                    })
            },
            //通过关键字查询学生
            findStudentByKey:function () {
                var _this=this;
                var params={
                    orgId:_this.params.orgId,
                    pageNumber: _this.params.pageNumber,
                    pageSize: _this.params.pageSize
                };
                params.name=_this.keyWord;
                if(_this.selectClassesId){
                    params.classesId=_this.selectClassesId;
                }
                StudentService.getSimpleStudents(params).$promise
                    .then(function (data) {
                        _this.studentList=data.data;

                    })
                    .catch(function (error) {
                        //messageService.openMsg("班级添加失败")
                    })
            },
            //选择学生
            selectStudent:function (entity) {
               var _this=this;
                var temp= _.filter(_this.selectedStudents, function(value) {
                    if(entity.id==value.id){
                        return value;
                    }
                });
                if(temp.length==0){
                    _this.selectedStudents.splice(0,0,entity);
                }
            },
            //移除学生
            removeSelectedStudent:function (entity) {
                var _this=this;
                _this.selectedStudents= _.filter(_this.selectedStudents, function(value) {
                    if(entity.id!=value.id){
                        return value;
                    }
                });
            },
            //提交
            submit:function () {
                var _this=this;
                _this.updateStudentToClasses();
            },
            //更新数据
            updateStudentToClasses:function () {
                var _this=this;
                var params={
                    classesId:_this.params.classesId,
                    ids:[]
                };
                var ids=[];
                angular.forEach(_this.selectedStudents,function (value) {
                    ids.push(value.id);
                });
                params.ids=ids;
                if(params.ids.length==0){
                    messageService.openMsg("您还没有选择学生！");
                    return;
                }
                StudentService.updateStudentToClasses(params).$promise
                    .then(function (data) {
                        $state.go("classDetail",{id:_this.params.classesId});

                    })
                    .catch(function (error) {
                        //messageService.openMsg("班级添加失败")
                    })
            },
            //选中所有
            addAll:function () {
                var _this=this;
                _this.selectedStudents=_.union(_this.selectedStudents,this.studentList)
            },
            //移除所有
            removeAll:function () {
                var _this=this;
                _this.selectedStudents= [];
            },
            init:function () {
                var _this=this;
                _this.params.classesId = $state.params.id;
                _this.getClassById();

            }
        };

        $timeout(function () {
            $scope.importStudentFn.init();
            $scope.$watch('importStudentFn.selectClassesId', function(newValue, oldValue) {
                if (newValue!=oldValue){
                    $scope.importStudentFn.findStudentByKey();
                }
            });
        })

    });
