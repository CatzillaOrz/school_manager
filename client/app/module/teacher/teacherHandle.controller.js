'use strict';

angular.module('dleduWebApp')
    .controller('TeacherHandleCtrl', function ($scope, $state,TeacherService,AuthService,messageService,CollegeService,$timeout,Select2LoadOptionsService,CommonService) {
        /**
         * 此控制层是创建和编辑共用
         * @type {{title: string, prompt: string, handle: string, collegeDropList: Array, majorDropList: Array, collegeId: number, majorId: number, params: {id: number, orgId, name: string, userId, phone: string, email: string, jobNumber: string, sex: string}, page: {totalElements: number, totalPages: number, pageNumber: number, pageSize: number}, complete: boolean, select2Options: {ajax: (*), templateResult: templateResult}, addTeacher: addTeacher, getTeacherById: getTeacherById, updateTeacher: updateTeacher, submit: submit, getCollegeDropList: getCollegeDropList, getCollegeById: getCollegeById, init: init}}
         */
        $scope.handleFn={
            //提示title
            title:"新建教师",
            //提示信息
            prompt:"填写以下信息以建立新的教师",
            //操作标识
            handle:"create",
            //学院下拉列表
            collegeDropList:[],
            //专业下拉列表
            majorDropList:[],
            //学院id
            collegeId:0,
            //专业id
            majorId:0,
            //提交参数
            params:{
                id:0,
                orgId: AuthService.getUser().orgId,
                name:"",
                userId:AuthService.getUser().id,
                phone: "",
                email: "",
                jobNumber:"",
                sex:""
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
            //学院下拉列表配置
            select2Options:{
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
           //添加老师
            addTeacher:function () {
                var that=this;
                var params=that.params;
                params.collegeId=that.collegeId;
                TeacherService.addTeacher(that.params).$promise
                    .then(function (data) {
                        that.complete = true;
                    })
                    .catch(function (error) {

                        messageService.openMsg(CommonService.exceptionPrompt(error,"添加教师失败！"));
                    })
            },
            //根据id查询老师
            getTeacherById:function () {
                var that= this;
                var params={
                    id: that.params.id
                }
                TeacherService.getTeacherById(params).$promise
                    .then(function (data) {
                        that.params=data
                        that.collegeId=data.collegeId;
                        that.getCollegeById(that.collegeId);
                    })
                    .catch(function (error) {
                        //messageService.openMsg("教师添加失败")
                    })
            },
            //更新老师
            updateTeacher:function () {
                var that=this;
                var params=that.params;
                params.collegeId=that.collegeId;
                TeacherService.updateTeacher(this.params).$promise
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
            submit:function () {
                var that=this;
                if (that.handle == "编辑教师信息") {
                    that.updateTeacher();
                }else {
                    that.addTeacher();
                }
            },
            //学院下拉列表查询
            getCollegeDropList:function () {
                var that=this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: 1000
                }
                CollegeService.getCollegeDropList(params).$promise
                    .then(function (data) {
                        that.collegeDropList=data.data;
                    })
                    .catch(function (error) {
                    })
            },
            //通过学院id查询学院
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
            //初始化
            init:function () {

                var that = this;
                that.params.id = $state.params.id;
                that.handle = $state.current.ncyBreadcrumbLabel;
                that.getCollegeDropList();
                if (that.handle == "编辑教师信息") {
                    that.getTeacherById();
                }
                that.title = that.handle;
                that.prompt = $state.current.data.prompt;
                that.completeMSG = $state.current.data.completeMSG;

            }
        };
        $timeout(function () {
            $scope.handleFn.init();
        })
    });