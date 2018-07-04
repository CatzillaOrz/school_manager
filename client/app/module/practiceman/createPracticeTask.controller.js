angular.module('dleduWebApp')
    .controller('CreatePracticeTaskCtrl', function ($scope, $state, $timeout, AuthService, UploadService, messageService, PracticeManService) {

        $scope.handleFn = {
            isEditOrAdd: 'add', //true是编辑 false是新增
            //企业导师信息
            record: null,
            prompt: '填写以下信息以建立实践课程',
            title: '实践课程任务创建',
            id: $state.params.id,
            wid: $state.params.wid,
            groupList: {},
            params: {
                beginDate: '',
                endDate: '',
                id: '',
                orgId: AuthService.getUser().orgId,
                practiceTeamList: [],
                remark: '',
                weekNo: '',
                taskTitle: '',
                fileList: [],
                describe: '',
                description: ''
            },
            fileList: [],
            // 查询导师信息
            getGrouplistByOrgId: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId
                };
                PracticeManService.getGrouplistByOrgId(params).$promise
                    .then(function (data) {
                        console.log(data);

                        that.groupList = {};
                        angular.forEach(data, function (item, index) {
                            that.groupList[item.id] = item;
                        });
                        if ($state.params.id) {
                            angular.forEach(that.params.practiceTeamList, function (item) {
                                if (that.groupList[item]) {
                                    that.groupList[item].select = true;
                                }
                            })
                        }
                    })
                    .catch(function (error) {

                    })
            },

            // 获取课程列表
            getPracticeGroupList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 1,
                    pageSize: 10000
                };
                PracticeManService.getWeekTaskList(params).$promise
                    .then(function (data) {
                        that.weekTaskList = data.data;
                        that.page = data.page;
                    })
                    .catch(function (error) {

                    })
            },
            // 删除图片
            delImage: function(file){
                var that = this;
                that.params.fileList = _.filter(that.params.fileList, function(c){
                    return c.id !== file.id;
                });
            },

            // 查询周任务信息
            getWeekTaskDetail: function () {
                var that = this;
                var params = {
                    id: $state.params.id
                };
                PracticeManService.getTaskDetail(params).$promise
                    .then(function (data) {
                        console.log(data);
                        that.params = data.data;
                        // that.getGrouplistByOrgId();
                        that.getPracticeGroupList();
                    })
                    .catch(function (error) {

                    })
            },

            //保存周任务
            save: function () {
                if ($state.params.id) {

                    PracticeManService.updateTask(this.params).$promise
                        .then(function (data) {
                            messageService.openMsg("修改成功!");
                            $state.go("practicetasklist",{wid: $state.params.wid});
                        })
                        .catch(function (error) {
                            messageService.openMsg("修改失败! " + error.data);
                        })
                } else {
                    PracticeManService.addTask(this.params).$promise
                        .then(function (data) {
                            messageService.openMsg("创建成功!");
                            $state.go("practicetasklist",{wid:$state.params.wid});
                        })
                        .catch(function (error) {
                            console.log(error.data);
                            messageService.openMsg("创建失败! " + error.data);
                        })
                }
            },

            //提交
            submit: function () {
                var _this = this;
                _this.params.practiceTeamList = [];

                angular.forEach(_this.groupList, function (item) {
                    if (item.select) {
                        _this.params.practiceTeamList.push(item.id);
                    }
                });
                this.save();
            },

            selectFile: function (file) {
                var that = this;
                UploadService.fileUploadToQiNiu(file)
                    .then(function (resp) {
                        that.params.fileList.push({
                            fileName: resp.data.key,
                            srcUrl: resp.data.url
                        });
                    }, function (resp) {
                        CommonService.msgDialog('上传失败！！', 2);
                    }, function (evt) {
                        // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        //console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                    })
            },
            init: function () {
                if ($state.params.id) {
                    this.getWeekTaskDetail();
                    this.prompt = '填写以下信息以编任务';
                    this.title = '任务信息编辑';
                } else {
                    this.getPracticeGroupList();
                }
            }
        };
        $scope.handleFn.init();
    });