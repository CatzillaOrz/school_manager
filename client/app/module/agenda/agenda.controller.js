'use strict';

angular.module('dleduWebApp')
    .controller('AgendaCtrl', function ($scope, $state, AuthService, SchoolYearService,ngDialog, $compile, messageService, csCalendarConfig, TeachClassService) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var w = date.getDay();

        $scope.schedule = {
            //模拟课节api数据
            period: [
                {
                    "id": 1,
                    "orgId": 214,
                    "startTime": "07:00",
                    "endTime": "08:00",
                    "no": 1,
                    "createdDate": "2017-04-25 16:15:53",
                    "userId": null
                },
                {
                    "id": 2,
                    "orgId": 214,
                    "startTime": "09:00",
                    "endTime": "10:00",
                    "no": 2,
                    "createdDate": "2017-04-25 16:10:45",
                    "userId": null
                },
                {
                    "id": 3,
                    "orgId": 214,
                    "startTime": "12:00",
                    "endTime": "13:00",
                    "no": 3,
                    "createdDate": "2017-04-25 16:14:48",
                    "userId": null
                },
                {
                    "id": 4,
                    "orgId": 214,
                    "startTime": "14:00",
                    "endTime": "15:00",
                    "no": 4,
                    "createdDate": "2017-04-25 18:09:18",
                    "userId": null
                },
                {
                    "id": 5,
                    "orgId": 214,
                    "startTime": "16:00",
                    "endTime": "17:00",
                    "no": 5,
                    "createdDate": "2017-04-25 18:09:18",
                    "userId": null
                },
                {
                    "id": 6,
                    "orgId": 214,
                    "startTime": "18:00",
                    "endTime": "19:00",
                    "no": 6,
                    "createdDate": "2017-04-25 18:09:18",
                    "userId": null
                },
                {
                    "id": 7,
                    "orgId": 214,
                    "startTime": "20:00",
                    "endTime": "21:00",
                    "no": 7,
                    "createdDate": "2017-04-25 18:09:18",
                    "userId": null
                },
                {
                    "id": 8,
                    "orgId": 214,
                    "startTime": "22:00",
                    "endTime": "23:00",
                    "no": 8,
                    "createdDate": "2017-04-25 18:09:18",
                    "userId": null
                }/*,
                 {
                 "id": 9,
                 "orgId": 214,
                 "startTime": "21:10",
                 "endTime": "21:40",
                 "no": 9,
                 "createdDate": "2017-04-25 18:09:18",
                 "userId": null
                 },
                 {
                 "id": 10,
                 "orgId": 214,
                 "startTime": "22:00",
                 "endTime": "22:40",
                 "no": 10,
                 "createdDate": "2017-04-25 18:09:18",
                 "userId": null
                 }*/
            ],
            teachingClass: {
                "teachingClassId": 8,
                "teachingClassName": "测试教学班A",
                "timePeriod": [{
                    "dayOfWeek": 1,
                    "periodId": null,
                    "periodMo": 0,
                    "periodNum": 1,
                    "startWeekId": null,
                    "endWeekId": null,
                    "startWeekNo": 1,
                    "endWeekNo": 1,
                    "singleOrDouble": 10,
                    "classroom": "409",
                    "remark": "",
                    "color": null
                }]
            },
            /*period: [
             {
             "startTime": "00:00",
             "endTime": "24:00"
             }
             ],*/
            periodA: [],
            periodB: [],
            // teachingClass: [],
            teachWeekList: [
                {
                    "id": 1,
                    "orgId": 214,
                    "startTime": "07:00",
                    "endTime": "08:00",
                    "no": 1,
                    "createdDate": "2017-04-25 16:15:53",
                    "userId": null
                },
                {
                    "id": 2,
                    "orgId": 214,
                    "startTime": "09:00",
                    "endTime": "10:00",
                    "no": 2,
                    "createdDate": "2017-04-25 16:10:45",
                    "userId": null
                },
                {
                    "id": 3,
                    "orgId": 214,
                    "startTime": "12:00",
                    "endTime": "13:00",
                    "no": 3,
                    "createdDate": "2017-04-25 16:14:48",
                    "userId": null
                },
                {
                    "id": 4,
                    "orgId": 214,
                    "startTime": "14:00",
                    "endTime": "15:00",
                    "no": 4,
                    "createdDate": "2017-04-25 18:09:18",
                    "userId": null
                },
                {
                    "id": 5,
                    "orgId": 214,
                    "startTime": "16:00",
                    "endTime": "17:00",
                    "no": 5,
                    "createdDate": "2017-04-25 18:09:18",
                    "userId": null
                },
                {
                    "id": 6,
                    "orgId": 214,
                    "startTime": "18:00",
                    "endTime": "19:00",
                    "no": 6,
                    "createdDate": "2017-04-25 18:09:18",
                    "userId": null
                },
                {
                    "id": 7,
                    "orgId": 214,
                    "startTime": "20:00",
                    "endTime": "21:00",
                    "no": 7,
                    "createdDate": "2017-04-25 18:09:18",
                    "userId": null
                },
                {
                    "id": 8,
                    "orgId": 214,
                    "startTime": "22:00",
                    "endTime": "23:00",
                    "no": 8,
                    "createdDate": "2017-04-25 18:09:18",
                    "userId": null
                }/*,
                 {
                 "id": 9,
                 "orgId": 214,
                 "startTime": "21:10",
                 "endTime": "21:40",
                 "no": 9,
                 "createdDate": "2017-04-25 18:09:18",
                 "userId": null
                 },
                 {
                 "id": 10,
                 "orgId": 214,
                 "startTime": "22:00",
                 "endTime": "22:40",
                 "no": 10,
                 "createdDate": "2017-04-25 18:09:18",
                 "userId": null
                 }*/
            ],
            teachWeekListA: [],
            teachWeekListB: [],
            courseCardForm: {
                classroom: "",
                endWeekId: null,
                endWeekNo: null,
                periodId: null,
                periodMo: 1,
                periodNum: 1,
                remark: "",
                singleOrDouble: 10,
                startWeekId: null,
                startWeekNo: null,
                dayOfWeek: 1
            },
            destroyStatus: 2,
            //课程表数据
            eventSources: [],
            //课程卡数组数据
            timePeriod: [],
            //当前课程卡数据
            courseCard:{},

            //排课日程参数设置
            scheduleConfig: {
                eventClick: function (courseCard, jsEvent, view) {
                    //todo 点击课程卡事件
                    console.log(courseCard);
                    $scope.schedule.courseCard = courseCard;
                    /*ngDialog.open({
                        template: 'app/module/agenda/editCourseCard.html',
                        showClose:false,
                        width:600,
                        scope: $scope
                    });*/
                },
                eventDrop: function (courseCard, delta, revertFunc, jsEvent, ui, view) {
                    //拖动课程卡时，周的换算与课节的调整换算
                    var arr = $scope.schedule.timePeriod;
                    var remainder = delta / 1000 / 60 / 60 % 24;
                    var divisor = delta / 1000 / 60 / 60 / 24;
                    if (remainder > $scope.schedule.period.length) {
                        remainder = remainder - 24;
                        divisor = divisor + 1;
                    }
                    if (remainder < -$scope.schedule.period.length) {
                        remainder = remainder + 24;
                        divisor = divisor - 1;
                    }
                    divisor = parseInt(divisor);
                    courseCard.periodMo = courseCard.periodMo + remainder;
                    courseCard.dayOfWeek = courseCard.dayOfWeek + divisor;
                    // arr[courseCard._id] = courseCard;

                    angular.forEach(arr,function(item,index){
                        if(item._id == courseCard._id){
                            item.periodMo = courseCard.periodMo;
                            item.dayOfWeek = courseCard.dayOfWeek;
                        }
                    });
                    console.log('更改为：周' + courseCard.dayOfWeek + '第' + parseInt(courseCard.periodMo) + '节上课');
                    console.log('同步为：周' + arr[0].dayOfWeek + '第' + parseInt(arr[0].periodMo) + '节上课');
                },
                eventResize: function (courseCard, delta, revertFunc, jsEvent, ui, view) {
                    var arr = $scope.schedule.timePeriod;
                    //更改课程卡的课节数
                    courseCard.periodNum = courseCard.periodNum + delta / 1000 / 60 / 60;

                    angular.forEach(arr,function(item,index){
                        if(item._id == courseCard._id){
                            item.periodNum = courseCard.periodNum;
                        }
                    });
                    console.log('更改为：连上' + courseCard.periodNum + '节');
                    console.log('同步为：连上' + arr[0].periodNum + '节');
                },
                eventRender: function (event, element, view) {
                    //todo 课程卡提示
                    /*element.attr({
                        'tooltip': '点击课程卡可编辑',
                        'tooltip-append-to-body': true
                    });
                    $compile(element)($scope);*/
                },
                eventMouseover: function (calEvent, jsEvent, view) {

                },
                eventMouseout: function (calEvent, jsEvent, view) {

                }
            },


            /**
             * 改变排课日程视图，默认按课表渲染
             * @param view
             * @param calendar
             */
            changeView: function (view, calendar) {
                //todo 按月份显示排课
                csCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
            },


            /**
             * 重新渲染课程表视图
             * @param calendar  cs-calendar 的 attr: data-calendar="calendarName"
             */
            renderCalendar: function (calendar) {

            },
            courseMouseover: function (calEvent, jsEvent, view) {

            },
            courseMouseout: function (calEvent, jsEvent, view) {

            },


            /**
             * 用表单数据建立新的课程卡
             */
            addCourseCard: function () {
                var newObj = angular.copy(this.courseCardForm);
                newObj.periodNum = newObj.periodNu.no;
                this.renderSource(newObj);
            },


            /**
             * 过滤起始学周选择范围
             * @param item
             */
            weekChangeA: function (item) {
                console.log(item);
                var _this = this;
                var number = null;
                _this.teachWeekListA = angular.copy(_this.teachWeekList);
                if (!!item) {
                    angular.forEach(_this.teachWeekList, function (souce, index) {
                        if (souce.no == item.no) {
                            number = index;
                        }
                    });
                    _this.teachWeekListA = _this.teachWeekListA.slice(0, number + 1);
                    _this.courseCardForm.endWeekId = item.id;
                    _this.courseCardForm.endWeekNo = item.no;
                }
            },


            /**
             * 过滤结束学周选择范围
             * @param item
             */
            weekChangeB: function (item) {
                var _this = this;
                var number = null;
                _this.teachWeekListB = angular.copy(_this.teachWeekList);
                if (!!item) {
                    angular.forEach(_this.teachWeekList, function (souce, index) {
                        if (souce.no == item.no) {
                            number = index;
                        }
                    });
                    _this.teachWeekListB = _this.teachWeekListB.slice(number);
                    _this.courseCardForm.startWeekId = item.id;
                    _this.courseCardForm.startWeekNo = item.no;
                }
            },
            periodChange: function (item) {
                var _this = this;
                var number = null;
                _this.periodB = angular.copy(_this.period);
                if (!!item) {
                    angular.forEach(_this.period, function (souce, index) {
                        if (souce.no == item.no) {
                            number = index;
                        }
                    });
                    number != 0 ? _this.periodB = _this.periodB.slice(0, -number) : _this.periodB;
                    _this.courseCardForm.periodId = item.id;
                    _this.courseCardForm.periodMo = item.no;
                    if (_this.periodB.length && _this.periodB[_this.periodB.length - 1].no < _this.courseCardForm.periodNu.no) {
                        _this.courseCardForm.periodNu = _this.periodB[0];
                    }
                }
            },

            checkDayOfWeek: function (day) {
                this.courseCardForm.dayOfWeek = parseInt(day);
            },

            /**
             * 重构课程卡数据
             * @param obj
             */
            renderSource: function (obj) {
                var _this = this;
                !obj.periodMo && (obj.periodMo = 1);
                !obj.periodNum && (obj.periodNum = 1);

                obj.title = '第' + parseInt(obj.startWeekNo) + '-' + parseInt(obj.endWeekNo) + '学周';
                obj.start = new Date(y, m, d - w + parseInt(obj.dayOfWeek), parseInt(obj.periodMo - 1), 0);
                obj.end = new Date(y, m, d - w + parseInt(obj.dayOfWeek), parseInt(obj.periodMo - 1) + parseInt(obj.periodNum), 0);
                _this.timePeriod.push(obj);
                // });
            },

            /**
             * 获取学周数据
             */
            getTeachWeek: function () {
                var _this = this;
                var params = {
                    semesterId: _this.teachingClass.semesterId
                };
                SchoolYearService.getTeachWeekList(params).$promise
                    .then(function (data) {
                        _this.teachWeekList = data.data;
                        _this.teachWeekListA = angular.copy(_this.teachWeekList);
                        _this.teachWeekListB = angular.copy(_this.teachWeekList);
                        _this.courseCardForm.startWeek = _this.teachWeekListA[0];
                        _this.courseCardForm.startWeekId = _this.teachWeekListA[0].id;
                        _this.courseCardForm.startWeekNo = _this.teachWeekListA[0].no;
                        _this.courseCardForm.endWeek = _this.teachWeekListB[0];
                        _this.courseCardForm.endWeekId = _this.teachWeekListB[0].id;
                        _this.courseCardForm.endWeekNo = _this.teachWeekListB[0].no;
                    })
                    .catch(function (error) {

                    })
            },

            /**
             * 获取课节数据
             */
            getPeriod: function () {
                var _this = this;
                var params = {
                    orgId: $scope.user.orgId
                };
                SchoolYearService.getPeriodList(params).$promise
                    .then(function (data) {
                        _this.period = data.data;
                        angular.forEach(_this.period, function (per, index) {
                            if (per.no == 0) {
                                per.no = 1;
                            }
                        });
                        _this.periodA = angular.copy(_this.period);
                        _this.periodB = angular.copy(_this.period);
                        _this.courseCardForm.period = _this.periodA[0];
                        _this.courseCardForm.periodId = _this.periodA[0].id;
                        _this.courseCardForm.periodMo = _this.periodA[0].no;
                        _this.courseCardForm.periodNu = _this.periodB[0];
                        _this.courseCardForm.periodNum = _this.periodB[0].no;
                    })
                    .catch(function (error) {

                    })
            },

            /**
             * 获取教学班信息
             * @param id
             */
            getTeachClassInfo: function (id) {
                var _this = this;
                var params = {
                    id: id
                };
                TeachClassService.getTeachClassById(params).$promise
                    .then(function (data) {

                        _this.teachingClass.teachingClassId = data.id;
                        _this.teachingClass.teachingClassName = data.name;
                        _this.teachingClass.semesterId = data.semesterId;
                        _this.teachingClass.semesterName = data.semesterName;
                        _this.teachingClass.courseName = data.courseName;

                        _this.getTeachWeek();
                        _this.getCourseSchedule();

                    })
                    .catch(function (error) {

                    })
            },

            /**
             * 清除课程表视图上所有数据
             */
            removeAllCourseCard: function () {
                this.timePeriod.splice(0, this.timePeriod.length);
            },

            /**
             * 保存排课数据到api
             */
            saveCourseSchedule: function () {
                var _this = this;
                var params = {
                    teachingClassId: _this.teachingClass.teachingClassId,
                    teachingClassName: _this.teachingClass.teachingClassName,
                    userId: $scope.user.id,
                    timePeriod: _this.timePeriod
                };
                console.log(params);
                TeachClassService.saveCourseSchedule(params).$promise
                    .then(function (data) {
                        messageService.openMsg("保存成功")
                    })
                    .catch(function (error) {

                    })
            },
            getCourseSchedule: function () {
                var _this = this;
                var params = {
                    teachingClassId: _this.teachingClass.teachingClassId
                };
                TeachClassService.getCourseSchedule(params).$promise
                    .then(function (data) {
                        _this.teachingClass = data;
                        angular.forEach(_this.teachingClass.timePeriod, function (obj, index) {
                            _this.renderSource(obj);
                        });
                    })
                    .catch(function (error) {

                    })
            },

            /**
             * 页面初始化
             */
            init: function () {
                var _this = this;
                $scope.user = AuthService.getUser();
                _this.getPeriod();

/*

                //temp
                angular.forEach(_this.period, function (per, index) {
                    if (per.no == 0) {
                        per.no = 1;
                    }
                });
                _this.periodA = angular.copy(_this.period);
                _this.periodB = angular.copy(_this.period);
                _this.courseCardForm.period = _this.periodA[0];
                _this.courseCardForm.periodId = _this.periodA[0].id;
                _this.courseCardForm.periodMo = _this.periodA[0].no;
                _this.courseCardForm.periodNu = _this.periodB[0];
                _this.courseCardForm.periodNum = _this.periodB[0].no;


                _this.teachWeekListA = angular.copy(_this.teachWeekList);
                _this.teachWeekListB = angular.copy(_this.teachWeekList);
                _this.courseCardForm.startWeek = _this.teachWeekListA[0];
                _this.courseCardForm.startWeekId = _this.teachWeekListA[0].id;
                _this.courseCardForm.startWeekNo = _this.teachWeekListA[0].no;
                _this.courseCardForm.endWeek = _this.teachWeekListB[0];
                _this.courseCardForm.endWeekId = _this.teachWeekListB[0].id;
                _this.courseCardForm.endWeekNo = _this.teachWeekListB[0].no;
                //temp end
*/



                if (!!$state.params.id) {

                    _this.getTeachClassInfo($state.params.id);
                }

                angular.forEach(_this.timePeriod, function (obj, index) {
                    _this.renderSource(obj);
                });
                _this.eventSources = [_this.timePeriod];

            }
        };
        $scope.schedule.init();

    });
