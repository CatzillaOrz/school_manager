'use strict';

angular.module('dleduWebApp')
    .controller('ClassHandleCtrl', function ($scope, $state, ClassService, CollegeService,messageService, MajorService, AuthService,$timeout,Select2LoadOptionsService) {
        /**
         * 此控制层是创建和编辑共用
         * @type {{title: string, prompt: string, handle: string, isInit: boolean, collegeDropList: Array, majorDropList: Array, collegeId: number, majorId: number, params: {id: number, orgId, name: string, userId, collegeId: string}, page: {totalElements: number, totalPages: number, pageNumber: number, pageSize: number}, complete: boolean, select2CollegeOptions: {ajax: (*), templateResult: templateResult}, select2MajorOptions: select2MajorOptions, addClass: addClass, getClassById: getClassById, updateClass: updateClass, submit: submit, getCollegeDropList: getCollegeDropList, getCollegeById: getCollegeById, getMajorDropList: getMajorDropList, getMajorById: getMajorById, init: init}}
         */
        $scope.handleFn = {
            //提示title
            title: "",
            //提示
            prompt: "",
            //操作标识
            handle: "create",
            //专业下拉列表数据初始化标识
            isInit:false,
            //学院下拉列表
            collegeDropList: [],
            //专业下拉列表
            majorDropList: [],
            //学院id
            collegeId: 0,
            //专业id
            majorId: 0,
            //参数
            params: {
                id: 0,
                orgId: AuthService.getUser().orgId,
                name: "",
                userId: AuthService.getUser().id,
                collegeId:""
            },
            //分页
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            //操作完成标识
            complete:false,
            //学院下拉列表
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
            //专业下拉列表
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
             *添加班级
             */
            addClass: function () {
                var that = this;
                var params = that.params;
                params.collegeId = that.collegeId;
                params.professionalId = that.majorId;
                ClassService.addClass(that.params).$promise
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
            //通过id查询班级
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
                        that.getCollegeById(that.collegeId);

                    })
                    .catch(function (error) {
                        //messageService.openMsg("班级添加失败")
                    })
            },
            //更新班级
            updateClass: function () {
                var that = this;
                var params = that.params;
                params.collegeId = that.collegeId;
                params.professionalId = that.majorId;
                ClassService.updateClass(this.params).$promise
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
            //提交
            submit: function () {
                var that = this;
                if(!that.collegeId){
                    messageService.openMsg("必须选择学院");
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
            //学院下拉列表查询
            getCollegeDropList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: 100
                }
                CollegeService.getCollegeDropList(params).$promise
                    .then(function (data) {
                        that.collegeDropList =data.data;
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
            //查询专业列表
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
            //通过专业id查询专业
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
                that.title = $state.current.data.title;
                that.prompt = $state.current.data.prompt;
                that.completeMSG = $state.current.data.completeMSG;
                console.log($state);

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