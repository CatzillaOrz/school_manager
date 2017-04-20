'use strict';

angular.module('dleduWebApp')
    .controller('ImportStudentCtrl', function ($scope,$state, ClassService,StudentService,AuthService,messageService,Select2LoadOptionsService,$timeout) {
        $scope.importStudentFn={
            classes:{},
            studentList:[],
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
                    ajax: Select2LoadOptionsService.getLoadOptions("api/class/getClassDropListOrg",{
                        orgId: AuthService.getUser().orgId,
                        pageNumber: 1,
                        pageSize: 100
                    },"name"),

                    templateResult: function (data) {

                        if (data.id === '') { // adjust for custom placeholder values
                            _this.classesDropList=[];
                            return 'Custom styled placeholder text';
                        }
                        _this.classesDropList.push(data);
                        return data.name;
                    },
                    allowClear:true
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
                if(_this.params.classesId){
                    params.classesId=_this.params.classesId;
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
                _this.updateStudentToClasses();
            },
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

            init:function () {
                var _this=this;
                _this.params.classesId = $state.params.id;
                _this.getClassById();
            }
        };

        $timeout(function () {
            $scope.importStudentFn.init();
            $scope.$watch('importStudentFn.params.classesId', function(newValue, oldValue) {
                if (newValue!=oldValue){
                    $scope.importStudentFn.findStudentByKey();
                }
            });
        })

    });
