'use strict';

angular.module('dleduWebApp')
    .controller('TeachClassDetailCtrl', function ($scope, $state, CourseService, AuthService, messageService, $timeout, Select2LoadOptionsService, TeacherService, TeachClassService) {
        /**
         * 教学班详情以及简单的操作
         * @type {{params: {id: string}, teachClass: {}, teachClassTeacherList: Array, teachClassStudentList: Array, teachClassClassesList: Array, currentTeacher: {}, currentStudent: {}, currentClasses: {}, selectAll: boolean, all: all, getTeachClassById: getTeachClassById, getTeachClassClassesList: getTeachClassClassesList, getTeachClassTeacherList: getTeachClassTeacherList, getTeachClassStudentList: getTeachClassStudentList, deleteTeachClassTeacher: deleteTeachClassTeacher, deleteTeacherPrompt: deleteTeacherPrompt, deleteTeachClassStudent: deleteTeachClassStudent, deleteTeachClassAllStudent: deleteTeachClassAllStudent, deleteStudentPrompt: deleteStudentPrompt, deleteTeachClassClasses: deleteTeachClassClasses, deleteClassesPrompt: deleteClassesPrompt, init: init}}
         */
        $scope.teachClassDetailFn = {
            //参数
            params: {
                id: ""
            },
            //教学班对象
            teachClass: {},
            //代课老师列表
            teachClassTeacherList: [],
            //学生列表
            teachClassStudentList: [],
            //行政班列表
            teachClassClassesList: [],
            //当前操作的教师对象
            currentTeacher:{},
            //当前操作的学生对象
            currentStudent:{},
            //当前操作的行政班级对象
            currentClasses:{},
            //学生全选标识
            selectAll:false,
            //选择所有
            //分页
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            all:function (m) {
                var _this=this;
                angular.forEach(_this.teachClassStudentList,function (data) {
                    if(m===true){
                        data.state=true;
                    }else {
                        data.state=false;
                    }
                })
            },
            //查询教学班
            getTeachClassById: function () {
                var _this = this;
                TeachClassService.getTeachClassById(_this.params).$promise
                    .then(function (data) {
                        _this.teachClass = data;

                    })
                    .catch(function (error) {

                    })
            },
            //获取行政班列表
            getTeachClassClassesList: function () {
                var _this = this;
                var params = {
                    teachingClassId: _this.params.id
                };
                TeachClassService.getTeachClassClassesList(params).$promise
                    .then(function (data) {
                        _this.teachClassClassesList = data.data;

                    })
                    .catch(function (error) {

                    })
            },
            //代课老师列表
            getTeachClassTeacherList: function () {
                var _this = this;
                var params = {
                        teachingClassId: _this.params.id
                    };
                TeachClassService.getTeachClassTeacherList(params).$promise
                    .then(function (data) {
                        _this.teachClassTeacherList = data.data;

                    })
                    .catch(function (error) {

                    })
            },
            //获取学生列表
            getTeachClassStudentList: function () {
                var _this = this;
                var params = {
                    teachingClassId: _this.params.id,
                    pageNumber: _this.page.pageNumber,
                    pageSize: _this.page.pageSize
                };
                TeachClassService.getTeachClassStudentList(params).$promise
                    .then(function (data) {
                        _this.teachClassStudentList = data.data;
                        //_this.page.totalElements=data.page.totalElements;
                        //_this.page.totalPages=data.page.totalPages;

                    })
                    .catch(function (error) {

                    })
            },
            //删除代课老师
            deleteTeachClassTeacher: function () {
                var _this = $scope.teachClassDetailFn;
                var params = {
                    teachingClassId: _this.params.id,
                    teacherId:_this.currentTeacher.id
                };
                TeachClassService.deleteTeachClassTeacher(params).$promise
                    .then(function (data) {
                        messageService.openMsg("解除老师成功");
                        _this.getTeachClassTeacherList();

                    })
                    .catch(function (error) {
                        messageService.openMsg("解除老师失败");
                    })
            },
            //删除提示
            deleteTeacherPrompt: function (entity) {
                var _this=this;
                _this.currentTeacher = entity;
                messageService.getMsg("您确定要删除此教学班老师吗？", _this.deleteTeachClassTeacher)
            },

            //删除学生
            deleteTeachClassStudent: function () {
                var _this = $scope.teachClassDetailFn;
                var params = {
                    teachingClassId: _this.params.id,
                    studentId:""
                };
                params.studentId=_this.currentStudent.id;
                TeachClassService.deleteTeachClassOneStudent(params).$promise
                    .then(function (data) {
                        messageService.openMsg("删除学生成功");
                        _this.getTeachClassStudentList();

                    })
                    .catch(function (error) {
                        messageService.openMsg("删除学生失败");
                    })
            },
            //删除所有学生
            deleteTeachClassAllStudent: function () {
                var _this = $scope.teachClassDetailFn;
                var params = {
                    teachingClassId: _this.params.id,
                    ids:[]
                };
                var objList= _.filter(_this.teachClassStudentList, function(value) {
                    if(value.state){
                        return value.id;
                    }
                });
                angular.forEach(objList,function (data) {
                    params.ids.push(data.id)
                })
                TeachClassService.deleteTeachClassAllStudent(params).$promise
                    .then(function (data) {
                        messageService.openMsg("删除学生成功");
                        _this.getTeachClassStudentList();

                    })
                    .catch(function (error) {
                        messageService.openMsg("删除学生失败");
                    })
            },
            //删除提示
            deleteStudentPrompt: function (entity) {
                var _this=this;
                if(entity){
                    _this.currentStudent = entity;
                    messageService.getMsg("您确定要删除此学生吗？", _this.deleteTeachClassStudent)
                }else {
                    var objList= _.filter(_this.teachClassStudentList, function(value) {
                        if(value.state){
                            return value.id;
                        }
                    });
                    if(objList.length!=0){
                        messageService.getMsg("您确定要删除选中的所有学生吗？", _this.deleteTeachClassAllStudent);
                    }else {
                        messageService.openMsg("请选择需要删除的学生");
                    }

                }

            },
            //删除行政班
            deleteTeachClassClasses: function () {
                var _this = $scope.teachClassDetailFn;
                var params = {
                    teachingClassId: _this.params.id,
                    classesId:""
                };
                params.classesId=_this.currentClasses.id;
                TeachClassService.deleteTeachClassClasses(params).$promise
                    .then(function (data) {
                        messageService.openMsg("删除行政班成功");
                        _this.getTeachClassClassesList();

                    })
                    .catch(function (error) {
                        messageService.openMsg("删除行政班失败");
                    })
            },
            deleteClassesPrompt: function (entity) {
                var _this=this;
                    _this.currentClasses = entity;
                    messageService.getMsg("您确定要删除此行政班吗？", _this.deleteTeachClassClasses)

            },



            //初始化
            init: function () {
                var that = this;
                that.params.id = $state.params.id;
                that.handle = $state.current.ncyBreadcrumbLabel;
                that.title = that.handle;
                that.prompt = $state.current.data.prompt;
                that.completeMSG = $state.current.data.completeMSG;
                that.getTeachClassById();
                that.getTeachClassTeacherList();
                that.getTeachClassStudentList();
                that.getTeachClassClassesList();
            }
        };
        $scope.teachClassDetailFn.init();
    });