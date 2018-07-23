/**
 * Created by Administrator on 2017/6/22.
 * 实践计划管理
 */
angular.module('dleduWebApp')
    .controller('TeachingSummaryCtrl', function ($scope, $state, AuthService, messageService, CollegeService, CommonService, Select2LoadOptionsService, ClassService,
        StatisticsService) {



        $scope.summaryFn = {
            portalUrl: $state.current.name, //当前路由
            portalGun: { //传送门
                teachingSummary: '$scope.summaryFn.teachingSummary',
                studentAttending: '$scope.summaryFn.studentAttending',
                studentActive: '$scope.summaryFn.studentActive',
                stuProcess: '$scope.summaryFn.stuProcess',
                stuJournal: '$scope.summaryFn.stuJournal',
                impartProcess: '$scope.summaryFn.impartProcess',
                stuRoutineCount: '$scope.summaryFn.stuRoutineCount',
                stuRoutineDetail: '$scope.summaryFn.stuRoutineDetail',
                enterpriseDetail: '$scope.summaryFn.enterpriseDetail',
                taskDetail: '$scope.summaryFn.taskDetail',
                stuReport: '$scope.summaryFn.stuReport',
                stuScore: '$scope.summaryFn.stuScore'
            },
            user: AuthService.getUser(),
            page: {
                totalElements: 0,
                pageNumber: 1,
                pageSize: 10,
            },
            weekTaskList: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            params: {
                keyWords: '',
                stuName: "",
                // sortField: 'TOTAL_SCORE',
                // sortFlag: 'desc',
                collegeId: '',
                professionalId: '',
                classId: "",
                masterName: "",
                enterpriseName: '',
                teachingYear: "",
                groupId: '',
                stuId: ''
            },
            summeryList: [],
            majorDropList: [],
            someArr: ['菜庚', '陈薇薇', '龚丽娜', '赵建民', '胡慧敏', '顾小敏', '陶丽', '张佳薇', '林星', '潘婷'],
            setPagination: function () {
                this.params.pageNumber = this.page.pageNumber;
                this.params.pageSize = this.page.pageSize;
            },
            stuRoutineCount: function () {
                var that = $scope.summaryFn;
                that.setPagination();
                StatisticsService.stuRoutineCount(that.params).$promise
                    .then(function (data) {
                        console.log(data);
                        that.summeryList = data.data;
                        that.page = data.page;
                    })
            },
            stuScore: function () {
                var that = $scope.summaryFn;
                that.setPagination();
                StatisticsService.getAchievementList(that.params).$promise
                    .then(function (data) {
                        console.log(data);
                        that.summeryList = data.data;
                        that.page = data.page;
                    })
            },
            impartProcess: function () {
                var that = $scope.summaryFn;
                that.setPagination();
                StatisticsService.getImpartProcess(that.params).$promise
                    .then(function (data) {
                        console.log(data);
                        that.summeryList = data.data;
                        that.page = data.page;
                    })
            },
            stuRoutineDetail: function () {
                var that = $scope.summaryFn;
                that.setPagination();
                that.params.stuInfo = {
                    jobNum: $state.params.jobNum,
                    studentName: $state.params.studentName,
                    grade: $state.params.grade,
                    collegeName: $state.params.collegeName,
                    professionalName: $state.params.professionalName,
                    className: $state.params.className
                }
                that.params.stuId = $state.params.id;
                that.params.groupId = $state.params.groupId;
                StatisticsService.stuRoutineDetail(that.params).$promise
                    .then(function (data) {
                        console.log(data);
                        that.summeryList = data.data;
                        that.page = data.page;
                    })
            },
            stuReport: function () {
                var that = $scope.summaryFn;
                that.setPagination();
                StatisticsService.stuReport(that.params).$promise
                    .then(function (data) {
                        console.log(data);
                        that.summeryList = data.data;
                        that.page = data.page;
                    })
            },
            studentAttending: function () {
                var that = $scope.summaryFn;
                that.setPagination();
                StatisticsService.studentAttending(that.params).$promise
                    .then(function (data) {
                        console.log(data);
                        that.summeryList = data.data;
                        that.page = data.page;
                    })
            },
            teachingSummary: function () {
                var that = $scope.summaryFn;
                that.setPagination();
                StatisticsService.teachingSummary(that.params).$promise
                    .then(function (data) {
                        console.log(data);
                        that.summeryList = data.data;
                        that.page = data.page;
                    })
            },
            stuProcess: function () {
                var that = $scope.summaryFn;
                that.setPagination();
                StatisticsService.getStuProcess(that.params).$promise
                    .then(function (data) {
                        console.log(data);
                        that.summeryList = data.data;
                        that.page = data.page;
                    })
            },
            stuJournal: function () {
                var that = $scope.summaryFn;
                that.setPagination();
                StatisticsService.getStuJournal(that.params).$promise
                    .then(function (data) {
                        console.log(data);
                        that.summeryList = data.data;
                        that.page = data.page;
                    })
            },
            enterpriseDetail: function () {
                var that = $scope.summaryFn;
                that.setPagination();
                StatisticsService.getEnterpriseDetail(that.params).$promise
                    .then(function (data) {
                        console.log(data);
                        that.summeryList = data.data;
                        that.page = data.page;
                    })
            },
            studentActive: function () {
                var that = $scope.summaryFn;
                that.setPagination();
                StatisticsService.getStudentActive(that.params).$promise
                    .then(function (data) {
                        console.log(data);
                        that.summeryList = data.data;
                        that.page = data.page;
                    })
            },
            //select2动态关键字查询列表配置
            selectCollege2Options: function () {
                var _this = this;
                return {
                    placeholder: {
                        id: -1, // the value of the option
                        text: '全部'
                    },
                    allowClear: true,
                    ajax: Select2LoadOptionsService.getLoadOptions("api/college/getCollegeDropList", {
                        orgId: AuthService.getUser().orgId,
                        pageNumber: 1,
                        pageSize: 1000,
                        managerId: AuthService.getUser().id
                    }, "name"),

                    templateResult: function (data) {

                        if (data.id === '') { // adjust for custom placeholder values
                            _this.collegeDropList = [];
                            return '按班级筛选';
                        }
                        _this.collegeDropList.push(data);
                        return data.name;
                    },
                }
            },
            //select2动态关键字查询列表配置
            selectClassOptions: function () {
                var _this = this;
                return {
                    placeholder: {
                        id: -1, // the value of the option
                        text: '全部'
                    },
                    allowClear: true,
                    ajax: Select2LoadOptionsService.getLoadOptions("api/class/getClassList", {
                        orgId: AuthService.getUser().orgId,
                        pageNumber: 1,
                        pageSize: 1000,
                        managerId: AuthService.getUser().id
                    }, "name"),

                    templateResult: function (data) {

                        if (data.id === '') { // adjust for custom placeholder values
                            _this.classList = [];
                            return '按班级筛选';
                        }
                        _this.classList.push(data);
                        return data.name;
                    },
                }
            },
            //专业下拉列表配置
            select2MajorOptions: function () {
                var that = this;
                return {
                    placeholder: {
                        id: -1, // the value of the option
                        text: '全部'
                    },
                    allowClear: true,
                    ajax: {
                        url: "api/major/getMajorDropList",
                        dataType: 'json',
                        //delay: 250,
                        data: function (query) {
                            var params = {
                                orgId: AuthService.getUser().orgId,
                                pageNumber: 1,
                                pageSize: 100,
                                collegeId: that.params.collegeId,

                            };
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
                            that.majorDropList = [];
                        }
                        that.majorDropList.push(data);
                        return data.name;
                    }
                }
            },
            getCollegeDropList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 0,
                    pageSize: 1000,
                    managerId: AuthService.getUser().id
                }
                CollegeService.getCollegeDropList(params).$promise
                    .then(function (data) {
                        that.collegeDropList = data.data;
                    })
                    .catch(function (error) {})
            },
            // 获取班级列表
            getClassList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 1,
                    pageSize: that.page.pageSize,
                    managerId: AuthService.getUser().id
                };
                params.name = that.params.name;
                params.collegeId = that.params.collegeId;
                params.professionalId = that.params.professionalId;
                params.masterName = that.params.masterName;
                params.teachingYear = that.params.teachingYear;
                ClassService.getClassList(params).$promise
                    .then(function (data) {
                        that.classList = data.data;
                        // that.page = data.page;
                        that.portalTrigger();
                    })
                    .catch(function (error) {

                    })
            },
            getPracticeGroupList: function () {},
            init: function () {
                this.getCollegeDropList();
                this.portalTrigger();
            },
            /**
             * 执行 - 扣动传送门板机
             */
            portalTrigger: function () {
                var wakeUpFn = eval($scope.summaryFn.portalGun[$scope.summaryFn.portalUrl]);
                (typeof wakeUpFn == 'function') && wakeUpFn();
            },
            /**************************
             * excel另存为
             */
            s2ab: function (s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            },
            saveAs: function (data, fileName) {
                var that = this;
                var blob = new Blob([that.s2ab(data)], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                })
                var windowUrl = (window.URL || window.webkitURL)
                var downloadUrl = windowUrl.createObjectURL(blob);
                var anchor = document.createElement("a");
                anchor.href = downloadUrl;
                anchor.download = fileName + '.xlsx';
                document.body.appendChild(anchor);
                anchor.click();
                windowUrl.revokeObjectURL(blob);
            },
            /****************************
             * 导出报表
             */
            exportStuJournal: function () {
                var that = this;
                var _params = this.params;
                _params.pageNumber = 1;
                _params.pageSize = 10000;
                StatisticsService.exportStuJournal(_params)
                    .success(function (data) {
                        that.saveAs(data, '学生周日志统计报表');
                    })
            },
            exportStuProcess: function () {
                var that = this;
                var _params = this.params;
                _params.pageNumber = 1;
                _params.pageSize = 10000;
                StatisticsService.exportStuProcess(_params)
                    .success(function (data) {
                        that.saveAs(data, '学生参与过程明细表');
                    })
            },
            exportEnterpriseDetail: function () {
                var that = this;
                var _params = this.params;
                _params.pageNumber = 1;
                _params.pageSize = 10000;
                StatisticsService.exportEnterpriseDetail(_params)
                    .success(function (data) {
                        that.saveAs(data, '实践企业统计表');
                    })
            },
            exportStudentActive: function () {
                var that = this;
                var _params = this.params;
                _params.pageNumber = 1;
                _params.pageSize = 10000;
                StatisticsService.exportStudentActive(_params)
                    .success(function (data) {
                        that.saveAs(data, '学生激活明细表');
                    })
            },
            exportStudentAttending: function () {
                var that = this;
                var _params = this.params;
                _params.pageNumber = 1;
                _params.pageSize = 10000;
                StatisticsService.exportStudentAttending(_params)
                    .success(function (data) {
                        that.saveAs(data, '学生参与过程明细');
                    })
            },
            exportStuReport: function () {
                var that = this;
                var _params = this.params;
                _params.pageNumber = 1;
                _params.pageSize = 10000;
                StatisticsService.exportStuReport(_params)
                    .success(function (data) {
                        that.saveAs(data, '学生实习报告成绩');
                    })
            },
            exportTeachingSummary: function () {
                var that = this;
                var _params = this.params;
                _params.pageNumber = 1;
                _params.pageSize = 10000;
                StatisticsService.exportTeachingSummary(_params)
                    .success(function (data) {
                        that.saveAs(data, '实践教学汇总');
                    })
            },
            exportStuRoutineCount: function () {
                var that = this;
                var _params = this.params;
                _params.pageNumber = 1;
                _params.pageSize = 10000;
                StatisticsService.exportStuRoutineCount(_params)
                    .success(function (data) {
                        that.saveAs(data, '签到统计汇总表');
                    })
            },
            exportStuScore: function () {
                var that = this;
                var _params = this.params;
                _params.pageNumber = 1;
                _params.pageSize = 10000;
                StatisticsService.exportStuScore(_params)
                    .success(function (data) {
                        that.saveAs(data, '学生实习成绩汇总');
                    })
            },
            exportImpartProcess: function () {
                var that = this;
                var _params = this.params;
                _params.pageNumber = 1;
                _params.pageSize = 10000;
                StatisticsService.exportImpartProcess(_params)
                    .success(function (data) {
                        that.saveAs(data, '教师指导过程明细');
                    })
            },
            exportStuRoutineDetail: function () {
                var that = this;
                var _params = this.params;
                _params.pageNumber = 1;
                _params.pageSize = 10000;
                _params.stuInfo = {
                    jobNum: $state.params.jobNum,
                    studentName: $state.params.studentName,
                    grade: $state.params.grade,
                    collegeName: $state.params.collegeName,
                    professionalName: $state.params.professionalName,
                    className: $state.params.className
                }
                _params.stuId = $state.params.id;
                StatisticsService.exportStuRoutineDetail(_params)
                    .success(function (data) {
                        that.saveAs(data, '签到统计详情');
                    })
            },
            taskStatus: function (stuTaskStatus) {
                if (stuTaskStatus == "uncommit") {
                    return "未提交";
                } else if (stuTaskStatus == "checkPending") {
                    return "待审核";
                } else if (stuTaskStatus == "notPass") {
                    return "未通过";
                } else if (stuTaskStatus == "backTo") {
                    return "已打回";
                } else if (stuTaskStatus == "finish") {
                    return "已通过";
                } else {
                    return "状态出错";
                }
            }
        }
        console.log('Hello Teacher');

        $scope.summaryFn.init();
    });