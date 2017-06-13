'use strict';

angular.module('dleduWebApp')
    .controller('SchoolYearListCtrl', function ($scope, $state,AuthService,StudentService,messageService,CommonService,NgTableParams,SchoolYearService) {
        $scope.preiodFn={
            //查询参数
            params:{

                id:"",
                orgId: AuthService.getUser().orgId,
            },
            //分页
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },
            //当前操作的学年对象
            currentSchoolYear:{},
            //课节列表
            periodList:[],
            //学年列表
            schoolYearList:[],
            //当前操作的课节对象
            currentPeriod:{},
            //课节翻译字典
            coursePeriod:[
                {
                    id:1,
                    text:"第一节"
                },
                {
                    id:2,
                    text:"第二节"
                },
                {
                    id:3,
                    text:"第三节"
                },
                {
                    id:4,
                    text:"第四节"
                },
                {
                    id:5,
                    text:"第五节"
                },
                {
                    id:6,
                    text:"第六节"
                },
                {
                    id:7,
                    text:"第七节"
                },
                {
                    id:8,
                    text:"第八节"
                },
                {
                    id:9,
                    text:"第九节"
                },
                {
                    id:10,
                    text:"第十节"
                },
                {
                    id:11,
                    text:"第十一节"
                },
                {
                    id:12,
                    text:"第十二节"
                },
                {
                    id:13,
                    text:"第十三节"
                },
                {
                    id:14,
                    text:"第十四节"
                },
                {
                    id:15,
                    text:"第十五节"
                },
                {
                    id:16,
                    text:"第十六节"
                },
                {
                    id:17,
                    text:"第十七节"
                },
                {
                    id:18,
                    text:"第十八节"
                },
                {
                    id:19,
                    text:"第十九节"
                },
                {
                    id:20,
                    text:"第二十节"
                },
            ],
            //学年查询
            getSchoolYearList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 0,
                    pageSize: 10
                };
                params.name=that.params.name;
                SchoolYearService.getSchoolYearList(params).$promise
                    .then(function (data) {
                        that.schoolYearList = data.data;
                        that.page=data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //课节查询
            getPeriodList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 0,
                    pageSize: 20
                };
                params.name=that.params.name;
                SchoolYearService.getPeriodList(params).$promise
                    .then(function (data) {
                        that.periodList = data.data;
                        that.periodDataHandler(that.periodList);
                    })
                    .catch(function (error) {

                    })
            },
            //展示数据预处理
            periodDataHandler:function (periodList) {
                var _this=this;
                angular.forEach(periodList,function (period) {
                    angular.forEach(_this.coursePeriod,function (data) {
                        if(period.no==data.id){
                            period.name=data.text;

                        }
                    })
                })

            },
            //根据名称查询
            findSchoolYearByPage: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.name=that.params.name;
                SchoolYearService.getSchoolYearList(params).$promise
                    .then(function (data) {
                        that.schoolYearList = data.data;
                        that.page.totalElements=data.page.totalElements;
                        that.page.totalPages=data.page.totalPages;
                    })
                    .catch(function (error) {

                    })
            },
            //生成学周
            addSemesterWeek:function (id) {
                var _this=this;
                var params={
                    semesterId:id,
                    userId:AuthService.getUser().id
                }
                SchoolYearService.addSemesterWeek(params).$promise
                    .then(function (data) {
                        _this.getSchoolYearList();
                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg("生成学周失败！");

                        }else {
                            messageService.openMsg(error.data);

                        }

                    })
            },
            //删除学年
            deleteSchoolYear: function () {
                var _this = $scope.preiodFn;
                var params = {
                    id: _this.currentSchoolYear.id,
                    userId: AuthService.getUser().id,
                }
                SchoolYearService.deleteSchoolYear(params).$promise
                    .then(function (data) {
                        messageService.openMsg("学期删除成功！");
                        _this.getSchoolYearList();
                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg("学期删除失败！");

                        }else {
                            messageService.openMsg(error.data);

                        }

                    })
            },
            //删除课节
            deletePeriod: function () {
                var _this = $scope.preiodFn;
                var params = {
                    id: _this.currentPeriod.id,
                    userId: AuthService.getUser().id,
                }
                SchoolYearService.deletePeriod(params).$promise
                    .then(function (data) {
                        messageService.openMsg("课节删除成功！");
                        _this.getPeriodList();
                    })
                    .catch(function (error) {
                        var re = /[^\u4e00-\u9fa5]/;
                        if(re.test(error.data)){
                            messageService.openMsg("课节删除失败！");

                        }else {
                            messageService.openMsg(error.data);

                        }

                    })
            },
            //学年删除提示
            deleteSchoolYearPrompt: function (entity) {
                this.currentSchoolYear = entity;
                messageService.getMsg("您确定要删除此学期吗？", this.deleteSchoolYear)
            },
            //课节删除提示
            deletePeriodPrompt: function (entity) {
                this.currentPeriod = entity;
                messageService.getMsg("您确定要删除此课节吗？", this.deletePeriod)
            },
            //初始化
            init:function () {
                var _this=this;
                _this.getSchoolYearList();
                _this.getPeriodList();
                if($state.params.position==2){
                    $("#myTab  a:last").tab("show");
                }


            },

        };
        $scope.preiodFn.init();

    })
