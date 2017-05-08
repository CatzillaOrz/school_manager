/*
 *  Created by Secmax on 2017/5/8.
 *  AngularJs Course Schedule for the JQuery FullCalendar
 *  API @ todo
 *
 *  可视化排课插件，可以自由添加课程到课程表内，并且可以拖拽课程卡以编辑该课程的课节时长以及重新编排上课日期、上课地点、备注信息等。
 *  可以设置课程是只上单周还是只上双周。
 *  编排好的课程表输出为一个数组对象。
 *
 */

angular.module('courseSchedule', [])

    .constant('csCalendarConfig', {
        calendars: {}

    })
    .controller('csCalendarCtrl', ['$scope', '$locale',
        function ($scope, $locale) {

            var sources = $scope.eventSources;
            var extraEventSignature = $scope.calendarWatchEvent ? $scope.calendarWatchEvent : angular.noop;

            var wrapFunctionWithScopeApply = function (functionToWrap) {
                return function () {
                    if ($scope.$root.$$phase) {
                        return functionToWrap.apply(this, arguments);
                    }

                    var args = arguments;
                    var that = this;
                    return $scope.$root.$apply(
                        function () {
                            return functionToWrap.apply(that, args);
                        }
                    );
                };
            };

            var eventSerialId = 1;
            /**
             * 事件对象及其属性的记录
             * @param e
             * @return {string}
             */
            this.eventFingerprint = function (e) {
                if (!e._id) {
                    e._id = eventSerialId++;
                }

                var extraSignature = extraEventSignature({
                        event: e
                    }) || '';
                var start = moment.isMoment(e.start) ? e.start.unix() : (e.start ? moment(e.start).unix() : '');
                var end = moment.isMoment(e.end) ? e.end.unix() : (e.end ? moment(e.end).unix() : '');
                var singleOrDouble = e.singleOrDouble;
                var classroom = e.classroom;
                var remark = e.remark;

                // This extracts all the information we need from the event. http://jsperf.com/angular-calendar-events-fingerprint/3
                return [e._id, e.id || '', e.title || '', e.url || '', start, end, remark, singleOrDouble, classroom, e.allDay || '', e.className || '', extraSignature].join('');
            };

            var sourceSerialId = 1;
            var sourceEventsSerialId = 1;
            /**
             * 源对象及其事件数组的记录
             * @param source
             * @return {string}
             */
            this.sourceFingerprint = function (source) {
                var fp = '' + (source.__id || (source.__id = sourceSerialId++));
                var events = angular.isObject(source) && source.events;

                if (events) {
                    fp = fp + '-' + (events.__id || (events.__id = sourceEventsSerialId++));
                }
                return fp;
            };

            /**
             * 来自所有来源的所有事件
             * @return {Array}
             */
            this.allEvents = function () {
                return Array.prototype.concat.apply(
                    [],
                    (sources || []).reduce(
                        function (previous, source) {
                            if (angular.isArray(source)) {
                                previous.push(source);
                            } else if (angular.isObject(source) && angular.isArray(source.events)) {
                                var extEvent = Object.keys(source).filter(
                                    function (key) {
                                        return (key !== '_id' && key !== 'events');
                                    }
                                );

                                source.events.forEach(
                                    function (event) {
                                        angular.extend(event, extEvent);
                                    }
                                );

                                previous.push(source.events);
                            }
                            return previous;
                        },
                        []
                    )
                );
            };

            /**
             * 跟踪对象数组的变化，将id标记分配给每个元素，并观察令牌的作用域
             * @param arraySource {Array|Function} 监测arraysource数组对象
             * @param tokenFn {Function} 返回给定对象的令牌
             * @return {{subscribe: subscribe, onAdded: angular.noop, onChanged: angular.noop, onRemoved: angular.noop}|*}
             * subscribe: function(scope, function(newTokens, oldTokens))
             * 当源更改时调用。
             * onAdded/Removed/Changed:
             * 当设置为回调时，调用每个检测到相应变化的项
             */
            this.changeWatcher = function (arraySource, tokenFn) {
                var self;

                var getTokens = function () {
                    return ((angular.isFunction(arraySource) ? arraySource() : arraySource) || []).reduce(
                        function (rslt, el) {
                            var token = tokenFn(el);
                            map[token] = el;
                            rslt.push(token);
                            return rslt;
                        },
                        []
                    );
                };

                /**
                 * 元素分类归属
                 * @param a
                 * @param b
                 * @return {Array.<T>}
                 * @example  subtractAsSets([6, 100, 4, 5], [4, 5, 7]) // [6, 100]
                 */
                var subtractAsSets = function (a, b) {
                    var obj = (b || []).reduce(
                        function (rslt, val) {
                            rslt[val] = true;
                            return rslt;
                        },
                        Object.create(null)
                    );
                    return (a || []).filter(
                        function (val) {
                            return !obj[val];
                        }
                    );
                };

                // 映射对象到令牌，反之亦然
                var map = {};

                /**
                 * 分别为每个受影响的事件比较newtokens到oldtokens叫onadded，onremoved，和onchanged处理程序。
                 * @param newTokens
                 * @param oldTokens
                 */
                var applyChanges = function (newTokens, oldTokens) {
                    var i;
                    var token;
                    var replacedTokens = {};
                    var removedTokens = subtractAsSets(oldTokens, newTokens);
                    for (i = 0; i < removedTokens.length; i++) {
                        var removedToken = removedTokens[i];
                        var el = map[removedToken];
                        delete map[removedToken];
                        var newToken = tokenFn(el);
                        // 如果该元素没有被移除，但仅仅得到一个新的令牌，它的旧令牌将与当前的令牌不同。
                        if (newToken === removedToken) {
                            self.onRemoved(el);
                        } else {
                            replacedTokens[newToken] = removedToken;
                            self.onChanged(el);
                        }
                    }

                    var addedTokens = subtractAsSets(newTokens, oldTokens);
                    for (i = 0; i < addedTokens.length; i++) {
                        token = addedTokens[i];
                        if (!replacedTokens[token]) {
                            self.onAdded(map[token]);
                        }
                    }
                };

                self = {
                    subscribe: function (scope, onArrayChanged) {
                        scope.$watch(getTokens, function (newTokens, oldTokens) {
                            var notify = !(onArrayChanged && onArrayChanged(newTokens, oldTokens) === false);
                            if (notify) {
                                applyChanges(newTokens, oldTokens);
                            }
                        }, true);
                    },
                    onAdded: angular.noop,
                    onChanged: angular.noop,
                    onRemoved: angular.noop
                };
                return self;
            };

            this.getFullCalendarConfig = function (calendarSettings, csCalendarConfig) {
                var config = {};

                angular.extend(config, csCalendarConfig);
                angular.extend(config, calendarSettings);

                angular.forEach(config, function (value, key) {
                    if (typeof value === 'function') {
                        config[key] = wrapFunctionWithScopeApply(config[key]);
                    }
                });

                return config;
            };

            this.getLocaleConfig = function (fullCalendarConfig) {
                if (!fullCalendarConfig.lang || fullCalendarConfig.useNgLocale) {
                    // 默认配置使用本地名称
                    var tValues = function (data) {
                        // 转换 {0: "Jan", 1: "Feb", ...} to ["Jan", "Feb", ...]
                        return (Object.keys(data) || []).reduce(
                            function (rslt, el) {
                                rslt.push(data[el]);
                                return rslt;
                            },
                            []
                        );
                    };

                    var dtf = $locale.DATETIME_FORMATS;
                    return {
                        monthNames: tValues(dtf.MONTH),
                        monthNamesShort: tValues(dtf.SHORTMONTH),
                        dayNames: tValues(dtf.DAY),
                        dayNamesShort: tValues(dtf.SHORTDAY)
                    };
                }

                return {};
            };
        }
    ])
    .directive('csCalendar', ['csCalendarConfig',
            function (csCalendarConfig) {

                return {
                    restrict: 'A',
                    scope: {
                        period: '=',
                        eventSources: '=ngModel',
                        calendarWatchEvent: '&'
                    },
                    controller: 'csCalendarCtrl',
                    link: function (scope, elm, attrs, controller) {
                        var sources = scope.eventSources;
                        var sourcesChanged = false;
                        var calendar;
                        var eventSourcesWatcher = controller.changeWatcher(sources, controller.sourceFingerprint);
                        var eventsWatcher = controller.changeWatcher(controller.allEvents, controller.eventFingerprint);
                        var options = null;

                        var FC, Grid, TimeGrid, View, isInt, htmlEscape, cssToStr, divideDurationByDuration;

                        FC = $.fullCalendar;
                        View = FC.View;
                        Grid = FC.Grid;
                        htmlEscape = FC.htmlEscape;
                        TimeGrid = FC.TimeGrid;
                        cssToStr = FC.cssToStr;
                        isInt = FC.isInt;
                        divideDurationByDuration = FC.divideDurationByDuration;

                        // TimeGrid.prototype扩展
                        TimeGrid.mixin({
                            constructor: function () {
                                //调用super-constructor函数
                                Grid.apply(this, arguments);
                                //调用参数解析函数
                                this.processOptions();
                            },
                            /**
                             * 重构日程表DOM渲染
                             * @return {string}
                             */
                            renderHtml: function () {
                                return '' +
                                    '<div class="fc-bg">' +
                                    '<table>' +
                                    this.renderBgTrHtml(0) +
                                    '</table>' +
                                    '</div>' +
                                    '<div class="fc-slats">' +
                                    '<table>' +
                                    this.renderSlatRowHtml() +
                                    '</table>' +
                                    '</div>';
                            },
                            /**
                             * 重构y系坐标时间线及DOM
                             * @return {string}
                             */
                            renderSlatRowHtml: function () {
                                var view = this.view;
                                var isRTL = this.isRTL;
                                var html = '';
                                var slotTime = moment.duration(+this.minTime);
                                var slotDate;
                                var isLabeled;
                                var axisHtml;
                                // 计算每个时隙的时间
                                while (slotTime < this.maxTime) {
                                    slotDate = this.start.clone().time(slotTime);
                                    var label = parseInt(slotDate.format(this.labelFormat).split(':')[0]) + 1;
                                    console.log(label);
                                    isLabeled = isInt(divideDurationByDuration(slotTime, this.labelInterval));

                                    axisHtml =
                                        '<td class="fc-axis fc-time ' + view.widgetContentClass + '" ' + view.axisStyleAttr() + '>' +
                                        (isLabeled ?
                                            '<span>' +
                                            htmlEscape('第' + label + '节课') +
                                            '</span>' :
                                                ''
                                        ) +
                                        '</td>';

                                    html +=
                                        '<tr data-time="' + slotDate.format('HH:mm:ss') + '"' +
                                        (isLabeled ? '' : ' class="fc-minor"') +
                                        '>' +
                                        (!isRTL ? axisHtml : '') +
                                        '<td class="' + view.widgetContentClass + '"/>' +
                                        (isRTL ? axisHtml : '') +
                                        "</tr>";

                                    slotTime.add(this.slotDuration);
                                }

                                return html;
                            },

                            /**
                             * 生成课程卡的HTML样式名称
                             * @param seg 课程卡对象
                             * @param isDraggable 布尔
                             * @param isResizable 布尔
                             * @param isSingle 布尔
                             * @param isDouble 布尔
                             * @return {Array.<*>}
                             */
                            getSegClasses: function (seg, isDraggable, isResizable, isSingle, isDouble) {
                                var view = this.view;
                                var event = seg.event;
                                var classes = [
                                    'fc-event',
                                    seg.isStart ? 'fc-start' : 'fc-not-start',
                                    seg.isEnd ? 'fc-end' : 'fc-not-end'
                                ].concat(
                                    event.className,
                                    event.source ? event.source.className : []
                                );

                                if (isDraggable) {
                                    classes.push('fc-draggable');
                                }
                                if (isResizable) {
                                    classes.push('fc-resizable');
                                }
                                if (isSingle) {
                                    classes.push('fc-single');
                                }
                                if (isDouble) {
                                    classes.push('fc-double');
                                }

                                //课程卡被选中时，附上一个样式名.
                                if (view.isEventSelected(event)) {
                                    classes.push('fc-selected');
                                }

                                return classes;
                            },
                            /**
                             * 渲染课程卡
                             * @param seg
                             * @param disableResizing
                             * @return {string}
                             */
                            fgSegHtml: function (seg, disableResizing) {
                                var view = this.view;
                                var event = seg.event;
                                var isDraggable = view.isEventDraggable(event);
                                var isSingle = event.singleOrDouble == 20;
                                var isDouble = event.singleOrDouble == 30;
                                var isResizableFromStart = !disableResizing && seg.isStart && view.isEventResizableFromStart(event);
                                var isResizableFromEnd = !disableResizing && seg.isEnd && view.isEventResizableFromEnd(event);
                                var classes = this.getSegClasses(seg, isDraggable, isResizableFromStart || isResizableFromEnd, isSingle, isDouble);
                                var skinCss = cssToStr(this.getSegSkinCss(seg));
                                //TODO课节时间的显示
                                var timeText;
                                var fullTimeText;
                                var startTimeText; //

                                classes.unshift('fc-time-grid-event', 'fc-v-event');

                                if (view.isMultiDayEvent(event)) {
                                    if (seg.isStart || seg.isEnd) {
                                        timeText = this.getEventTimeText(seg);
                                        fullTimeText = this.getEventTimeText(seg, 'LT');
                                        startTimeText = this.getEventTimeText(seg, null, false);
                                    }
                                } else {
                                    timeText = this.getEventTimeText(event);
                                    fullTimeText = this.getEventTimeText(event, 'LT');
                                    startTimeText = this.getEventTimeText(event, null, false);
                                }

                                return '<a class="' + classes.join(' ') + '"' +
                                    (event.url ?
                                        ' href="' + htmlEscape(event.url) + '"' :
                                            ''
                                    ) +
                                    (skinCss ?
                                        ' style="' + skinCss + '"' :
                                            ''
                                    ) +
                                    '>' +
                                    '<div class="fc-content">' +
                                    (timeText ?
                                        '<div class="fc-time"' +
                                        ' data-start="' + htmlEscape(startTimeText) + '"' +
                                        ' data-full="' + htmlEscape(fullTimeText) + '"' +
                                        '>' +
                                        '<span>' + htmlEscape(timeText) + '</span>' +
                                        '</div>' :
                                            ''
                                    ) +
                                    (event.title ?
                                        '<div class="fc-title">' +
                                        htmlEscape(event.title) +
                                        '</div>' :
                                            ''
                                    ) +
                                    (isSingle ?
                                        '<div class="fa-sd-class fc-single-class">' +
                                        htmlEscape('单周上课') +
                                        '</div>' :
                                            ''
                                    ) +
                                    (isDouble ?
                                        '<div class="fa-sd-class fc-double-class">' +
                                        htmlEscape('双周上课') +
                                        '</div>' :
                                            ''
                                    ) +
                                    (event.classroom ?
                                        '<div class="fc-classroom">' +
                                        htmlEscape(event.classroom) +
                                        '</div>' :
                                            ''
                                    ) +
                                    (event.remark ?
                                        '<div class="fc-remark">' +
                                        htmlEscape(event.remark) +
                                        '</div>' :
                                            ''
                                    ) +
                                    '</div>' +
                                    '<div class="fc-bg"/>' +
                                    (isResizableFromEnd ?
                                            '<div class="fc-resizer fc-end-resizer" />' :
                                            ''
                                    ) +
                                    '</a>';
                            }

                        });

                        function getOptions() {
                            var calendarSettings = attrs.csCalendar ? scope.$parent.$eval(attrs.csCalendar) : {};
                            var fullCalendarConfig = controller.getFullCalendarConfig(calendarSettings, csCalendarConfig);
                            var localeFullCalendarConfig = controller.getLocaleConfig(fullCalendarConfig);
                            angular.extend(localeFullCalendarConfig, fullCalendarConfig);
                            options = {
                                eventSources: sources
                            };
                            angular.extend(options, localeFullCalendarConfig);
                            //从选项中删除日历
                            options.calendars = null;

                            var options2 = {};
                            for (var o in options) {
                                if (o !== 'eventSources') {
                                    options2[o] = options[o];
                                }
                            }
                            return JSON.stringify(options2);
                        }

                        scope.destroyCalendar = function () {
                            if (calendar && calendar.fullCalendar) {
                                calendar.fullCalendar('destroy');
                            }
                            if (attrs.calendar) {
                                calendar = csCalendarConfig.calendars[attrs.calendar] = angular.element(elm).html('');
                            } else {
                                calendar = angular.element(elm).html('');
                            }
                        };

                        scope.initCalendar = function () {
                            if (!calendar) {
                                calendar = angular.element(elm).html('');
                            }
                            calendar.fullCalendar(options);
                            console.log(calendar);
                            console.log(View);
                            if (attrs.calendar) {
                                csCalendarConfig.calendars[attrs.calendar] = calendar;
                            }
                        };

                        scope.$on('$destroy', function () {
                            scope.destroyCalendar();
                        });

                        eventSourcesWatcher.onAdded = function (source) {
                            if (calendar && calendar.fullCalendar) {
                                calendar.fullCalendar(options);
                                if (attrs.calendar) {
                                    csCalendarConfig.calendars[attrs.calendar] = calendar;
                                }
                                calendar.fullCalendar('addEventSource', source);
                                sourcesChanged = true;
                            }
                        };

                        eventSourcesWatcher.onRemoved = function (source) {
                            if (calendar && calendar.fullCalendar) {
                                calendar.fullCalendar('removeEventSource', source);
                                sourcesChanged = true;
                            }
                        };

                        eventSourcesWatcher.onChanged = function () {
                            if (calendar && calendar.fullCalendar) {
                                calendar.fullCalendar('refetchEvents');
                                sourcesChanged = true;
                            }
                        };

                        eventsWatcher.onAdded = function (event) {
                            if (calendar && calendar.fullCalendar) {
                                calendar.fullCalendar('renderEvent', event, !!event.stick);
                            }
                        };

                        eventsWatcher.onRemoved = function (event) {
                            if (calendar && calendar.fullCalendar) {
                                calendar.fullCalendar('removeEvents', event._id);
                            }
                        };

                        eventsWatcher.onChanged = function (event) {
                            if (calendar && calendar.fullCalendar) {
                                var clientEvents = calendar.fullCalendar('clientEvents', event._id);
                                for (var i = 0; i < clientEvents.length; i++) {
                                    var clientEvent = clientEvents[i];
                                    clientEvent = angular.extend(clientEvent, event);
                                    calendar.fullCalendar('updateEvent', clientEvent);
                                }
                            }
                        };

                        eventSourcesWatcher.subscribe(scope);
                        eventsWatcher.subscribe(scope, function () {
                            if (sourcesChanged === true) {
                                sourcesChanged = false;
                                return false;
                            }
                        });

                        scope.$watch(getOptions, function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                scope.destroyCalendar();
                                scope.initCalendar();
                            } else if ((newValue && angular.isUndefined(calendar))) {
                                scope.initCalendar();
                            }
                        });
                    }
                };
            }
        ]
    );
