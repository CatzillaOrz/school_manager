/**
 * Created by Administrator on 2017/6/22.
 * 实践小组管理
 */
angular.module('dleduWebApp')
    .controller('TeachingSummaryCtrl', function ($scope, $state, AuthService, messageService, CollegeService, CommonService, Select2LoadOptionsService, ClassService,
        StatisticsService) {



        $scope.summaryFn = {
            portalUrl: $state.current.name,     // 当前路由
            portalGun: {    // 匹配当前路由入口方法 - 传送门
                teachingSummary: '$scope.summaryFn.teachingSummary',
                studentAttending: '$scope.summaryFn.studentAttending',
                studentActive: '$scope.summaryFn.studentActive',
                stuProcess: '$scope.summaryFn.stuProcess',
                stuJournal: '$scope.summaryFn.stuJournal',
                impartProcess: '$scope.summaryFn.impartProcess',
                stuRoutineCount: '$scope.summaryFn.stuRoutineCount',
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
                collegeId: '',
                professionalId: '',
                classId: "",
                masterName: "",
                teachingYear: ""
            },
            summeryList: [],
            majorDropList: [],
            someArr: ['菜庚', '陈薇薇', '龚丽娜', '赵建民', '胡慧敏', '顾小敏', '陶丽', '张佳薇', '林星', '潘婷'],
            setPagination: function(){
                this.params.pageNumber = this.page.pageNumber;
                this.params.pageSize = this.page.pageSize;
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
            enterpriseDetail: function(){
                var that = $scope.summaryFn;
                that.setPagination();
                StatisticsService.getEnterpriseDetail(that.params).$promise
                    .then(function (data) {
                        console.log(data);
                        that.summeryList = data.data;
                        that.page = data.page;
                    })
            },
            studentActive: function(){
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
				var blob = new Blob([that.s2ab(data)], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
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
           exportStuJournal: function(){
               var that = this;
               var _params = this.params;
               _params.pageNumber = 1;
               _params.pageSize = 10000;
               StatisticsService.exportStuJournal(_params)
                    .success(function(data){
                        that.saveAs(data, '学生周日志统计报表');
                    })
           },
           exportStuProcess: function(){
                var that = this;
                var _params = this.params;
                _params.pageNumber = 1;
                _params.pageSize = 10000;
                StatisticsService.exportStuProcess(_params)
                    .success(function(data){
                        that.saveAs(data, '学生参与过程明细表');
                    })
           },
           exportEnterpriseDetail: function(){
                var that = this;
                var _params = this.params;
                _params.pageNumber = 1;
                _params.pageSize = 10000;
                StatisticsService.exportEnterpriseDetail(_params)
                    .success(function(data){
                        that.saveAs(data, '实践企业统计表');
                    })
           }
        }
        console.log('Hello Teacher');

        $scope.summaryFn.init();
    });