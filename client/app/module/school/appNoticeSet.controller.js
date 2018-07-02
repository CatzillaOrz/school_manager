'use strict';
/**
*app发布通知编辑
*/

angular.module('dleduWebApp')
    .controller('AppNoticeSetCtrl', function ($scope, $rootScope, $state, $timeout, AuthService, messageService,
                                              ImageService, UploadService, CommonService, SchoolService) {
        $scope.dialogInfoEdit = {
            //分页信息
            params:{
                iconUrl: '',
                id: $state.params.id ? parseInt($state.params.id) : 0,
                onOff: 'off',
                order: 0,
                orgs: '',
                role: $state.params.role || 'student',
                targetTitle: '',
                targetType: 'app',
                targetUrl: '',
                title: '',
                isQuestionnaire: 'false',
                type: 'alert'
            },
            orgList : [{name:'1'}],
            selectAll : false,

            //查询详情
            getAppNoticeDetail: function(id){
                var that = this;
                var params = {id: id};
                SchoolService.getAppNoticeDetail(params)
                    .success(function (data) {
                        that.params = data;
                        that.params.isQuestionnaire = data.isQuestionnaire ? 'true':'false';
                        that.getAllOrg();
                    })
                    .catch(function () {

                    });
            },

            //添加 提交
            addConfig: function(){
                var that = this;
                var params = angular.copy(that.params);
                params.orgs = AuthService.getUser().orgId + "";
                params.isQuestionnaire = that.params.isQuestionnaire == 'true'? true: false;
                SchoolService.addAppNotice(params)
                    .success(function (data) {
                        if(data.success){
                            messageService.openMsg("新增成功！");
                            $state.go('appnoticelist');
                        }else{
                            messageService.openMsg("新增失败！");
                        }

                    })
                    .catch(function (e) {
                        console.log(e)
                    });
            },

            //查询 回填
            updateConfig: function(){
                var that = this;
                var params = angular.copy(that.params);
                params.orgs = AuthService.getUser().orgId + "";
                params.isQuestionnaire = that.params.isQuestionnaire == 'true'? true: false;
                SchoolService.updateAppNotice(params)
                    .success(function (data) {
                        if(data.success){
                            messageService.openMsg("修改成功！");
							$state.go('appnoticelist');
                        }else{
                            messageService.openMsg("修改失败！");
                        }
                    })
                    .catch(function (e) {
                        console.log(e)
                    });
            },

            //过滤选中学校
            orgFilter: function(){
                var that = this;
                var temp = [];
                angular.forEach(that.orgList, function(list){
                    if(list.selected){
                        temp.push(list.id);
                    }
                })
                return temp.toString();
            },

            //查询所有学校
            getAllOrg : function(){
                var that = this;
                SchoolService.getAllSchool()
                    .success(function (data) {
                        that.orgList = data;
                        if(that.params.id !== 0){
                            var tmp = !!that.params.orgs ? (that.params.orgs).split(',') : [];
                            angular.forEach(that.orgList, function(list){
                                angular.forEach(tmp, function(entity){
                                    if(list.id === parseInt(entity)){
                                        list.selected = true;
                                    }
                                })
                            })
                        }
                    })
                    .catch(function (e) {
                        console.log(e)
                    });
            },

            //全选
            toggleSelect : function(){
                var that = this;
                this.selectAll = !this.selectAll;
                angular.forEach(that.orgList, function(list){
                    list.selected = that.selectAll;
                })
            },

            //提交
            submit : function(){
                var that = this;
                if(that.params.id !== 0){
                    that.updateConfig();
                }else{
                    that.addConfig();
                }
            },

            //初始化
            init: function() {
                var that = this;
                if (that.params.id !== 0) {
                    that.getAppNoticeDetail(that.params.id);
                } else {
                    this.getAllOrg();
                }
            }
        }

        $scope.dialogInfoEdit.init();
    });