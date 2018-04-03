'use strict';

angular.module('dleduWebApp')
    .controller('TeachClassAddCtrl', function ($scope, $state, CourseService, AuthService, messageService, $timeout, Select2LoadOptionsService,StudentService,TeacherService,TeachClassService) {
        /**
         * 创建教学班
         * @type {{title: string, prompt: string, handle: string, steps: [*], step: number, params: {classOrStudents: number, classesIds: Array, courseId: string, courseName: string, semesterEnd: string, semesterId: string, semesterName: string, semesterStart: string, studentIds: Array, studentsCount: number, teacherIds: Array, teacherNames: string, userId, id: number, name: string}, step3Tooggle: string, page: {totalElements: number, totalPages: number, pageNumber: number, pageSize: number}, schoolYearDropList: Array, courseDropList: Array, collegeDropList: Array, classDropList: Array, searchParams: {orgId, name: string, collegeId: string}, searchStudentParams: {orgId, name: string, classesId: string}, teacherList: Array, selectTeacherList: Array, studentList: Array, selectStudentList: Array, selectClassesList: Array, semesterName: string, courseName: string, selectClassesId: string, select2SemesterOptions: select2SemesterOptions, select2CourseOptions: select2CourseOptions, selectCollege2Options: selectCollege2Options, select2ClassOptions: select2ClassOptions, complete: boolean, select2GroupFormat: select2GroupFormat, getSimpleTeachers: getSimpleTeachers, getSimpleStudents: getSimpleStudents, nextStep: nextStep, preStep: preStep, selectTeacher: selectTeacher, removeSelectedTeacher: removeSelectedTeacher, selectStudent: selectStudent, removeSelectedStudent: removeSelectedStudent, step3Select: step3Select, addOneClasses: addOneClasses, getSelectTeacherIdList: getSelectTeacherIdList, getSelectStudentIdList: getSelectStudentIdList, addTeachClass: addTeachClass, validateStep3: validateStep3, submit: submit, init: init}}
         */
        $scope.handleFn = {
            //提示title
            title: "新建教学班",
            //提示
            prompt: "填写以下信息以建立新的教学班",
            //操作标识
            handle: "create",
            //添加步骤
            steps: [
                {title: '选择课程'},
                {title: '选择教师'},
                {title: '选择学生'},
                {title: '创建教学班'}
            ],
            //当前步骤
            step: 1,
            //参数
            params: {
                classOrStudents: 0,
                classesIds: [],
                courseId: "",
                courseName: "",
                semesterEnd: "",
                semesterId: "",
                semesterName: "",
                semesterStart: "",
                studentIds: [],
                studentsCount: 0,
                teacherIds: [],
                teacherNames: "",
                code:"",
                userId: AuthService.getUser().id,
                id: 0,
                name: ""
            },
            //第3步分为两种可能 此处为标识
            step3Tooggle:"select",// select class students
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            //学年下拉数据列表
            schoolYearDropList: [],
            //课程下拉列表数据
            courseDropList:[],
            //学院下拉列表数据
            collegeDropList:[],
            //班级下拉列表数据
            classDropList:[],
            //学院下拉搜索参数 查老师
            searchParams:{
                orgId: AuthService.getUser().orgId,
                name:"",
                collegeId:""
            },
            //班级下拉搜素参数 查学生
            searchStudentParams:{
                orgId: AuthService.getUser().orgId,
                name:"",
                classesId:""
            },
            //教师列表
            teacherList:[],
            //选择老师数据
            selectTeacherList:[],
            //学生列表
            studentList:[],
            //选择的学生
            selectStudentList:[],
            //选择的班级列表
            selectClassesList:[],
            //学期名称
            semesterName:"",
            //课程名称
            courseName:'',
            //选择的班级id
            selectClassesId:"",
            //学期分组下拉搜索
            select2SemesterOptions: function () {
                var _this = this;
                return {
                    placeholder: {
                        id: '-1', // the value of the option
                        text: '按学期筛选'
                    },
                    ajax: {
                        url: "api/schoolyear/getSemesterList",
                        dataType: 'json',
                        //delay: 250,
                        data: function (query) {
                            var params = {
                                orgId: AuthService.getUser().orgId,
                                pageNumber: 1,
                                pageSize: 100,
                            }
                            params.name = query.term;
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
                        cache: false
                    },
                    templateResult: function (data) {
                        if (data.id === '') { // adjust for custom placeholder values
                            return 'Custom styled placeholder text';
                        }
                        _this.schoolYearDropList.push(data);
                        return data.name;
                    }
                }
            },
            //课程下拉搜索
            select2CourseOptions:function(){
            var that=this;
            return {
                ajax: {
                    url: "api/course/getCourseDropListOrg",
                    dataType: 'json',
                    //delay: 250,
                    data: function (query) {
                        var params={
                            orgId: AuthService.getUser().orgId,
                            pageNumber: 1,
                            pageSize: 30,

                        }
                        params.name=query.term;
                        return params;
                    },
                    processResults: function (data, params) {
                        params.page = params.page || 1;
                        //that.courseDropList=data.data;
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
                    that.courseDropList.push(data);
                    var showName = data.code && data.code!='' ? (data.name + "(" + data.code + ")") : data.name;
                    return showName;
                }}
            },
            //学院下拉搜素
            selectCollege2Options:function () {
                var _this=this;
                return{
                    placeholder: {
                        id: '-1', // the value of the option
                        text: '按班级筛选'
                    },
                    allowClear: true,
                    ajax: Select2LoadOptionsService.getLoadOptions("api/college/getCollegeDropList",{
                        orgId: AuthService.getUser().orgId,
                        pageNumber: 1,
                        pageSize: 100,
                        managerId: AuthService.getUser().id
                    },"name"),

                    templateResult: function (data) {

                        if (data.id === '') { // adjust for custom placeholder values
                            _this.collegeDropList=[];
                            return '按班级筛选';
                        }
                        _this.collegeDropList.push(data);
                        return data.name;
                    }

                }
            },
            //班级下拉列表配置
            select2ClassOptions:function(){
                var that=this;
                return {
                    ajax: {
                        url: "api/class/getClassDropListOrg",
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
                    allowClear: true,
                    placeholder: {
                        id: '-1', // the value of the option
                        text: '按班级筛选'
                    },
                    templateResult: function (data) {
                        if (data.id === '') { // adjust for custom placeholder values
                            return 'Custom styled placeholder text';
                            that.classDropList=[];
                        }
                        that.classDropList.push(data);
                        return data.name;
                    }
                }
            },

            complete: false,
            //学期下拉列表分组数据格式化
            select2GroupFormat: function (dataList) {
                var result = []
                angular.forEach(dataList, function (sememster) {
                    var objChild = {
                        id: sememster.id,
                        text: sememster.name
                    };
                    result.push(objChild);
                })
                return result;
            },
            //获取老师
            getSimpleTeachers:function () {
                var _this=this;
                var params=_this.searchParams;
                params.pageSize=_this.page.pageSize;
                params.pageNumber=_this.page.pageNumber;
                params.userId = AuthService.getUser().id;
                TeacherService.getSimpleTeachers(params).$promise
                    .then(function (data) {
                        _this.teacherList = data.data;
                        _this.page=data.page;

                    })
                    .catch(function (error) {

                    })
            },
            //获取学生
            getSimpleStudents:function () {
                var _this=this;
                var params=_this.searchStudentParams;
                params.pageSize=_this.page.pageSize;
                params.pageNumber=_this.page.pageNumber;
                params.userId = AuthService.getUser().id;
                StudentService.getSimpleStudents(params).$promise
                    .then(function (data) {
                        _this.studentList = data.data;
                        _this.page=data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //下一步
            nextStep: function () {
                this.step = this.step + 1;
            },
            //上一步
            preStep: function () {
                var _this=this;
                if(_this.step3Tooggle!="select"){
                    _this.step3Tooggle="select";

                    return;
                }
                this.step = this.step - 1;
            },
            //查询参数重置
            resetParams: function () {
                var _this = this;
                _this.page = {
                    totalElements: 0,
                    totalPages: 0,
                    pageNumber: 1,
                    pageSize: 10
                };
            },
           //选择的老师
            selectTeacher:function (entity) {
                var _this=this;
                var temp= _.filter(_this.selectTeacherList, function(value) {
                    if(entity.id==value.id){
                        return value;
                    }
                });
                if(temp.length==0){
                    _this.selectTeacherList.push(entity);
                }
            },
            //移除老师
            removeSelectedTeacher:function (entity) {
                var _this=this;
                _this.selectTeacherList= _.filter(_this.selectTeacherList, function(value) {
                    if(entity.id!=value.id){
                        return value;
                    }
                });
            },
            //选择学生
            selectStudent:function (entity) {
                var _this=this;
                var temp= _.filter(_this.selectStudentList, function(value) {
                    if(entity.id==value.id){
                        return value;
                    }
                });
                if(temp.length==0){
                    _this.selectStudentList.splice(0,0,entity);
                }
            },
            //移除学生
            removeSelectedStudent:function (entity) {
                var _this=this;
                _this.selectStudentList= _.filter(_this.selectStudentList, function(value) {
                    if(entity.id!=value.id){
                        return value;
                    }
                });
            },
            //第三步 中的两种选择的切换
            step3Select:function (str) {
                var _this=this;
                if(str=="class"){
                    _this.params.classesIds.push("0.default");
                    _this.selectStudentList=[];
                }else if(str=="students"){

                    _this.params.classesIds=[];
                }
                this.step3Tooggle=str;
            },
            //增加一个行政班
            addOneClasses:function () {
                this.params.classesIds.push(this.params.classesIds.length+".default");


            },
            //获取选择的选择的老师id
            getSelectTeacherIdList:function () {
                var result=[];
                angular.forEach(this.selectTeacherList,function (data) {
                    result.push(data.id)
                })
                return result;

            },
            //获取选择的学生id
            getSelectStudentIdList:function () {
                var result=[];
                angular.forEach(this.selectStudentList,function (data) {
                    result.push(data.id)
                })
                return result;

            },
            //保存教学班
            addTeachClass:function () {
                var _this=this;
                var params=_this.params;
                if(params.classesIds.length!=0){
                    //清空无效id
                    var classesIds = [];
                    for(var i = 0, len = params.classesIds.length; i < len; i++){
                        var classId = params.classesIds[i];
                        if(classId.indexOf(".") == -1){
                            classesIds.push(classId);
                        }
                    }
                    params.classesIds = classesIds;
                    params.classOrStudents=10;
                }else {
                    params.classOrStudents=20;
                    params.studentIds=_this.getSelectStudentIdList();
                }
                params.teacherIds=_this.getSelectTeacherIdList();
                TeachClassService.addTeachClass(params).$promise
                    .then(function (data) {
                       $state.go("teachclasslist");

                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg("添加教学班失败！");

                        }else {
                            messageService.openMsg(error.data);

                        }
                    })
            },
            //第三步的表单验证
            validateStep3:function () {
              var _this=this;
                //((handleFn.selectStudentList.length==0||(handleFn.params.classesIds[0]&&handleFn.params.classesIds[0]=='0.default')) )
                if(_this.selectStudentList.length==0){
                    if(_this.params.classesIds[0]&&_this.params.classesIds[0]=='0.default'){
                        return false
                    }else if(!_this.params.classesIds[0]){
                        return false
                    }else if(_this.params.classesIds[0]&&_this.params.classesIds[0]!='0.default'){
                        return true;
                    }
                }else {
                    return true;
                }
            },
            //提交
            submit: function () {
                var that = this;
                that.addTeachClass();
            },
            init: function () {
                var that = this;
                that.handle = $state.current.ncyBreadcrumbLabel;
                that.title = that.handle;
                that.prompt = $state.current.data.prompt;
                that.completeMSG = $state.current.data.completeMSG;
                that.getSimpleTeachers();
                that.getSimpleStudents();

            }
        };

        $timeout(function () {
            $scope.handleFn.init();
            //学院变动自动查询老师
            $scope.$watch('handleFn.searchParams.collegeId', function(newValue, oldValue) {
                if (newValue!=oldValue){
                    $scope.handleFn.getSimpleTeachers();
                }
            });
            //选择行政班数据动态处理 去重 显示数据处理
            $scope.$watch('handleFn.params.classesIds', function(newValue, oldValue) {

                if (newValue!=oldValue){
                    $scope.handleFn.params.classesIds=_.uniq($scope.handleFn.params.classesIds);
                       var tempArr=_.difference(newValue, oldValue);
                        angular.forEach( $scope.handleFn.classDropList,function (data) {
                           angular.forEach(tempArr,function (entity) {
                               if(data.id==entity){
                                   $scope.handleFn.selectClassesList.push(data)
                               }
                           })
                        })
                    }
                $scope.handleFn.selectClassesList= _.uniq($scope.handleFn.selectClassesList,'id');
            },true);

            //学期选择变动显示变动处理
            $scope.$watch('handleFn.params.semesterId', function(newValue, oldValue) {
               angular.forEach($scope.handleFn.schoolYearDropList,function (data) {
                   if(data.id==newValue){
                       $scope.handleFn.semesterName=data.name;
                   }
               })
            });
            //选择课程变动
            $scope.$watch('handleFn.params.courseId', function(newValue, oldValue) {
                angular.forEach($scope.handleFn.courseDropList,function (course) {
                        if(course.id==newValue){
                            $scope.handleFn.courseName=course.name;
                        }

                })
            });
            //班级变动 自动查询学生
            $scope.$watch('handleFn.searchStudentParams.classesId', function(newValue, oldValue) {
                if (newValue!=oldValue){
                    $scope.handleFn.getSimpleStudents();
                }
            });
            //
        })
    });