'use strict';

/**
 * 添加节假日
 */
angular.module('dleduWebApp')
    .controller('HolidayManCtrl', function ($scope, $timeout, AuthService, messageService, CommonService, ngDialog,
                                            TeachClassService, EduManService) {
        $scope.Holiday = {
            //列表
            records: [],
            //当前操作的teacher
            currentRecord: null,
            schoolYearDropList: [],
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },

            entity: {
                endDate: "",
                startDate: "",
                id: 0,
                semesterId: 0,
                name: "",
                orgId: AuthService.getUser().orgId,
                userId: AuthService.getUser().id
            },

            select2SemesterOptions: function () {
                var _this = this;
                return {
                    allowClear: true,
                    ajax: {
                        url: "api/schoolyear/getSemesterList",
                        dataType: 'json',
                        //delay: 250,
                        data: function (query) {
                            var params = {
                                orgId: AuthService.getUser().orgId,
                                pageNumber: 1,
                                pageSize: 10000,


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

            getCurrentSemester: function () {
                var _this = this;
                var params = {
                    orgId: AuthService.getUser().orgId
                };
                EduManService.getCurrentSemester(params).$promise
                    .then(function (data) {
                        _this.entity.semesterId = data.id;
                        _this.schoolYearDropList=[data];
                    })
                    .catch(function (error) {

                    })
            },

            //增加节假日
            addHoliday: function(){
                var that = this;
                var params = this.entity;
                if(!this.entity.semesterId){
                    messageService.openMsg("请选择学期!");
                    return;
                }
                TeachClassService.addHoliday(params).$promise
                    .then(function (data) {
                        messageService.openMsg("新增节假日成功!");
                        that.getHolidayList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"新增节假日失败！"));
                    })
            },

            //提交
            submit: function(){
                this.addHoliday();
            },

            // 获取老师列表
            getHolidayList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                TeachClassService.getHolidayList(params).$promise
                    .then(function (data) {
                        that.records = data.data;
                        that.page = data.page;
                    })
                    .catch(function (error) {

                    })
            },


            //删除
            delRecord: function () {
                var _this = $scope.Holiday;
                var params = {
                    id: _this.currentRecord.id,
                    userId: AuthService.getUser().id
                }
                TeachClassService.delHoliday(params).$promise
                    .then(function (data) {
                        messageService.openMsg("删除成功！");
                        _this.getHolidayList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error, "删除失败！"));
                    })
            },

            //删除
            delTip: function (record) {
                var that = this;
                that.currentRecord = record;
                messageService.getMsg("是否确定删除该条记录？", that.delRecord)
            },


            init: function () {
                var that = this;
                $timeout(function () {
                    that.getCurrentSemester();
                },100)
                this.getHolidayList();
            }
        };
        $scope.Holiday.init();
    });

