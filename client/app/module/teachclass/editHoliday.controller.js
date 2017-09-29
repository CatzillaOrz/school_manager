'use strict';

/**
 * 添加节假日
 */
angular.module('dleduWebApp')
    .controller('EditHolidayCtrl', function ($scope, $timeout, $state, AuthService, messageService, CommonService, ngDialog,
                                            TeachClassService, EduManService) {
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

            //学期下拉列表分组数据格式化
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

            getCurrentSemester: function () {
                var _this = this;
                var params = {
                    orgId: AuthService.getUser().orgId
                };
                EduManService.getCurrentSemester(params).$promise
                    .then(function (data) {
                        var obj = {
                            text: data.yearName,
                            children: [
                                {
                                    id:data.id,
                                    text:data.name
                                }
                            ]
                        };
                        _this.entity.semesterId = data.id;
                        _this.schoolYearDropList=[obj];
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
                    })
                    .catch(function (error) {

                    })
            },

            //增加节假日
            addHoliday: function(){
                var that = this;
                var params = this.entity;
                params.userId = AuthService.getUser().id;
                TeachClassService.updateHoliday(params).$promise
                    .then(function (data) {
                        if(data.success){
                            messageService.openMsg("编辑节假日成功!");
                            that.getHolidayById();
                        }else{
                            messageService.openMsg(data.message);
                        }
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
                $timeout(function () {
                    that.getCurrentSemester();
                },100)
                this.getHolidayById();
            }
        };
        $scope.editHoliday.init();
    });

