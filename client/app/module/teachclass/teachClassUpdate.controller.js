'use strict';

angular.module('dleduWebApp')
    .controller('TeachClassUpdateCtrl', function ($scope, $state, CourseService, AuthService, messageService, $timeout, Select2LoadOptionsService, TeacherService, TeachClassService,SchoolYearService,$q) {
        /**
         * 教学班基本信息更新
         * @type {{params: {userId, id: string, semesterId: string, name: string, courseId: string}, schoolYearDropList: Array, courseDropList: Array, select2CourseOptions: select2CourseOptions, select2SemesterOptions: select2SemesterOptions, select2GroupFormat: select2GroupFormat, getTeachClassById: getTeachClassById, getCourseDropListOrg: getCourseDropListOrg, getSchoolYearDropList: getSchoolYearDropList, updateTeachClass: updateTeachClass, init: init}}
         */
        $scope.teachClassUpdateFn = {
            //参数
            params: {
                userId:AuthService.getUser().id,
                id: "",
                semesterId:"",
                name:"",
                courseId:"",
                code:""

            },
            //学期列表
            schoolYearDropList: [],
            //课程列表
            courseDropList:[],
            //课程下拉搜素
            select2CourseOptions:function(){
                var _this=this;
                return {
                    ajax: {
                        url: "api/course/getCourseDropListOrg",
                        dataType: 'json',
                        //delay: 250,
                        data: function (query) {
                            var params={
                                orgId: AuthService.getUser().orgId,
                                pageNumber: 1,
                                pageSize: 10000,

                            }
                            params.name=query.term;
                            return params;
                        },
                        processResults: function (data, params) {
                            params.page = params.page || 1;
                           // _this.courseDropList=data.data;
                            return {
                                results: data.data,
                                pagination: {
                                    more: (params.page * 30) < data.total_count
                                }
                            };
                        },
                    },
                    templateResult: function (data) {
                        if (data.id === '') { // adjust for custom placeholder values
                            return 'Custom styled placeholder text';
                        }

                        return data.name;
                    }}
            },
            //学期下拉搜素
            select2SemesterOptions: function () {
                var _this = this;
                return {
                    // placeholder: {
                    //     id: -1, // the value of the option
                    //     text: '按学期筛选'
                    // },
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
                            _this.schoolYearDropList = _this.select2GroupFormat(data.data);
                            console.log(_this.schoolYearDropList);
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
            //分组格式化
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
            //查询教学班
            getTeachClassById: function () {
                var _this = this;
                TeachClassService.getTeachClassById(_this.params).$promise
                    .then(function (data) {
                        _this.params.name = data.name;

                        _this.params.semesterId = data.semesterId;
                        _this.params.courseId = data.courseId;
                        _this.params.code = data.code;
                       _this.getCourseById(_this.params.courseId);
                       // _this.getSchoolYearDropList();
                       // _this.getSchoolYearById(_this.params.semesterId);
                        _this.params.courseId = data.courseId;
                        var currentSemester=_this.getSelected(_this.params.semesterId,_this.schoolYearDropList);
                      //  _this.schoolYearDropList=[];
                        _this.schoolYearDropList.push(currentSemester);


                        // $('#select').val(_this.params.semesterId);
                        // $('#select').trigger('change');
                    })
                    .catch(function (error) {

                    })
            },
             getSelected:function (id,list) {
                var obj={};
                 angular.forEach(list,function (data) {
                     angular.forEach(data.children,function (entity) {
                         if(id==entity.id){
                             obj=data;
                             obj.children=[];
                             obj.children.push(entity);
                             return obj;
                         }
                     })
                 });
                 return obj;
             },
            getCourseById:function (id) {
                var _this= this;
                var params={
                    id: id
                };
                CourseService.getCourseById(params).$promise
                    .then(function (data) {
                        var temp={
                            id:data.id,
                            name:data.name
                        }
                        _this.courseDropList.push(temp);
                        _this.params.courseId=data.id;

                    })
                    .catch(function (error) {
                        //messageService.openMsg("学院添加失败")
                    })
            },

            //获取课程下拉列表数据
            getCourseDropListOrg:function () {
                var deferred = $q.defer();
                var _this=this;
                var params={
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 1,
                    pageSize: 10000,

                }
                CourseService.getCourseDropListOrg(params).$promise
                    .then(function (data) {
                        _this.courseDropList = data.data;
                       // console.log(_this.courseDropList)
                        deferred.resolve(data);
                    })
                    .catch(function (error) {
                        deferred.reject(error);
                    })
                return deferred.promise;
            },
            //学期下拉列表获取
            getSchoolYearDropList:function () {
                var deferred = $q.defer();
                var _this=this;
                var params={
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 1,
                    pageSize: 100,

                }
                SchoolYearService.getSchoolYearDropList(params).$promise
                    .then(function (data) {
                        _this.schoolYearDropList = _this.select2GroupFormat(data.data);
                        deferred.resolve(data);
                    })
                    .catch(function (error) {
                        deferred.reject(error);
                    })
                return deferred.promise;
            },
            //更新教学班
            updateTeachClass:function () {
                var _this=this;
                var params=_this.params;
                TeachClassService.updateTeachClass(params).$promise
                    .then(function (data) {
                        messageService.openMsg("教学班修改成功");
                        $timeout(function () {
                            $state.go("teachClassDetail",{id:_this.params.id});
                        })

                    })
                    .catch(function (error) {

                    })

            },
            //初始化
            init: function () {
                var _this = this;
                _this.params.id = $state.params.id;
               _this.getSchoolYearDropList().then(function () {
                    _this.getCourseDropListOrg().then(function () {
                        _this.getTeachClassById();
                    })
              })


            }
        };
        $timeout(function () {
            $scope.teachClassUpdateFn.init();
      })
    });