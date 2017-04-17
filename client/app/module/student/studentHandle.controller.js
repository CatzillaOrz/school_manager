'use strict';

angular.module('dleduWebApp')
    .controller('StudentHandleCtrl', function ($scope, $state,AuthService,StudentService,CollegeService,MajorService,messageService,ClassService,$timeout,Select2LoadOptionsService) {
        $scope.handleFn={
            title:"",
            prompt:"",
            handle:"create",
            isInit:false,
            collegeDropList:[],
            majorDropList:[],
            classDropList:[],
            collegeId:0,
            majorId:0,
            classesId:0,
            params:{
                id:0,
                orgId: AuthService.getUser().orgId,
                name:"",
                userId:AuthService.getUser().id,
                phone: "",
                email: "",
                sex:"",
                jobNumber:"",
                collegeId:""
            },
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            complete:false,
            /**
             *
             */
            select2CollegeOptions:{
                ajax: Select2LoadOptionsService.getLoadOptions("api/college/getCollegeDropList",{
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 1,
                    pageSize: 100
                },"name"),

                templateResult: function (data) {
                    if (data.id === '') { // adjust for custom placeholder values
                        return 'Custom styled placeholder text';
                    }

                    return data.name;
                }
            },
            select2MajorOptions:function(){
               var that=this;
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
                                collegeId:that.collegeId,

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

                    return data.name;
                }}
            },
            select2ClassOptions:function(){
                var that=this;
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
                                professionalId:that.majorId,

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

                        return data.name;
                    }
                }
            },
            addStudent:function () {
                var that=this;
                var params=that.params;
                params.collegeId=that.collegeId;
                params.professionalId=that.majorId;
                params.classesId=that.classesId;
                StudentService.addStudent(that.params).$promise
                    .then(function (data) {
                        that.complete = true;
                    })
                    .catch(function (error) {
                        messageService.openMsg(error.data);
                    })
            },
            getStudentById:function () {
                var that= this;
                var params={
                    id: that.params.id
                }
                StudentService.getStudentById(params).$promise
                    .then(function (data) {
                        that.params=data;
                        that.collegeId=data.collegeId;
                        that.majorId=data.professionalId;
                        that.classesId=data.classesId;
                        that.getCollegeById(that.collegeId);


                    })
                    .catch(function (error) {
                        //messageService.openMsg("学生添加失败")
                    })
            },
            updateStudent:function () {
                var that=this;
                var params=that.params;
                params.collegeId=that.collegeId;
                params.professionalId=that.majorId;
                params.classesId=that.classesId;
                StudentService.updateStudent(this.params).$promise
                    .then(function (data) {
                        that.complete = true;
                    })
                    .catch(function (error) {
                        messageService.openMsg(error.data);
                    })
            },
            submit:function () {
                var that=this;
                if (that.handle == "编辑学生信息") {
                    that.updateStudent();
                }else {
                    that.addStudent();
                }
            },
            getCollegeDropList:function () {
                var that=this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: 100
                }
                CollegeService.getCollegeDropList(params).$promise
                    .then(function (data) {
                        that.collegeDropList=data.data;
                    })
                    .catch(function (error) {
                    })
            },
            getCollegeById:function (collegeId) {
                var that= this;
                var params={
                    id: collegeId
                };
                CollegeService.getCollegeById(params).$promise
                    .then(function (data) {
                        var temp={
                            id:data.id,
                            name:data.name
                        }
                        that.collegeDropList.push(temp);
                        that.collegeId=data.id;

                    })
                    .catch(function (error) {
                        //messageService.openMsg("学院添加失败")
                    })
            },
            getMajorDropList:function () {
                var that=this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: 100
                }
                params.collegeId=that.collegeId;
                MajorService.getMajorDropList(params).$promise
                    .then(function (data) {
                        that.majorDropList=data.data;
                        if(!that.isInit&& $state.current.name=="studentEdit"){
                            that.getMajorById(that.majorId);
                        }

                    })
                    .catch(function (error) {
                    })
            },
            getMajorById:function (majorId) {
                var that= this;
                var params={
                    id: majorId
                }
                MajorService.getMajorById(params).$promise
                    .then(function (data) {
                        var temp={
                            id:data.id,
                            name:data.name
                        }
                        that.majorDropList.push(temp);
                        that.majorId=data.id;
                    })
                    .catch(function (error) {
                        //messageService.openMsg("专业添加失败")
                    })
            },
            getClassDropList:function () {
                var that=this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: 100
                }
                params.professionalId=that.majorId;
                ClassService.getClassDropList(params).$promise
                    .then(function (data) {
                        that.classDropList=data.data;
                        if(!that.isInit&&$state.current.name=="studentEdit"){
                            that.getClassById(that.classesId);
                            that.isInit=true;
                        }

                    })
                    .catch(function (error) {
                    })
            },
            getClassById: function (classesId) {
                var that = this;
                var params = {
                    id: classesId
                }
                ClassService.getClassById(params).$promise
                    .then(function (data) {
                        var temp={
                            id:data.id,
                            name:data.name
                        }
                        that.classDropList.push(temp);
                        that.classesId=data.id;
                    })
                    .catch(function (error) {
                        //messageService.openMsg("班级添加失败")
                    })
            },
            init:function () {
             var that = this;
             that.params.id = $state.params.id;
             that.handle = $state.current.ncyBreadcrumbLabel;
             that.getCollegeDropList();
             if (that.handle == "编辑学生信息") {
                    that.params.id = $state.params.id;
                 that.getStudentById();
                }
             that.title = that.handle;
             that.prompt = $state.current.data.prompt;
             that.completeMSG = $state.current.data.completeMSG;

             }

        };
        $timeout(function () {
            $scope.handleFn.init();
            $scope.$watch('handleFn.collegeId', function(newValue, oldValue) {
                if (newValue!=oldValue){
                    $scope.handleFn.getMajorDropList();
                }
            });
            $scope.$watch('handleFn.majorId', function(newValue, oldValue) {
                if (newValue!=oldValue){
                    $scope.handleFn.getClassDropList();
                }
            });
        })

    });