'use strict';

angular.module('dleduWebApp')
    .controller('AgendaCtrl', function ($scope, $state, ClassService, AuthService, messageService, $compile, csCalendarConfig) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var w = date.getDay();

        $scope.schedule = {
            //模拟课节api数据
            period : [
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
            teachingClass:{
                "teachingClassId": 4,
                "teachingClassName": "大学英语03教学班",
                "userId": 0,
                //模拟排课api数据
                "timePeriod": [
                    {
                        "courseCardId": 0,
                        "classroom": "电教楼409教室",
                        "endWeekId": 3,
                        "endWeekNo": 7,
                        "periodId": 0,
                        "periodMo": 0,
                        "periodNum": 2,
                        "remark": "备注信息……",
                        "singleOrDouble": 10,
                        "startWeekId": 1,
                        "startWeekNo": 2,
                        "dayOfWeek": 3
                    },
                    {
                        "courseCardId": 1,
                        "classroom": "英语楼201教室",
                        "endWeekId": 3,
                        "endWeekNo": 7,
                        "periodId": 0,
                        "periodMo": 2,
                        "periodNum": 1,
                        "remark": "备注信息……",
                        "singleOrDouble": 30,
                        "startWeekId": 1,
                        "startWeekNo": 2,
                        "dayOfWeek": 1
                    },
                    {
                        "courseCardId": 2,
                        "classroom": "英语楼204教室",
                        "endWeekId": 3,
                        "endWeekNo": 7,
                        "periodId": 0,
                        "periodMo": 5,
                        "periodNum": 1,
                        "remark": "备注信息……",
                        "singleOrDouble": 20,
                        "startWeekId": 1,
                        "startWeekNo": 2,
                        "dayOfWeek": 6
                    }
                ]
            },
            courseCardForm: {
                classroom: "",
                endWeekId: null,
                endWeekNo: null,
                periodId: null,
                periodMo: 0,
                periodNum: 1,
                remark: "",
                singleOrDouble: 10,
                startWeekId: null,
                startWeekNo: null,
                dayOfWeek: 1
            },
            //课程表数据
            eventSources: [],
            //课程卡数据
            timePeriod:[],
            //排课日程参数设置
            scheduleConfig: {
                eventClick: function (courseCard, jsEvent, view) {
                    //todo 点击课程卡事件
                    console.log(courseCard);
                },
                eventDrop: function (courseCard, delta, revertFunc, jsEvent, ui, view) {
                    //拖动课程卡时，周的换算与课节的调整换算
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
                    console.log('更改为：周' + courseCard.dayOfWeek + '第' + parseInt(courseCard.periodMo + 1) + '节上课');
                },
                eventResize: function (courseCard, delta, revertFunc, jsEvent, ui, view) {
                    //更改课程卡的课节数
                    courseCard.periodNum = courseCard.periodNum + delta / 1000 / 60 / 60;
                    console.log('更改为：连上' + courseCard.periodNum + '节');
                },
                eventRender: function (event, element, view) {
                    //todo 课程卡提示
                    element.attr({
                        'tooltip': event.title,
                        'tooltip-append-to-body': true
                    });
                    $compile(element)($scope);
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
                var obj = angular.copy(this.courseCardForm);
                obj.title = '第' + obj.startWeekNo + '-' + obj.endWeekNo + '学周';
                obj.start = new Date(y, m, d - w + obj.dayOfWeek, obj.periodMo, 0);
                obj.end = new Date(y, m, d - w + obj.dayOfWeek, obj.periodMo + obj.periodNum, 0);
                this.timePeriod.push(obj);
            },
            /**
             * 重构课程卡数据
             * @param source
             */
            render: function (source) {
                angular.forEach(source, function (obj, index) {
                    obj.title = '第' + obj.startWeekNo + '-' + obj.endWeekNo + '学周';
                    obj.start = new Date(y, m, d - w + obj.dayOfWeek, obj.periodMo, 0);
                    obj.end = new Date(y, m, d - w + obj.dayOfWeek, obj.periodMo + obj.periodNum, 0);
                });
            },
            init: function () {
                this.timePeriod = angular.copy(this.teachingClass.timePeriod);
                this.render(this.timePeriod);
                this.eventSources = [this.timePeriod];
            }
        };
        $scope.schedule.init();

    });
