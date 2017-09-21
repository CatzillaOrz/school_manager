'use strict';

angular.module('dleduWebApp')
    .controller('AgendaCtrl', function ($scope, $state, $timeout, $document, AuthService, SchoolYearService, ngDialog, $compile, messageService, csCalendarConfig, TeachClassService) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var w = date.getDay();
        var eventSerialId = 1;
        var initNum = 0;


        $scope.schedule = {
            period: [
                {
                    "startTime": "00:00",
                    "endTime": "24:00"
                }
            ],
            semesterId: null,
            periodA: [],
            periodB: [],
            teachingClass: {},
            teachWeekList: [],
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
            courseCard: {},
            //单教学班排课还是批量排课的状态
            bulk: true,
            //批量排课用的教学班课程颜色组
            groupColors: ['#57889C', '#A8829F', '#356E35', '#6E587A', '#A57225', '#A90329', '#71843F', '#6E3671', '#AC5287', '#4C4F53', '#A65858', '#C79121'],
            //排课日程参数设置
            scheduleConfig: {

                eventClick: function (courseCard, jsEvent, view) {
                    // $scope.schedule.toEditCourse(courseCard, jsEvent, view);

                    var _this = $scope.schedule;
                },

                eventDrop: function (courseCard, delta, revertFunc, jsEvent, ui, view) {
                    // console.log(courseCard);
                    //拖动课程卡时，周的换算与课节的调整换算
                    var arr = $scope.schedule.eventSources;
                    var period = $scope.schedule.period;
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
                    courseCard.periodMo = parseInt(courseCard.periodMo) + parseInt(remainder);
                    courseCard.dayOfWeek = parseInt(courseCard.dayOfWeek) + parseInt(divisor);
                    angular.forEach(period, function (item, index) {
                        if (courseCard.periodMo == item.no) {
                            courseCard.periodId = item.id;
                        }
                    });
                    angular.forEach(arr, function (obj, num) {
                        if(obj.teachingClassId == courseCard.teachingClassId){
                            angular.forEach(obj, function (item, index) {
                                if (item._id == courseCard._id) {
                                    item.periodMo = courseCard.periodMo;
                                    item.periodId = courseCard.periodId;
                                    item.dayOfWeek = parseInt(courseCard.dayOfWeek);
                                    console.log('更改为：周' + courseCard.dayOfWeek + '第' + parseInt(courseCard.periodMo) + '节上课');
                                    console.log('同步为：周' + obj[index].dayOfWeek + '第' + parseInt(obj[index].periodMo) + '节上课');

                                    item.start = new Date(y, m, parseInt(d) - parseInt(w) + parseInt(item.dayOfWeek), parseInt(item.periodMo - 1), 0);
                                    item.end = new Date(y, m, parseInt(d) - parseInt(w) + parseInt(item.dayOfWeek), parseInt(item.periodMo - 1) + parseInt(item.periodNum), 0);
                                }
                            });
                        }
                    });
                },

                eventResize: function (courseCard, delta, revertFunc, jsEvent, ui, view) {
                    var arr = $scope.schedule.eventSources;
                    //更改课程卡的课节数
                    courseCard.periodNum = courseCard.periodNum + delta / 1000 / 60 / 60;

                    angular.forEach(arr, function (obj, num) {
                        if(obj.teachingClassId == courseCard.teachingClassId){
                            angular.forEach(obj, function (item, index) {
                                if (item._id == courseCard._id) {
                                    item.periodNum = courseCard.periodNum;
                                    console.log('更改为：连上' + courseCard.periodNum + '节');
                                    console.log('同步为：连上' + obj[index].periodNum + '节');
                                    item.start = new Date(y, m, parseInt(d) - parseInt(w) + parseInt(item.dayOfWeek), parseInt(item.periodMo - 1), 0);
                                    item.end = new Date(y, m, parseInt(d) - parseInt(w) + parseInt(item.dayOfWeek), parseInt(item.periodMo - 1) + parseInt(item.periodNum), 0);
                                }
                            });
                        }
                    });
                },

                eventRender: function (event, element, view) {
                    /*element.attr({
                     "uib-popover":event.title + ',' + event.classroom + ',' + event.remark,
                     "popover-trigger":"'mouseenter'",
                     "popover-placement":"left"
                     });*/
                    // console.log(event._id);

                    element.append(
                        '<div class="fc-menu" data-classId="' + event.teachingClassId + '" data-courseId="' + event._id + '">' +
                        '<i class="fa fa-trash-o fc-btn-del" ng-click="schedule.delCourseCard()"></i>' +
                        '<i class="fa fa-edit fc-btn-edit" ng-click="schedule.toEditCourse(' + event.teachingClassId + ',' + event._id + ',$event)"></i>' +
                        '</div>');
                    $compile(element)($scope);
                },
                eventMouseover: function (calEvent, jsEvent, view) {
                    // console.log(calEvent._id);
                    $scope.schedule.courseCard = calEvent;
                },
                eventMouseout: function (calEvent, jsEvent, view) {
                    // $scope.schedule.courseCard = null;
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
             * 用表单数据建立新的课程卡
             */
            addCourseCard: function () {
                var _this = this;
                // console.log(_this.eventSources);
                // console.log(_this.courseCardForm);
                var newObj = angular.copy(_this.courseCardForm);
                newObj.periodId = newObj.period.id;
                newObj.periodMo = newObj.period.no;
                newObj.periodNum = newObj.periodNu.no;
                newObj.startWeekId = newObj.startWeek.id;
                newObj.startWeekNo = newObj.startWeek.no;
                newObj.endWeekId = newObj.endWeek.id;
                newObj.endWeekNo = newObj.endWeek.no;
                newObj.teachingClassId = newObj.teachingClass.id;


                angular.forEach(_this.eventSources, function (group, num) {
                    // console.log(group.teachingClassId);
                    // console.log(newObj.teachingClassId);
                    if (group.teachingClassId == newObj.teachingClassId) {
                        //如果该教学班排课为空，需要先删除它在数组中的位置，再重新添加进去，否则event监听不起作用。
                        if(initNum == 0 && group.length ==0){
                            initNum++;
                            var arr = [];
                            arr.teachingClassId = group.teachingClassId;
                            arr.teachingClassName = group.teachingClassName;
                            arr.color = group.color;
                            _this.eventSources.splice(num, 1,arr);
                            // _this.eventSources.push(arr);
                            _this.renderSource(newObj, arr);
                        }else{
                            _this.renderSource(newObj, group);
                        }
                    }
                });
                // console.log(_this.eventSources);
            },

            /**
             * 从排课列表中删除课程卡
             */
            delCourseCard: function () {
                var _this = this;
                angular.forEach(_this.eventSources, function (group, num) {
                    if (group.teachingClassId == _this.courseCard.teachingClassId) {
                        angular.forEach(group, function (item, index) {
                            if (item._id == _this.courseCard._id) {
                                group.splice(index, 1);
                            }
                        })
                    }
                });
            },

            /**
             * 重新选择教学班后如果学期有变化就重新获取学周信息。
             */
            classChange: function (item) {
                // console.log(item);
                // item.teachingClassId = item.id;
                this.courseCardForm.teachingClassId = item.id;
                if (this.semesterId != item.semesterId) {
                    this.semesterId = item.semesterId;
                    this.getTeachWeek(item.semesterId);
                }
            },

            /**
             * 过滤结束学周选择范围
             * @param item
             */
            weekChange: function (item) {
                // console.log(item);
                var _this = this;
                var number = null;
                _this.teachWeekListB = angular.copy(_this.teachWeekList);
                if (!!item.startWeek) {
                    angular.forEach(_this.teachWeekList, function (souce, index) {
                        if (souce.no == item.startWeek.no) {
                            number = index;
                        }
                    });
                    number != 0 ? _this.teachWeekListB = _this.teachWeekListB.slice(number) : _this.teachWeekListB;
                    item.endWeek.no < item.startWeek.no && (item.endWeek = _this.teachWeekListB[0]);
                    item.startWeekId = item.startWeek.id;
                    item.startWeekNo = item.startWeek.no;
                    item.endWeekId = item.endWeek.id;
                    item.endWeekNo = item.endWeek.no;
                }
            },

            /**
             * 过滤课节选择范围
             * @param item
             */
            periodChange: function (item) {
                var _this = this;
                var number = null;
                _this.periodB = angular.copy(_this.period);
                if (!!item) {
                    angular.forEach(_this.period, function (souce, index) {
                        if (souce.no == item.period.no) {
                            number = index;
                        }
                    });
                    // console.log(number);
                    number != 0 ? _this.periodB = _this.periodB.slice(0, -number) : _this.periodB;
                    if (_this.periodB.length && _this.periodB[_this.periodB.length - 1].no < _this.courseCardForm.periodNu.no) {
                        _this.courseCardForm.periodNu = _this.periodB[0];
                    }

                    item.periodId = item.period.id;
                    item.periodMo = item.period.no;
                    item.periodNum = item.periodNu.no;
                }
            },

            /**
             * 重构课程卡数据
             * @param obj
             * @param arr
             */
            renderSource: function (obj, arr) {
                arr.color && (obj.color = arr.color);
                !obj.periodMo && (obj.periodMo = 1);
                !obj.periodNum && (obj.periodNum = 1);

                if (!obj._id) {
                    obj._id = eventSerialId++;
                }
                obj.title = '第' + parseInt(obj.startWeekNo) + '-' + parseInt(obj.endWeekNo) + '学周';

                //将课程卡参数换算成当日时间相对应周几的时间戳，起始时间和结束时间都已课节为单位。
                obj.start = new Date(y, m, parseInt(d) - parseInt(w) + parseInt(obj.dayOfWeek), parseInt(obj.periodMo - 1), 0);
                obj.end = new Date(y, m, parseInt(d) - parseInt(w) + parseInt(obj.dayOfWeek), parseInt(obj.periodMo - 1) + parseInt(obj.periodNum), 0);
                arr.push(obj);
                // console.log(arr);
            },

            /**
             * 获取学周数据
             */
            getTeachWeek: function (semesterId) {
                var _this = this;
                var params = {
                    semesterId: semesterId,
                    pageSize:40,
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
                        // console.log(_this.courseCardForm);
                    })
                    .catch(function (error) {

                    })
            },


            /**
             * 清除课程表视图上所有数据
             */
            removeAllCourseCard: function () {
                angular.forEach(this.eventSources,function(group,index){
                    group.splice(0, group.length);
                });
            },

            /**
             * 打开课程卡编辑页面，并回填该课程卡数据到表单。
             * @param classId
             * @param courseId
             * @param jsEvent
             */
            toEditCourse: function (classId, courseId, jsEvent) {
                var _this = this;
                angular.forEach(_this.teachWeekListA, function (item, index) {
                    if (item.no == _this.courseCard.startWeekNo) {
                        _this.courseCard.startWeek = _this.teachWeekListA[index];
                    }
                });
                _this.teachWeekListB = angular.copy(_this.teachWeekList);
                _this.courseCard.endWeekNo != 1 ? _this.teachWeekListB = _this.teachWeekListB  : _this.teachWeekListB;
                _this.courseCard.endWeek = _this.teachWeekListB[0];
                ngDialog.open({
                    template: 'app/module/agenda/editCourseCard.html',
                    showClose: false,
                    width: 600,
                    scope: $scope
                });
            },

            /**
             * 修改课程卡信息
             */
            updateCourseCard: function () {
                var _this = this;
                angular.forEach(_this.eventSources, function (timePeriod, num) {

                    if (timePeriod.teachingClassId == _this.courseCard.teachingClassId) {
                        angular.forEach(timePeriod, function (item, index) {

                            if (item._id === _this.courseCard._id) {
                                item.classroom = _this.courseCard.classroom;
                                item.startWeekId = _this.courseCard.startWeek.id;
                                item.startWeekNo = _this.courseCard.startWeek.no;
                                item.endWeekId = _this.courseCard.endWeek.id;
                                item.endWeekNo = _this.courseCard.endWeek.no;
                                item.singleOrDouble = _this.courseCard.singleOrDouble;
                                item.remark = _this.courseCard.remark;
                                item.title = '第' + parseInt(item.startWeekNo) + '-' + parseInt(item.endWeekNo) + '学周';

                            }
                        });
                    }

                });
                // console.log(_this.timePeriod);
            },
            /**
             * 保存排课数据到api
             */
            saveCourseSchedules: function () {
                var _this = this;
                var arr = [];
                angular.forEach(_this.eventSources,function(item,index){
                    // console.log(item);
                    var obj = {};
                    obj.teachingClassId = item.teachingClassId;
                    obj.userId = $scope.user.id;
                    obj.timePeriod = item;
                    arr.push(obj);
                });
                // console.log(arr);
                TeachClassService.saveCourseSchedules(arr).$promise
                    .then(function (data) {
                        messageService.openMsg("保存成功")
                    })
                    .catch(function (error) {

                    })
            },

            /**
             * 从api获取多个教学班排课数据
             */
            getCourseSchedules: function ( ids) {
                // console.log(ids);
                var _this = this;
                var params = {teachingClassIds:ids};
                TeachClassService.getCourseSchedules(params).$promise
                    .then(function (data) {
                        angular.forEach(data, function (obj, index) {
                            var arr = [];
                            if(obj.timePeriod.length > 0){
                                initNum++;
                                angular.forEach(obj.timePeriod, function (item, num) {
                                    item.teachingClassId = obj.teachingClassId;
                                    item.color = _this.groupColors[index];
                                    arr.teachingClassId = obj.teachingClassId;
                                    arr.teachingClassName = obj.teachingClassName;
                                    arr.color = _this.groupColors[index];
                                    _this.renderSource(item, arr);
                                });
                            }else{
                                // console.log(obj.teachingClassId);
                                arr.teachingClassId = obj.teachingClassId;
                                arr.teachingClassName = obj.teachingClassName;
                                arr.color = _this.groupColors[index];
                            }
                            _this.eventSources.push(arr);

                        });
                        // console.log(_this.eventSources);
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
                _this.eventSources = [];
                //单教学班排课
                var newArr = [];
                if (!!$state.params.id) {
                    _this.bulk = true;
                    _this.teachClasses = [{
                        id: $state.params.id,
                        name: $state.params.name,
                        semesterId: $state.params.semesterId
                    }];
                    angular.forEach(_this.teachClasses,function(item,index){
                        newArr.push(item.id);
                    });
                    _this.getCourseSchedules(newArr);
                }
                //多教学班批量排课，获取批量排课的教学班id,默认初始化第一个
                if (!!$state.params.ids) {
                    _this.bulk = false;
                    _this.teachClasses = angular.fromJson($state.params.ids);
                    angular.forEach(_this.teachClasses,function(item,index){
                        newArr.push(item.id);
                    });
                    _this.getCourseSchedules(newArr);
                }
                _this.courseCardForm.teachingClass = _this.teachClasses[0];
                _this.semesterId = _this.teachClasses[0].semesterId;
                _this.getTeachWeek(_this.teachClasses[0].semesterId);
                console.log(_this.bulk);
            }
        };
        $scope.schedule.init();


    });
