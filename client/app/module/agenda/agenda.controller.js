'use strict';

angular.module('dleduWebApp')
    .controller('AgendaCtrl', function ($scope, $state, $document, AuthService, SchoolYearService, ngDialog, $compile, messageService, csCalendarConfig, TeachClassService) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var w = date.getDay();

        var tempData = [
            {"teachingClassId":11,"teachingClassName":"安卓A4班","timePeriod":[{"dayOfWeek":1,"periodId":16,"periodMo":1,"periodNum":1,"startWeekId":88,"endWeekId":97,"startWeekNo":1,"endWeekNo":10,"singleOrDouble":10,"classroom":"","remark":"","color":null},{"dayOfWeek":3,"periodId":16,"periodMo":1,"periodNum":1,"startWeekId":94,"endWeekId":106,"startWeekNo":7,"endWeekNo":19,"singleOrDouble":10,"classroom":"","remark":"","color":null},{"dayOfWeek":5,"periodId":20,"periodMo":5,"periodNum":1,"startWeekId":88,"endWeekId":101,"startWeekNo":1,"endWeekNo":14,"singleOrDouble":10,"classroom":"","remark":"","color":null},{"dayOfWeek":5,"periodId":18,"periodMo":3,"periodNum":1,"startWeekId":88,"endWeekId":103,"startWeekNo":1,"endWeekNo":16,"singleOrDouble":30,"classroom":"","remark":"","color":null}],"userId":null},
            {"teachingClassId":10,"teachingClassName":"2017第二学期Java开发班","timePeriod":[{"dayOfWeek":1,"periodId":16,"periodMo":1,"periodNum":2,"startWeekId":88,"endWeekId":107,"startWeekNo":1,"endWeekNo":20,"singleOrDouble":10,"classroom":"5#402","remark":"","color":null},{"dayOfWeek":6,"periodId":16,"periodMo":1,"periodNum":1,"startWeekId":92,"endWeekId":96,"startWeekNo":5,"endWeekNo":9,"singleOrDouble":20,"classroom":"","remark":"","color":null}],"userId":null}
        ];

        $scope.schedule = {
            period: [
                {
                    "startTime": "00:00",
                    "endTime": "24:00"
                }
            ],
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
            bulk:true,
            //批量排课用的教学班课程颜色组
            groupColors:['#739E73','#6E587A','#CDE0C4','#44565C'],
            //排课日程参数设置
            scheduleConfig: {

                eventClick: function (courseCard, jsEvent, view) {
                    // $scope.schedule.toEditCourse(courseCard, jsEvent, view);

                    var _this = $scope.schedule;
                    console.log(_this.timePeriod);
                },

                eventDrop: function (courseCard, delta, revertFunc, jsEvent, ui, view) {
                    //拖动课程卡时，周的换算与课节的调整换算
                    var arr = $scope.schedule.timePeriod;
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
                    courseCard.periodMo = courseCard.periodMo + remainder;
                    courseCard.dayOfWeek = courseCard.dayOfWeek + divisor;
                    angular.forEach(period, function (item, index) {
                        if (courseCard.periodMo == item.no) {
                            courseCard.periodId = item.id;
                        }
                    });
                    angular.forEach(arr, function (item, index) {
                        if (item._id == courseCard._id) {
                            item.periodMo = courseCard.periodMo;
                            item.periodId = courseCard.periodId;
                            item.dayOfWeek = courseCard.dayOfWeek;
                            console.log('更改为：周' + courseCard.dayOfWeek + '第' + parseInt(courseCard.periodMo) + '节上课');
                            console.log('同步为：周' + arr[index].dayOfWeek + '第' + parseInt(arr[index].periodMo) + '节上课');
                        }
                    });
                },

                eventResize: function (courseCard, delta, revertFunc, jsEvent, ui, view) {
                    var arr = $scope.schedule.timePeriod;
                    //更改课程卡的课节数
                    courseCard.periodNum = courseCard.periodNum + delta / 1000 / 60 / 60;

                    angular.forEach(arr, function (item, index) {
                        if (item._id == courseCard._id) {
                            item.periodNum = courseCard.periodNum;
                            console.log('更改为：连上' + courseCard.periodNum + '节');
                            console.log('同步为：连上' + arr[index].periodNum + '节');
                        }
                    });
                },

                eventRender: function (event, element, view) {
                    /*element.attr({
                     "uib-popover":event.title + ',' + event.classroom + ',' + event.remark,
                     "popover-trigger":"'mouseenter'",
                     "popover-placement":"left"
                     });*/
                    // console.log(event);
                    element.append(
                        '<div class="fc-menu">' +
                        '<i class="fa fa-trash-o fc-btn-del" ng-click="schedule.delCourseCard()"></i>' +
                        '<i class="fa fa-edit fc-btn-edit" ng-click="schedule.toEditCourse($event)"></i>' +
                        '</div>');
                    $compile(element)($scope);
                },
                eventMouseover: function (calEvent, jsEvent, view) {
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
                console.log(this.courseCardForm);
                var newObj = angular.copy(this.courseCardForm);
                newObj.periodId = newObj.period.id;
                newObj.periodMo = newObj.period.no;
                newObj.periodNum = newObj.periodNu.no;
                newObj.startWeekId = newObj.startWeek.id;
                newObj.startWeekNo = newObj.startWeek.no;
                newObj.endWeekId = newObj.endWeek.id;
                newObj.endWeekNo = newObj.endWeek.no;

                this.renderSource(newObj,this.timePeriod);
            },

            /**
             * 从排课列表中删除课程卡
             */
            delCourseCard:function(){
                var _this = this;
                console.log(_this.courseCard._id);
                console.log(_this.timePeriod);
                angular.forEach(_this.timePeriod,function(item,index){
                    if(item._id == _this.courseCard._id){
                        _this.timePeriod.splice(index,1);
                    }
                })

            },

            /**
             * 重新选择教学班后调取教学班学期信息
             */
            classChange:function(item){
                this.getTeachClassInfo(item.id)
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
                        if (souce.no == item.no) {
                            number = index;
                        }
                    });
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
            renderSource: function (obj,arr) {
                var _this = this;
                !obj.periodMo && (obj.periodMo = 1);
                !obj.periodNum && (obj.periodNum = 1);

                obj.title = '第' + parseInt(obj.startWeekNo) + '-' + parseInt(obj.endWeekNo) + '学周';

                //将课程卡参数换算成当日时间相对应周几的时间戳，起始时间和结束时间都已课节为单位。
                obj.start = new Date(y, m, d - w + parseInt(obj.dayOfWeek), parseInt(obj.periodMo - 1), 0);
                obj.end = new Date(y, m, d - w + parseInt(obj.dayOfWeek), parseInt(obj.periodMo - 1) + parseInt(obj.periodNum), 0);
                arr.push(obj);
                // console.log(obj);
            },

            /**
             * 获取学周数据
             */
            getTeachWeek: function (semesterId) {
                var _this = this;
                var params = {
                    semesterId: semesterId
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


                        _this.getTeachWeek(_this.teachingClass.semesterId);
                        _this.bulk && _this.getCourseSchedule(_this.teachingClass.teachingClassId);
                        !_this.bulk && _this.getCourseSchedules();
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
             * 打开课程卡编辑页面，并回填该课程卡数据到表单。
             * @param jsEvent
             */
            toEditCourse:function(jsEvent){
                var _this = this;
                console.log(jsEvent);
                console.log(_this.courseCard);
                angular.forEach(_this.teachWeekListA, function (item, index) {
                    if (item.no == _this.courseCard.startWeekNo) {
                        _this.courseCard.startWeek = _this.teachWeekListA[index];
                    }
                });
                _this.teachWeekListB = angular.copy(_this.teachWeekList);
                _this.courseCard.endWeekNo != 1 ? _this.teachWeekListB = _this.teachWeekListB.slice(_this.courseCard.endWeekNo - 1) : _this.teachWeekListB;
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
                console.log(_this.courseCard);
                angular.forEach(_this.timePeriod, function (item, index) {
                    if (item._id == _this.courseCard._id) {
                        item.classroom = _this.courseCard.classroom;
                        item.startWeekId = _this.courseCard.startWeek.id;
                        item.startWeekNo = _this.courseCard.startWeek.no;
                        item.endWeekId = _this.courseCard.endWeek.id;
                        item.endWeekNo = _this.courseCard.endWeek.no;
                        item.singleOrDouble = _this.courseCard.singleOrDouble;
                        item.remark = _this.courseCard.remark;
                        item.title = '第' + parseInt(item.startWeekNo) + '-' + parseInt(item.endWeekNo) + '学周';

                        //将课程卡参数换算成当日时间相对应周几的时间戳，起始时间和结束时间都已课节为单位。
                        item.start = new Date(y, m, d - w + parseInt(item.dayOfWeek), parseInt(item.periodMo - 1), 0);
                        item.end = new Date(y, m, d - w + parseInt(item.dayOfWeek), parseInt(item.periodMo - 1) + parseInt(item.periodNum), 0);
                    }
                });
                // console.log(_this.timePeriod);
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

            /**
             * 从api获取该教学班排课数据
             */
            getCourseSchedule: function (teachingClassId) {
                var _this = this;
                var params = {
                    teachingClassId: teachingClassId
                };
                TeachClassService.getCourseSchedule(params).$promise
                    .then(function (data) {
                        _this.teachingClass.timePeriod = data.timePeriod || [];
                        angular.forEach(_this.teachingClass.timePeriod, function (obj, index) {
                            _this.renderSource(obj,_this.timePeriod);
                        });
                    })
                    .catch(function (error) {

                    })
            },


            /**
             * 从api获取多个教学班排课数据
             * todo 对接api并测试渲染后的数据
             */
            getCourseSchedules:function(){
                var _this = this;
                var params = {};

                console.log(tempData);

                //todo 获取接口数据替换临时数据
                angular.forEach(tempData, function (obj, index) {
                    var arr=[];
                    angular.forEach(obj.timePeriod, function (item,num) {
                        item.__id = obj.teachingClassId;
                        item.color = _this.groupColors[index];

                        console.log(item);
                        _this.renderSource(item,arr);
                    });
                    _this.eventSources.push(arr);
                });

            },
            /**
             * 页面初始化
             */
            init: function () {
                var _this = this;

                $scope.user = AuthService.getUser();
                _this.getPeriod();

                //单教学班排课
                if (!!$state.params.id) {
                    _this.bulk = true;
                    console.log($state.params.id);
                    _this.teachClasses = [{id:$state.params.id,name:$state.params.name}];
                    _this.teachingClass = {id:$state.params.id};
                    _this.getTeachClassInfo($state.params.id);

                    angular.forEach(_this.timePeriod, function (obj, index) {
                        _this.renderSource(obj,_this.timePeriod);
                    });

                    console.log(_this.timePeriod);
                    _this.eventSources = [_this.timePeriod];
                }
                //多教学班批量排课，获取批量排课的教学班id,默认初始化第一个
                if (!!$state.params.ids) {
                    _this.bulk = false;
                    _this.teachClasses = angular.fromJson($state.params.ids);
                    _this.teachingClass = _this.teachClasses[0];
                    _this.getTeachClassInfo(_this.teachClasses[0].id);

                    _this.eventSources = [];
                }

            }
        };
        $scope.schedule.init();


    });
