'use strict';

angular.module('dleduWebApp')
    .controller('PeriodListCtrl', function ($scope, AuthService,StudentService,messageService,CommonService,NgTableParams,PeriodService) {
        $scope.preiodFn={
            params:{

                id:"",
                orgId: AuthService.getUser().orgId,
            },
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },
            currentPeriod:{},
            periodList:[],
            coursePeriodList:[],
            
            getPeriodList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 0,
                    pageSize: 10
                };
                params.name=that.params.name;
                PeriodService.getPeriodList(params).$promise
                    .then(function (data) {
                        that.periodList = data.data;
                        that.page=data.page;
                    })
                    .catch(function (error) {

                    })
            },
            getCoursePeriodList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 0,
                    pageSize: 10
                };
                params.name=that.params.name;
                PeriodService.getCoursePeriodList(params).$promise
                    .then(function (data) {
                        that.coursePeriodList = data.data;
                        that.page=data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //根据名称查询
            findPeriodByPage: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.name=that.params.name;
                PeriodService.getPeriodList(params).$promise
                    .then(function (data) {
                        that.periodList = data.data;
                        that.page=data.page;
                        that.page.pageNumber+=that.page.pageNumber;
                    })
                    .catch(function (error) {

                    })
            },
            addSemesterWeek:function (id) {
                var _this=this;
                var params={
                    semesterId:id,
                    userId:AuthService.getUser().id
                }
                PeriodService.addSemesterWeek(params).$promise
                    .then(function (data) {
                        _this.getPeriodList();
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
            //删除
            deletePeriod: function () {
                var _this = $scope.preiodFn;
                var params = {
                    id: _this.currentPeriod.id,
                    userId: AuthService.getUser().id,
                }
                PeriodService.deletePeriod(params).$promise
                    .then(function (data) {
                        messageService.openMsg("学期删除成功！");
                        _this.getPeriodList();
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
            //删除提示
            deletePrompt: function (entity) {
                this.currentPeriod = entity;
                messageService.getMsg("您确定要删除此学期吗？", this.deletePeriod)
            },
            init:function () {
                var _this=this;
                _this.getPeriodList();
                _this.getCoursePeriodList();

            },
            schoolYearList:[

                        {
                            name:"第一学期",
                            startTime:"2017-09-01",
                            endTime:"2017-09-01"

                        },
                        {
                            name:"第一学期",
                            startTime:"2017-09-01",
                            endTime:"2017-09-01"

                        }

            ]
        };
        $scope.preiodFn.init();

    })
