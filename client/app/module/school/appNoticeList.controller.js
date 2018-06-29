'use strict';
/**
*app发布通知列表
*/

angular.module('dleduWebApp')
    .controller('AppNoticeListCtrl', function ($scope, $rootScope, $state, $timeout, SchoolService, messageService
                                               ) {
        var TabBlock = {
            s: {
                animLen: 200
            },

            init: function () {
                TabBlock.bindUIActions();
                TabBlock.hideInactive();
            },

            bindUIActions: function () {
                $('.tabBlock-tabs').on('click', '.tabBlock-tab', function () {
                    TabBlock.switchTowTab($(this));
                });
            },

            hideInactive: function () {
                var $tabBlocks = $('.tabBlock');

                $tabBlocks.each(function (i) {
                    var
                        $tabBlock = $($tabBlocks[i]),
                        $panes = $tabBlock.find('.tab-pane'),
                        $activeTab = $tabBlock.find('.tabBlock-tab.active');

                    $panes.hide();
                    $($panes[$activeTab.index()]).show();
                });
            },

            switchTowTab: function ($tab) {
                var $context = $tab.closest('.tabBlock');

                if (!$tab.hasClass('active')) {
                    $tab.siblings().removeClass('active');
                    $tab.addClass('active');

                    TabBlock.showPane($tab.index(), $context);
                }
            },

            showPane: function (i, $context) {
                var $panes = $context.find('.tab-pane');

                // Normally I'd frown at using jQuery over CSS animations, but we can't transition between unspecified variable heights, right? If you know a better way, I'd love a read it in the comments or on Twitter @johndjameson
                $panes.slideUp(TabBlock.s.animLen);
                $($panes[i]).slideDown(TabBlock.s.animLen);
            }
        };

        $scope.dialogInfoList = {
            records: null, //当前记录
            id: 0,
            type: 'student',
            record: null,

            switchType: function(type){
                this.type = type;
                this.getAppNoticeList();
            },

            //列表
            getAppNoticeList: function(){
                var that = this;
                var params = {role: this.type, type:'alert'};
                SchoolService.getAppNoticeList(params)
                    .success(function (data) {
                        that.records = data;
                    })
                    .catch(function () {

                    });
            },

            /**
             * 新增或者编辑轮播图
             * @param $index
             */
            editRecord: function($index){
                var that = this;
                if(typeof $index != 'undefined'){ //编辑
                    var id = this.records[$index].id;
                    $state.go("appnoticeset", {role:that.type,id:id});
                }else{
                    $state.go("appnoticeset", {role:that.type});
                }
            },

            /**
             * 删除
             * @param $index
             */
            delRecordPrompt: function(record){
                this.record = record;
                var that = $scope.dialogInfoList;
                messageService.getMsg('是否要删除此记录？', that.delRecord);
            },

            /**
             * 删除轮播图
             * @param $index
             */
            delRecord: function(){
                var that = $scope.dialogInfoList;
                var id = that.record.id;
                SchoolService.deleteAppNotice({homePageId: id}).$promise
                    .then(function (data) {
                        that.getAppNoticeList();
                        messageService.openMsg("删除成功！");
                    })
                    .catch(function (error) {
                        messageService.openMsg("删除异常！");
                    })
            },


            //初始化
            init: function(){
                $timeout(function(){
                    TabBlock.init();
                });
                this.getAppNoticeList();
            }
        }

        $scope.dialogInfoList.init();
    });