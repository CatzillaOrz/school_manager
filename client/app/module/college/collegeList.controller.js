'use strict';

angular.module('dleduWebApp')
    .controller('CollegeListCtrl', function ($scope, AuthService,ngDialog, CollegeService, messageService,CommonService) {
        $scope.collegeListFn = {
            //学院列表
            collegeList: [],
            //当前操作的学院
            currentCollege: {},
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },
            //查询参数
            params: {
                name:""
            },

            // 获取学院列表
            getCollegeList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: 0,
                    pageSize: 10
                };
                params.name=that.params.name;
                CollegeService.getCollegeList(params).$promise
                    .then(function (data) {
                        that.collegeList = data.data;
                        that.page=data.page;
                    })
                    .catch(function (error) {

                    })
            },
            //根据名称查询
            findCollegeByPage: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: that.page.pageNumber,
                    pageSize: that.page.pageSize
                };
                params.name=that.params.name;
                CollegeService.getCollegeList(params).$promise
                    .then(function (data) {
                        that.collegeList = data.data;
                        that.page.totalElements=data.page.totalElements;
                        that.page.totalPages=data.page.totalPages;
                    })
                    .catch(function (error) {

                    })
            },
            //删除
            deleteCollege: function () {
                var _this = $scope.collegeListFn;
                var params = {
                    id: _this.currentCollege.id,
                    userId: AuthService.getUser().id,
                }
                CollegeService.deleteCollege(params).$promise
                    .then(function (data) {
                        messageService.openMsg("学院删除成功！");
                        _this.getCollegeList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"学院删除失败！"));
                    })
            },
            //删除提示弹出框
            deletePrompt: function (entity) {
                this.currentCollege = entity;
                messageService.getMsg("您确定要删除此学院吗？", this.deleteCollege);
            },
            init: function () {
                this.getCollegeList();
            }
        };

        $scope.buldLoad = function() {
            ngDialog.open({
                template: '' +
                '<div class="buld_wrap"><div class="buld_head">' +
                '   <div class="buld">批量导入</div>' +
                '   <div class="close_btn ngdialog-close" type="button">关闭</div>' +
                '   </div>' +
                '<div class="propt_content">' +
                '   <table>' +
                    '<tr>   ' +
                '       <td class="first_td">上传文件</td>' +
                '       <td><div class="choseFile left">选择文件</div>' +
                '       <input type="text" readonly="readonly" class="left load"><div class="left load_inner" ng-click="show_data()" type="button">导入</div>' +
                '       </td>' +
            '       </tr>' +
            '       <tr><td class="first_td">模板下载</td><td>' +
                '       <div class="load_inner_w">账号导入模板</div>' +
                '       </td>' +
            '       </tr>' +
                '   <tr>' +
                '   <td class="first_td">导入功能说明</td><td>' +
            '           <ul>' +
                '           <li>1.请先下载账号导入模板</li>' +
                '           <li>2.根据模板内容样式填写账号相关信息</li>' +
                '           <li>3.选择要导入的账号文件，点击导入</li>' +
                '       </ul>' +
            '       </td>' +
                '   </tr>' +
            '   </table></div>',
                plain: true,
                showClose: false,
                closeByDocument: false,
                scope:$scope,
                controller:function($scope){
                    $scope.show_data=function(){
                        ngDialog.close("#ngdialog1");
                        ngDialog.open({
                            template: '<div class="repeatLoad">' +
                            '               <div class="repeat_header">' +
                            '                   <div class="repeat_title left">重复导入提示</div>' +
                            '                   <div class="close_btn ngdialog-close right" type="button">关闭</div>' +
                            '               </div>' +
                            '               <div class="repeat_content">' +
                            '                   <table><tr><td>序号</td><td>院系名称</td><td>提示</td></tr></table>' +
                            '               </div>' +
                        '                   <div class="repeat_footer">' +
                            '                   <div class="dataTables_paginate paging_simple_numbers" id="datatable_col_reorder_paginate">' +
                            '                       <ul class="pagination-sm" total-items="collegeListFn.page.totalElements" max-size="collegeListFn.page.pageSize" ng-model="collegeListFn.page.pageNumber" ng-change="collegeListFn.findCollegeByPage()" boundary-link-numbers="true" rotate="false" previous-text="<" next-text=">">' +
                            '                       </ul>' +
                        '                       </div>' +
                        '                       <div class="repeat_button">' +
                            '                       <div class="repeat_btn left" type="button">重复更新</div>' +
                            '                       <div class="repeat_btn right">不覆盖</div>' +
                            '                   </div>' +
                            '               </div>' +
                            '           </div>',
                            plain: true,
                            showClose:false,
                            closeByDocument: false
                        });

                    }
                }
            });

        }

            $scope.collegeListFn.init();
    });
