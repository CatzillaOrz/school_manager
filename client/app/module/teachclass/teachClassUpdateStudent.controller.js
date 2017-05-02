'use strict';

angular.module('dleduWebApp')
    .controller('TeachClassStudentUpdateCtrl', function ($scope, $state, CourseService, AuthService, messageService, $timeout, Select2LoadOptionsService, TeacherService, TeachClassService,StudentService,ClassService) {
        $scope.studentUpdateFn = {
            classes:{},
            studentList:[],
            selectClassesId:"",
            params:{
                classesId:"",
                orgId: AuthService.getUser().orgId,
                pageNumber: 1,
                pageSize: 100
            },
            keyWord:"",
            classesDropList:[],
            selectedStudents:[],
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
            removeSelectedStudent:function (entity) {
                var _this=this;
                _this.selectedStudents= _.filter(_this.selectedStudents, function(value) {
                    if(entity.id!=value.id){
                        return value;
                    }
                });
            },
            submit:function () {
                var _this=this;
                _this.addTeachClassStudent();
            },
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
                        $state.go("teachClassDetail",{id:_this.params.teachingClassId});

                    })
                    .catch(function (error) {
                        //messageService.openMsg("班级添加失败")
                    })
            },
            addAll:function () {
                var _this=this;
                _this.selectedStudents=_.union(_this.selectedStudents,this.studentList)
            },
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