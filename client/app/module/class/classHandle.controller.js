'use strict';

angular.module('dleduWebApp')
    .controller('ClassHandleCtrl', function ($scope, $state, ClassService, CollegeService,messageService, MajorService, AuthService,$timeout,Select2LoadOptionsService) {
        $scope.handleFn = {
            title: "",
            prompt: "",
            handle: "create",
            isInit:false,
            collegeDropList: [],
            majorDropList: [],
            collegeId: 0,
            majorId: 0,
            params: {
                id: 0,
                orgId: AuthService.getUser().orgId,
                name: "",
                userId: AuthService.getUser().id,
                collegeId:"",
                schoolStatus:10,
                teachingYear:"",
                inSchoolDate:"",
                outSchoolDate:"",
                schoolingLength: "请选择" //学制
            },
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            complete:false,

            grades: [],//年级
            eduSys:[{value: 0, name: '请选择'}, {value: 1, name: '2年制'}, {value: 20, name: '3年制'}, {value: 30, name: '4年制'}, {value: 40, name: '5年制'}],

            //初始化年级
            initGrades: function(){
                var year = new Date().getFullYear();
                var grades = [];
                //前面加4年
                for(var i = 0; i < 4; i++ ){
                    grades.splice(0, 0, (year - i - 1) + "");
                }
                //后面加5年
                for(var j = 0; j < 6; j++ ){
                    grades.push(year + j + "");
                }
                return grades;
            },

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
            /**
             *
             *
             */
            addClass: function () {
                var that = this;
                var params = that.params;
                params.collegeId = that.collegeId;
                params.professionalId = that.majorId;
                var paramsClone = angular.copy(that.params);
                if(paramsClone.schoolingLength == "请选择"){
                    paramsClone.schoolingLength = "";
                }
                ClassService.addClass(paramsClone).$promise
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
            getClassById: function () {
                var that = this;
                var params = {
                    id: that.params.id
                }
                ClassService.getClassById(params).$promise
                    .then(function (data) {
                        that.params.name = data.name;
                        that.collegeId=data.collegeId;
                        that.majorId=data.professionalId;
                        that.params.schoolStatus=data.schoolStatus;
                        that.params.teachingYear=data.teachingYear;
                        that.params.inSchoolDate=data.inSchoolDate;
                        that.params.outSchoolDate=data.outSchoolDate;
                        that.getCollegeById(that.collegeId);

                    })
                    .catch(function (error) {
                        //messageService.openMsg("班级添加失败")
                    })
            },
            updateClass: function () {
                var that = this;
                var params = that.params;
                params.collegeId = that.collegeId;
                params.professionalId = that.majorId;
                var paramsClone = angular.copy(that.params);
                if(paramsClone.schoolingLength == "请选择"){
                    paramsClone.schoolingLength = "";
                }
                ClassService.updateClass(paramsClone).$promise
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
            submit: function () {
                var that = this;
                if(!that.collegeId){
                    messageService.openMsg("必须选择院系");
                    return;
                }else if(!that.majorId){
                    messageService.openMsg("必须选择专业");
                    return;
                }
                if (that.handle == "编辑班级信息") {
                    that.updateClass();
                } else {
                    that.addClass();
                }
            },
            getCollegeDropList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: 100,
                    managerId: AuthService.getUser().id
                }
                CollegeService.getCollegeDropList(params).$promise
                    .then(function (data) {
                        that.collegeDropList =data.data;
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
            getMajorDropList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: 100
                }
                params.collegeId = that.collegeId;
                MajorService.getMajorDropList(params).$promise
                    .then(function (data) {
                        that.majorDropList = data.data;
                        if(!that.isInit && $state.current.name=="classEdit"){
                            that.getMajorById(that.majorId);
                            that.isInit=true;
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
                        that.majorDropList.splice(0,0,temp);
                        that.majorId=data.id;
                    })
                    .catch(function (error) {
                        //messageService.openMsg("专业添加失败")
                    })
            },
            init: function () {

                var that = this;
                that.params.id = $state.params.id;
                that.handle = $state.current.ncyBreadcrumbLabel;
                that.getCollegeDropList();
                if (that.handle == "编辑班级信息") {
                    that.params.id = $state.params.id;
                    that.getClassById();
                }
                that.params.teachingYear = new Date().getFullYear() + "";
                that.title = $state.current.data.title;
                that.prompt = $state.current.data.prompt;
                that.completeMSG = $state.current.data.completeMSG;
                console.log($state);
                that.grades = that.initGrades();
            }
        };
        $timeout(function () {
            $scope.handleFn.init();
            $scope.$watch('handleFn.collegeId', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    $scope.handleFn.getMajorDropList();
                }
            });
        })

    });