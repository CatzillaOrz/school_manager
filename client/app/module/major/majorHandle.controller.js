'use strict';

angular.module('dleduWebApp')
    .controller('MajorHandleCtrl', function ($scope, $state,CollegeService,MajorService,AuthService,messageService,$timeout,Select2LoadOptionsService) {
        /**
         * 此控制层是创建和编辑共用
         * @type {{title: string, prompt: string, handle: string, collegeDropList: Array, collegeId: number, dropKeyWord: string, params: {id: number, orgId, name: string, userId, collegeId: string}, page: {totalElements: number, totalPages: number, pageNumber: number, pageSize: number}, complete: boolean, select2Options: {ajax: (*), templateResult: templateResult}, addMajor: addMajor, getMajorById: getMajorById, updateMajor: updateMajor, submit: submit, getCollegeDropList: getCollegeDropList, getCollegeById: getCollegeById, init: init}}
         */
        $scope.handleFn={
            //提示title
            title:"",
            //提示信息
            prompt:"",
            //操作类型
            handle:"",
            //学院下拉列表
            collegeDropList:[],
            //选择的学院id
            collegeId:0,
            //下拉列表的查询关键字
            dropKeyWord:"",
            //表单提交参数
            params:{
                id:0,
                orgId: AuthService.getUser().orgId,
                name:"",
                userId:AuthService.getUser().id,
                collegeId:""
            },
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },
           //操作完成标识
            complete:false,
            //select2动态关键字查询列表配置
            selectCollege2Options:function () {
                var _this=this;
                return{
                    placeholder: {
                        id: '-1', // the value of the option
                        text: '按班级筛选'
                    },
                   // allowClear: true,
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
            //添加专业
            addMajor:function () {
                var that=this;
                var params=that.params;
                params.collegeId=that.collegeId;
                MajorService.addMajor(that.params).$promise
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
            //根据专业id查询专业
            getMajorById:function () {
                var that= this;
                var params={
                    id: that.params.id
                }
                MajorService.getMajorById(params).$promise
                    .then(function (data) {
                        that.params.name=data.name;
                        that.collegeId=data.collegeId;
                        that.getCollegeById(that.collegeId);
                    })
                    .catch(function (error) {
                        //messageService.openMsg("专业添加失败")
                    })
            },

            updateMajor:function () {
                var that=this;
                var params=that.params;
                params.collegeId=that.collegeId;
                MajorService.updateMajor(this.params).$promise
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
            submit:function () {
                var that=this;
                if(!that.collegeId){
                    messageService.openMsg("必须选择学院");
                    return;
                }
                if(that.handle=="编辑专业信息"){
                    that.updateMajor();
                }else {
                    that.addMajor();
                }
            },
            getCollegeDropList:function () {
                var that=this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    name:that.dropKeyWord,
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
            init:function () {
                var that=this;
                that.params.id=$state.params.id;
                that.handle=$state.current.ncyBreadcrumbLabel;
                that.getCollegeDropList();
                if(that.handle=="编辑专业信息"){
                    that.params.id=$state.params.id;
                    that.getMajorById();
                }
                that.title=that.handle;
                that.prompt=$state.current.data.prompt;
                that.completeMSG=$state.current.data.completeMSG;

            }
        };

        $timeout(function () {
            $scope.handleFn.init();
        })
    });