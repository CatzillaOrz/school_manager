'use strict';

/**
 * 添加节假日
 */
angular.module('dleduWebApp')
    .controller('EditHolidayCtrl', function ($scope, $timeout, $state, AuthService, messageService, CommonService, ngDialog,
                                            TeachClassService, SchoolYearService) {
        $scope.editHoliday = {
            id: 0,
            //当前操作的teacher
            currentRecord: null,
            schoolYearDropList: [],

            entity: {
                endDate: "",
                startDate: "",
                id: 0,
                name: "",
                orgId: AuthService.getUser().orgId,
                semesterId: 0,
                userId: AuthService.getUser().id
            },

            select2SemesterOptions: function () {
                var _this = this;
                return {
                    placeholder: {
                        id: -1, // the value of the option
                        text: '按学期筛选'
                    },
                    allowClear: true,
                    ajax: {
                        url: "api/schoolyear/getSemesterList",
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
                            return {
                                results: data.data,
                                pagination: {
                                    more: (params.page * 30) < data.total_count
                                }
                            };
                        },
                        cache: false
                    },

                }
            },


            getCurrentSemester: function (id) {
                var _this = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    id: id
                };
                SchoolYearService.getSemesterById(params).$promise
                    .then(function (data) {
                        _this.entity.semesterId = data.id;
                        _this.schoolYearDropList = [data];
                    })
                    .catch(function (error) {

                    })
            },

            // 获取老师列表
            getHolidayById: function () {
                var that = this;
                var params = {
                    userId: AuthService.getUser().id,
                    id: that.id
                };
                TeachClassService.getHolidayById(params).$promise
                    .then(function (data) {
                        that.entity = data;
                        $timeout(function () {
                            that.getCurrentSemester(that.entity.semesterId);
                        },100)
                    })
                    .catch(function (error) {

                    })
            },

            //增加节假日
            addHoliday: function(){
                var that = this;
                var params = this.entity;
                params.userId = AuthService.getUser().id;
                params.orgId = AuthService.getUser().orgId
                TeachClassService.updateHoliday(params).$promise
                    .then(function (data) {
                        messageService.openMsg("编辑节假日成功!");
                        $state.go("holidayman");
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"编辑节假日失败！"));
                    })
            },

            //提交
            submit: function(){
                this.addHoliday();
            },

            init: function () {
                var that = this;
                that.id = $state.params.id;
                this.getHolidayById();
            }
        };
        $scope.editHoliday.init();
    });

