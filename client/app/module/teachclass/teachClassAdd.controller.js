'use strict';

angular.module('dleduWebApp')
    .controller('TeachClassAddCtrl', function ($scope, $state, CourseService, AuthService, messageService, $timeout, Select2LoadOptionsService,StudentService,TeacherService,TeachClassService) {
        $scope.handleFn = {
            title: "新建教学班",
            prompt: "填写以下信息以建立新的教学班",
            handle: "create",
            steps: [
                {title: '选择课程'},
                {title: '选择教师'},
                {title: '选择学生'},
                {title: '创建教学班'}
            ],
            step: 1,
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
                userId: AuthService.getUser().id,
                id: 0,
                name: ""
            },
            step3Tooggle:"select",// select class students
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            schoolYearDropList: [],
            courseDropList:[],
            collegeDropList:[],
            classDropList:[],
            searchParams:{
                orgId: AuthService.getUser().orgId,
                name:"",
                collegeId:""
            },
            searchStudentParams:{
                orgId: AuthService.getUser().orgId,
                name:"",
                classesId:""
            },
            teacherList:[],
            selectTeacherList:[],
            studentList:[],
            selectStudentList:[],
            selectClassesList:[],
            semesterName:"",
            courseName:'',
            selectClassesId:"",
            select2SemesterOptions: function () {
                var _this = this;
                return {
                    placeholder: {
                        id: '-1', // the value of the option
                        text: '按学期筛选'
                    },
                    ajax: {
                        url: "api/schoolyear/getSchoolYearDropList",
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
                            _this.schoolYearDropList=_this.select2GroupFormat(data.data)
                            return {
                                results: _this.schoolYearDropList,
                                pagination: {
                                    more: (params.page * 30) < data.total_count
                                }
                            };
                        },
                        cache: false
                    },

                }
            },
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
                            pageSize: 100,

                        }
                        params.name=query.term;
                        return params;
                    },
                    processResults: function (data, params) {
                        params.page = params.page || 1;
                        that.courseDropList=data.data;
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
                        pageSize: 100
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
                    templateResult: function (data) {
                        if (data.id === '') { // adjust for custom placeholder values
                            return 'Custom styled placeholder text';
                            hat.classDropList=[];
                        }
                        that.classDropList.push(data);
                        return data.name;
                    }
                }
            },

            complete: false,
            select2GroupFormat: function (dataList) {
                var result = []
                angular.forEach(dataList, function (data) {
                    var obj = {
                        text: data.name,
                        children: []
                    };
                    angular.forEach(data.semesterIdNameList, function (sememster) {
                        var objChild = {
                            id: sememster.id,
                            text: sememster.name
                        };
                        obj.children.push(objChild);
                    })
                    result.push(obj);
                })
                return result;
            },
            getSimpleTeachers:function () {
                var _this=this;
                var params=_this.searchParams;
                TeacherService.getSimpleTeachers(params).$promise
                    .then(function (data) {
                        _this.teacherList = data.data;

                    })
                    .catch(function (error) {

                    })
            },
            getSimpleStudents:function () {
                var _this=this;
                var params=_this.searchStudentParams;
                StudentService.getSimpleStudents(params).$promise
                    .then(function (data) {
                        _this.studentList = data.data;

                    })
                    .catch(function (error) {

                    })
            },
            nextStep: function () {
                this.step = this.step + 1;
            },
            preStep: function () {
                var _this=this;
                if(_this.step3Tooggle!="select"){
                    _this.step3Tooggle="select";

                    return;
                }
                this.step = this.step - 1;
            },
            /**
             * teacherList:[],
             selectTeacherList:[],
             * @param entity
             */
            selectTeacher:function (entity) {
                var _this=this;
                var temp= _.filter(_this.selectTeacherList, function(value) {
                    if(entity.id==value.id){
                        return value;
                    }
                });
                if(temp.length==0){
                    _this.selectTeacherList.splice(0,0,entity);
                }
            },
            removeSelectedTeacher:function (entity) {
                var _this=this;
                _this.selectTeacherList= _.filter(_this.selectTeacherList, function(value) {
                    if(entity.id!=value.id){
                        return value;
                    }
                });
            },

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
            removeSelectedStudent:function (entity) {
                var _this=this;
                _this.selectStudentList= _.filter(_this.selectStudentList, function(value) {
                    if(entity.id!=value.id){
                        return value;
                    }
                });
            },
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
            addOneClasses:function () {
                this.params.classesIds.push(this.params.classesIds.length+".default");


            },
            getSelectTeacherIdList:function () {
                var result=[];
                angular.forEach(this.selectTeacherList,function (data) {
                    result.push(data.id)
                })
                return result;

            },
            getSelectStudentIdList:function () {
                var result=[];
                angular.forEach(this.selectStudentList,function (data) {
                    result.push(data.id)
                })
                return result;

            },
            addTeachClass:function () {
                var _this=this;
                var params=_this.params;
                if(params.classesIds.length!=0){
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

            $scope.$watch('handleFn.searchParams.collegeId', function(newValue, oldValue) {
                if (newValue!=oldValue){
                    $scope.handleFn.getSimpleTeachers();
                }
            });
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


            $scope.$watch('handleFn.params.semesterId', function(newValue, oldValue) {
               angular.forEach($scope.handleFn.schoolYearDropList,function (schoolYear) {
                   angular.forEach(schoolYear.children,function (data) {
                      if(data.id==newValue){
                          $scope.handleFn.semesterName=data.text;
                      }
                   })
               })
            });
            $scope.$watch('handleFn.params.courseId', function(newValue, oldValue) {
                angular.forEach($scope.handleFn.courseDropList,function (course) {
                        if(course.id==newValue){
                            $scope.handleFn.courseName=course.name;
                        }

                })
            });

            $scope.$watch('handleFn.searchStudentParams.classesId', function(newValue, oldValue) {
                if (newValue!=oldValue){
                    $scope.handleFn.getSimpleStudents();
                }
            });
            //
        })
    });