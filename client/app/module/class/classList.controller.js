'use strict';

angular.module('dleduWebApp')
    .controller('ClassListCtrl', function ($scope, $state, $window, ClassService,AuthService,messageService,CommonService,
                                           Upload, ngDialog, ImpBatchService,Select2LoadOptionsService,$timeout) {
        $scope.classListFn={
            //班级列表
            classList: [],
            //当前操作的class
            currentClass: {},
            myFile: null, //选择的文件对象
            errorInfos: [], //返回的错误信息
            collegeDropList:[],
            majorDropList:[],
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            params: {
                name:"",
                collegeId:"",
                professionalId:"",
                masterName:"",
                teachingYear:""

            },
            //select2动态关键字查询列表配置
            selectCollege2Options: function () {
                var _this = this;
                return {

                    ajax: Select2LoadOptionsService.getLoadOptions("api/college/getCollegeDropList", {
                        orgId: AuthService.getUser().orgId,
                        pageNumber: 1,
                        pageSize: 100
                    }, "name"),

                    templateResult: function (data) {

                        if (data.id === '') { // adjust for custom placeholder values
                            _this.collegeDropList = [];
                            return '按班级筛选';
                        }
                        _this.collegeDropList.push(data);
                        return data.name;
                    },
                    placeholder: {
                        id: -1, // the value of the option
                        text: '全部'
                    },
                    allowClear: true
                }
            },
            //专业下拉列表配置
            select2MajorOptions: function () {
                var that = this;
                return {
                    placeholder: {
                        id: -1, // the value of the option
                        text: '全部'
                    },
                    allowClear: true,
                    ajax: {
                        url: "api/major/getMajorDropList",
                        dataType: 'json',
                        //delay: 250,
                        data: function (query) {
                            var params = {
                                orgId: AuthService.getUser().orgId,
                                pageNumber: 1,
                                pageSize: 100,
                                collegeId: that.params.collegeId,

                            };
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
                            that.majorDropList = [];
                        }
                        that.majorDropList.push(data);
                        return data.name;
                    }
                }
            },
            // 获取班级列表
            getClassList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber:1,
                    pageSize: that.page.pageSize
                };
                params.name=that.params.name;
                params.collegeId=that.params.collegeId;
                params.professionalId=that.params.professionalId;
                params.masterName=that.params.masterName;
                params.teachingYear=that.params.teachingYear;
                ClassService.getClassList(params).$promise
                    .then(function (data) {
                        that.classList = data.data;
                        that.page=data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //根据名称查询
            findClassByPage: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.name=that.params.name;
                params.collegeId=that.params.collegeId;
                params.professionalId=that.params.professionalId;
                params.masterName=that.params.masterName;
                params.teachingYear=that.params.teachingYear;
                ClassService.getClassList(params).$promise
                    .then(function (data) {
                        that.classList = data.data;
                        that.page.totalElements=data.page.totalElements;
                        that.page.totalPages=data.page.totalPages;
                    })
                    .catch(function (error) {

                    })
            },
            //删除
            deleteClass: function () {
                var _this = $scope.classListFn;
                var params = {
                    id: _this.currentClass.id,
                    userId: AuthService.getUser().id,
                }
                ClassService.deleteClass(params).$promise
                    .then(function (data) {
                        messageService.openMsg("班级删除成功！");
                        _this.getClassList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"班级删除失败！"));
                    })
            },
            //删除提示
            deletePrompt: function (entity) {
                var that=this;
                that.currentClass = entity;
                messageService.getMsg("您确定要删除此班级吗？", that.deleteClass)
            },

            /**
             * 弹出批量导入弹出框
             */
            openImpBatch: function(){
                var params = {
                    template: 'importDialog',
                    width: 600,
                    scope: $scope,
                };
                ImpBatchService.openImpBatch(params);
            },

            /**
             * 弹出批量导入弹出框
             */
            importantBatch: function(file){
                var params = {
                    file: file,
                    orgId: AuthService.getUser().orgId,
                    userId: AuthService.getUser().id,
                    uploadType: 'classes'
                };
                var dialogParams = {
                    template: 'importResultDialog',
                    width: 600,
                    scope: $scope
                };
                ImpBatchService.importantBatch(params, this, dialogParams, this.getClassList);
            },

            //选择文件事件
            selected: function($newFiles){
                ImpBatchService.selected($newFiles);
            },

            /**
             * 下载模板
             */
            downLoad: function(){
                ImpBatchService.downLoad('classes');
            },

            init: function () {
                this.getClassList();
            }
        };
        $scope.classListFn.init();
        $timeout(function () {
            $scope.$watch('classListFn.params.collegeId', function(newValue, oldValue) {
                if(!newValue){
                    $scope.classListFn.params.professionalId=null;
                }
                if (newValue!=oldValue){
                    $scope.classListFn.majorDropList=[];
                }
            });
        });
    });
