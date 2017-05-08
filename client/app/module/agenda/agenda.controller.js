'use strict';

angular.module('dleduWebApp')
    .controller('AgendaCtrl', function ($scope, $state, ClassService, AuthService, messageService, $compile, csCalendarConfig) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var w = date.getDay();


        //模拟课节api数据
        var period = [
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
        ];
        //模拟排课api数据
        var data = {
            "teachingClassId": 4,
            "teachingClassName": "大学英语03教学班",
            "userId": 0,
            "timePeriod": [
                {
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
                    "dayOfWeek": 6
                },
                {
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
        };

        $scope.schedule = {
            //排课日程参数设置
            scheduleConfig : {
                height: 580,
                editable: true,
                header: {
                    left: '',
                    center: '',
                    right: ''
                },
                //在agenda开头的视图里，是否显示最上面all-day那一栏
                allDaySlot: false,
                columnFormat: {
                    month: 'ddd',
                    week: 'ddd',
                    day: 'dddd'
                },
                defaultView: 'agendaWeek',
                displayEventTime: false,
                slotDuration : "01:00:00",
                snapDuration : "01:00:00",
                axisFormat: 'HH:mm',
                //第一列显示周几 0:周日，1:周一 ……
                firstDay: 0,
                //拖拽时课程卡透明度
                dragOpacity:0.5,
                //设定课节数量
                minTime : "0:00",
                maxTime : period.length + ':00',
                //限制拖拽拖放的位置（即限制有些地方拖不进去）
                eventConstraint : {
                    start: "0:00",
                    end: period.length + ':00'
                },
                eventClick: function (courseCard, jsEvent, view) {
                    //todo 点击课程卡事件
                    console.log(courseCard.title + ' was clicked ');
                },
                eventDrop: function (courseCard, delta, revertFunc, jsEvent, ui, view) {
                    //todo 拖动课程卡时，周的换算与课节的调整换算
                    console.log(delta/1000/60/60);
                },
                eventResize: function (courseCard, delta, revertFunc, jsEvent, ui, view) {
                    //更改课程卡的课节数
                    courseCard.periodNum = courseCard.periodNum + delta/1000/60/60;
                },
                eventRender: function (event, element, view) {
                 element.attr({
                 'tooltip': event.title,
                 'tooltip-append-to-body': true
                 });
                 $compile(element)($scope);
                 },
                eventMouseover: function(calEvent, jsEvent, view) {

                },
                eventMouseout: function (calEvent, jsEvent, view) {

                }
            },
            eventSources : null,
            onCourseClick: function (courseCard, jsEvent, view) {
                // $scope.alertMessage = (date.title + ' was clicked ');
                console.log(courseCard.title + ' was clicked ');
            },
            OnCourseDrop: function (courseCard, delta, revertFunc, jsEvent, ui, view) {
                console.log(courseCard);
                console.log(jsEvent);
                $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
                console.log('Event Dropped to make dayDelta ' + delta);
            },
            OnCourseResize: function (courseCard, delta, revertFunc, jsEvent, ui, view) {
                $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
                console.log('Event Resized to make dayDelta ' + delta);
            },
            addRemoveCourseSource: function (sources, source) {
                var canAdd = 0;
                angular.forEach(sources, function (value, key) {
                    if (sources[key] === source) {
                        sources.splice(key, 1);
                        canAdd = 1;
                    }
                });
                if (canAdd === 0) {
                    sources.push(source);
                }
            },
            changeView : function (view, calendar) {
                csCalendarConfig.calendars[calendar].fullCalendar('changeView', view);
            },
            renderCalendar : function (calendar) {
                $timeout(function () {
                    if (csCalendarConfig.calendars[calendar]) {
                        csCalendarConfig.calendars[calendar].fullCalendar('render');
                    }
                });
            },
            courseRender : function (event, element, view) {
                element.attr({
                    'tooltip': event.title,
                    'tooltip-append-to-body': true
                });
                $compile(element)($scope);
            },
            courseMouseover:function(calEvent, jsEvent, view) {

            },
            courseMouseout: function (calEvent, jsEvent, view) {

            }
        };


        //初始化课节数组
        var periodArr = [];
        angular.forEach(period, function (period, index) {
            var periodCp = {};
            periodCp.stH = parseInt(period.startTime.split(":")[0]);
            periodCp.stM = parseInt(period.startTime.split(":")[1]);
            periodCp.etH = parseInt(period.endTime.split(":")[0]);
            periodCp.etM = parseInt(period.endTime.split(":")[1]);
            periodArr.push(periodCp);
        });
        //初始化排课可视化数据
        var newArr = angular.copy(data.timePeriod);
        angular.forEach(newArr, function (obj, index) {
            obj.title = '第'+obj.startWeekNo +'-' + obj.endWeekNo+'学周';
            obj.start = new Date(y, m, d - w + obj.dayOfWeek, obj.periodMo, 0);
            obj.end = new Date(y, m, d - w + obj.dayOfWeek, obj.periodMo+obj.periodNum,0);
        });
        $scope.schedule.eventSources = [newArr];
    });
