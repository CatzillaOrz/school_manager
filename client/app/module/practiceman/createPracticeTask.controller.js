/**
 * Created by Administrator on 2017/6/22.
 * 创建实践小组
 */
angular.module('dleduWebApp')
	.controller('CreatePracticeTaskCtrl', function ($scope, $state, $timeout, AuthService, messageService, PracticeManService) {

        $scope.handleFn = {
            isEditOrAdd: 'add', //true是编辑 false是新增
            //企业导师信息
            record: null,
            prompt: '填写以下信息以建立周任务',
            title: '周任务信息创建',
            id: $state.params.id,
            groupList:{},
            params: {
                beginDate: '',
                endDate: '',
                id: '',
                orgId: AuthService.getUser().orgId,
                practiceTeamList: [
                ],
                remark: '',
                weekNo: '',
                taskTitle: ''
            },

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
                        angular.forEach(data,function(item,index){
                            that.groupList[item.id] = item;
                        });
                        if($state.params.id){
                            angular.forEach(that.params.practiceTeamList,function(item){
                                if(that.groupList[item]){
                                    that.groupList[item].select = true;
                                }
                            })
                        }
                    })
                    .catch(function (error) {

                    })
            },

            // 查询周任务信息
            getWeekTaskDetail: function () {
                var that = this;
                var params = {
                    id: $state.params.id
                };
                PracticeManService.getWeekTaskDetail(params).$promise
                    .then(function (data) {
                        console.log(data);
                        that.params = data.data;
                        that.getGrouplistByOrgId();
                    })
                    .catch(function (error) {

                    })
            },

            //保存周任务
            save: function(){
                if($state.params.id){

                    PracticeManService.putWeekTask(this.params).$promise
                        .then(function (data) {
                            messageService.openMsg("修改成功!");
                            $state.go("practicetasklist");
                        })
                        .catch(function (error) {
                            messageService.openMsg("修改失败! "+error.data);
                        })
                }else{
                    PracticeManService.addWeekTask(this.params).$promise
                        .then(function (data) {
                            messageService.openMsg("创建成功!");
                            $state.go("practicetasklist");
                        })
                        .catch(function (error) {
                            console.log(error.data);
                            messageService.openMsg("创建失败! "+error.data);
                        })
                }
            },

            //提交
            submit: function(){
                var _this =this;
                _this.params.practiceTeamList =[];
                angular.forEach(_this.groupList,function(item){
                    if(item.select){
                        _this.params.practiceTeamList.push(item.id);
                    }
                });
                this.save();
            },


            init: function () {
                if($state.params.id){
                    this.getWeekTaskDetail();
                    this.prompt = '填写以下信息以编辑周任务';
                    this.title = '周任务信息编辑';
                }else{
                    this.getGrouplistByOrgId();
                }
            }
        };
        $scope.handleFn.init();
	});