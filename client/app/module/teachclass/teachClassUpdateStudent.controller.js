'use strict';

angular.module('dleduWebApp')
    .controller('TeachClassStudentUpdateCtrl', function ($scope, $state, CourseService, AuthService, messageService, $timeout, Select2LoadOptionsService, TeacherService, TeachClassService,StudentService,ClassService) {
        /**
         * 更新教学班下的学生
         * @type {{classes: {}, studentList: Array, selectClassesId: string, params: {classesId: string, orgId, pageNumber: number, pageSize: number}, keyWord: string, classesDropList: Array, selectedStudents: Array, select2Options: select2Options, getClassById: getClassById, findStudentByKey: findStudentByKey, selectStudent: selectStudent, removeSelectedStudent: removeSelectedStudent, submit: submit, addTeachClassStudent: addTeachClassStudent, addAll: addAll, removeAll: removeAll, init: init}}
         */
        $scope.studentUpdateFn = {
            //教学班对象
            classes:{},
            //学生对象
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
            //关键字
            keyWord:"",
            //班级下拉列表
            classesDropList:[],
            //选择的学生
            selectedStudents:[],
            //班级下拉列表
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
            //或去班级
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
                _this.addTeachClassStudent();
            },
            //保存
            addTeachClassStudent:function () {
                var _this=this;
                var params={
                    teachingClassId:_this.params.teachingClassId,
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
                TeachClassService.addTeachClassStudent(params).$promise
                    .then(function (data) {
                        messageService.openMsg("添加成功");
                        $state.go("teachClassDetail",{id:_this.params.teachingClassId});

                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg("添加失败");
                        }else {
                            messageService.openMsg(error.data);

                        }
                    })
            },
            //添加所有
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
                _this.params.teachingClassId = $state.params.id;
                _this.getClassById();

            }
        };
        $timeout(function () {
            $scope.studentUpdateFn.init();
            $scope.$watch('studentUpdateFn.selectClassesId', function(newValue, oldValue) {
                if (newValue!=oldValue){
                    $scope.studentUpdateFn.findStudentByKey();
                }
            });
        })
    });