'use strict';

angular.module('dleduWebApp')
    .controller('ClassDetailCtrl', function ($scope,$state, ClassService,AuthService,messageService,StudentService) {
        $scope.classDetailFn={
            isTransfer:false,
            classes:{},
            params:{
                id:0,
                orgId: AuthService.getUser().orgId,
                pageNumber: 1,
                pageSize: 100
            },
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            selectAll:false,
            currentTeacher:{},
            classTeacherList:[],
            classStudentList:[],
            transferStudentList:[],
            collegeDropList:[],
            majorDropList:[],
            classDropList:[],
            collegeId:0,
            majorId:0,
            classesId:0,
            select2CollegeOptions:function () {
                var _this=this;
                return {
                    ajax: {
                        url: "api/college/getCollegeDropList",
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
                    templateResult: function (data) {
                        if (data.id === '') { // adjust for custom placeholder values
                            return 'Custom styled placeholder text';
                        }
                        _this.collegeDropList.push(data);
                        return data.name;
                    }
                }
            },
            select2MajorOptions:function(){
                var _this=this;
                return {
                    ajax: {
                        url: "api/major/getMajorDropList",
                        dataType: 'json',
                        //delay: 250,
                        data: function (query) {
                            var params={
                                orgId: AuthService.getUser().orgId,
                                pageNumber: 1,
                                pageSize: 100,
                                collegeId:_this.collegeId,

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

                    templateResult: function (data) {
                        if (data.id === '') { // adjust for custom placeholder values
                            return 'Custom styled placeholder text';
                        }
                        _this.majorDropList.push(data);
                        return data.name;
                    }}
            },
            select2ClassOptions:function(){
                var _this=this;
                return {
                    ajax: {
                        url: "api/class/geClassDropList",
                        dataType: 'json',
                        //delay: 250,
                        data: function (query) {
                            var params={
                                orgId: AuthService.getUser().orgId,
                                pageNumber: 1,
                                pageSize: 100,
                                professionalId:_this.majorId,

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
                    templateResult: function (data) {
                        if (data.id === '') { // adjust for custom placeholder values
                            return 'Custom styled placeholder text';
                        }
                        _this.classDropList.push(data);
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
            getClassTeacherList:function () {
                var _this=this;
                var params={
                    classesId: _this.params.id
                };
                ClassService.getClassTeacherList(params).$promise
                    .then(function (data) {
                        _this.classTeacherList=data.data;

                    })
                    .catch(function (error) {
                        //messageService.openMsg("班级添加失败")
                    })
            },
            //删除
            deleteClassTeacher: function () {
                var _this = $scope.classDetailFn;
                var ids=[];
                ids.push( _this.currentTeacher.id);
                var params = {
                    ids:ids,
                    classesId: _this.params.id,
                }
                ClassService.deleteClassTeacher(params).$promise
                    .then(function (data) {
                        messageService.openMsg("解除班主任成功！");
                        _this.getClassTeacherList();
                    })
                    .catch(function (error) {
                        messageService.openMsg("解除班主任失败！");
                    })
            },
            //删除提示
            deletePrompt: function (entity) {
                var that=this;
                that.currentTeacher = entity;
                messageService.getMsg("您确定要删除此班主任吗？", that.deleteClassTeacher)
            },
            findClassStudent:function () {
                var _this=this;
                var params={
                    orgId:_this.params.orgId,
                    classesId:_this.params.id,
                    pageNumber:_this.page.pageNumber,
                    pageSize:_this.page.pageSize
                };
                params.name=_this.keyWord;
                StudentService.getSimpleStudents(params).$promise
                    .then(function (data) {
                        _this.classStudentList=_this.dataHandler(data.data);
                        _this.page=data.page;
                       // _this.page.pageNumber++;
                    })
                    .catch(function (error) {
                        //messageService.openMsg("班级添加失败")
                    })
            },
            dataHandler:function (list) {
                var result=[];
                angular.forEach(list,function (data) {
                    data.state=false;
                    result.push(data);
                });
                return result;
            },
            all:function (m) {
                var _this=this;
                angular.forEach(_this.classStudentList,function (data) {
                    if(m===true){
                        data.state=true;
                    }else {
                        data.state=false;
                    }
                })
            },
            transferOut:function (entity) {
                if(entity){
                    entity.state=true;
                }
                var _this=this;
                _this.transferStudentList= _.filter(_this.classStudentList, function(value) {
                    if(value.state){
                        return value;
                    }
                });
                _this.isTransfer=true;
            },
            updateStudentToClasses:function () {
                var _this=this;
                var params={
                    classesId:_this.classesId,
                    ids:[]
                };
                var ids=[];
                angular.forEach(_this.transferStudentList,function (value) {
                    ids.push(value.id);
                });
                params.ids=ids;
                if(params.ids.length==0){
                    messageService.openMsg("您还没有选择学生！");
                    return;
                }else if(_this.classesId==0){
                    messageService.openMsg("您还没有选择班级！");
                    return;
                }
                StudentService.updateStudentToClasses(params).$promise
                    .then(function (data) {
                        _this.findClassStudent();
                       _this.isTransfer=false;
                       _this.selectAll=false;
                       _this.all(_this.selectAll);
                    })
                    .catch(function (error) {
                        messageService.openMsg("转出班级失败")
                    })
            },
        init:function () {
                var _this=this;
                _this.params.id = $state.params.id;
                _this.getClassById();
                _this.getClassTeacherList();
                _this.findClassStudent();
            }
        };
        $scope.classDetailFn.init();

    });
