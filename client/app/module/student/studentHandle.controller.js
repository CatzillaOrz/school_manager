'use strict';

angular.module('dleduWebApp')
    .controller('StudentHandleCtrl', function ($scope, $state,AuthService,StudentService,CollegeService,MajorService,messageService,ClassService,$timeout,Select2LoadOptionsService) {
        /**
         * 此控制层是创建和编辑共用
         * @type {{title: string, prompt: string, handle: string, isInit: boolean, collegeDropList: Array, majorDropList: Array, classDropList: Array, collegeId: number, majorId: number, classesId: number, params: {id: number, orgId, name: string, userId, phone: string, email: string, sex: string, jobNumber: string, collegeId: string}, page: {totalElements: number, totalPages: number, pageNumber: number, pageSize: number}, complete: boolean, select2CollegeOptions: {ajax: (*), templateResult: templateResult}, select2MajorOptions: select2MajorOptions, select2ClassOptions: select2ClassOptions, addStudent: addStudent, getStudentById: getStudentById, updateStudent: updateStudent, submit: submit, getCollegeDropList: getCollegeDropList, getCollegeById: getCollegeById, getMajorDropList: getMajorDropList, getMajorById: getMajorById, getClassDropList: getClassDropList, getClassById: getClassById, init: init}}
         */
        $scope.handleFn={
            //提示title
            title:"",
            //提示信息
            prompt:"",
            //操作标识
            handle:"create",
           //是否初始化标识
            isInit:false,
            //学院下拉列表
            collegeDropList:[],
            //专业下拉列表
            majorDropList:[],
            //班级下拉列表
            classDropList:[],
            //学院id
            collegeId:0,
            //专业id
            majorId:0,
            //班级id
            classesId:0,
            //提交参数
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
            //操作完成标识
            complete:false,
            //学院下拉列表配置
            select2CollegeOptions:{
                ajax: Select2LoadOptionsService.getLoadOptions("api/college/getCollegeDropList",{
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 1,
                    pageSize: 100,
                    managerId: AuthService.getUser().id
                },"name"),

                templateResult: function (data) {
                    if (data.id === '') { // adjust for custom placeholder values
                        return 'Custom styled placeholder text';
                    }

                    return data.name;
                }
            },
            //专业下拉列表配置
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
            //班级下拉列表配置
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
            //添加学生
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
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg(error.data);
                        }else {

                            messageService.openMsg("添加失败");
                        }
                    })
            },
            //通过id查询学生
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
            //学生更新
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
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg(error.data);
                        }else {

                            messageService.openMsg("更新失败");
                        }
                    })
            },
            //表单提交
            submit:function () {
                var that=this;
                if(!that.collegeId){
                    messageService.openMsg("必须选择院系");
                    return;
                }else if(!that.majorId){
                    messageService.openMsg("必须选择专业");
                    return;
                }else if(!that.classesId){
                    messageService.openMsg("必须选择班级");
                    return;
                }
                if (that.handle == "编辑学生信息") {
                    that.updateStudent();
                }else {
                    that.addStudent();
                }
            },
            //学院下拉列表查询
            getCollegeDropList:function () {
                var that=this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: 100,
                    managerId: AuthService.getUser().id
                }
                CollegeService.getCollegeDropList(params).$promise
                    .then(function (data) {
                        that.collegeDropList=data.data;
                    })
                    .catch(function (error) {
                    })
            },
            //通过id查询学院
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
            //专业下拉列表查询
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
            //通过id查询专业
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
            //班级下拉类表查询
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
            //通过id查询班级
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
            //初始化
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
        });

    });