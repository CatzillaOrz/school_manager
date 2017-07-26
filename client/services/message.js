/**
 * Created by Administrator on 2017/4/10.
 */
'use strict';

angular.module('dleduWebService')
    .factory('messageService', function (ngDialog) {
        return {
            /*
             * 直接调用
             * msg 消息内容
             * timer 消息提示时间 默认2000
             * */
            openMsg: function(msg,timer,callback){
                var that =this;
                if(callback){
                    (callback && typeof(callback) === "function") && callback(msg);
                }else {
                    ngDialog.open({
                        template: '<span class="text-warning">' + msg + '</span>',
                        plain: true
                    });
                    if(timer =="" || timer ==undefined || timer == null){
                        timer = 2000;
                    }
                    setTimeout(function () {
                        ngDialog.closeAll();
                    }, timer);
                    //ngDialog.close({showClose: true});
                }
            },

            /*
             * 是否根据id关闭对话框
             * msg 消息内容
             * */
            openDialog: function(msg){
                var result = ngDialog.open({
                    template: '<span class="text-warning">' + msg + '</span>',
                    plain: true
                });
                return result;
            },

            /*
             * 是否根据id关闭对话框
             * msg 消息内容
             * timer 消息提示时间 默认2000
             * */
            closeDialog: function(id, timer){
                if(timer =="" || timer ==undefined || timer == null){
                    timer = 2000;
                }
                setTimeout(function () {
                    ngDialog.close(id);
                }, timer);
            },

            /*
             * 如果调用回调函数
             *
             * */
            getMsg  : function (Msg,callback) {
                ngDialog.openConfirm({
                    template: '<h5>'+Msg+'</h5>' +
                    '<div class="ngdialog-buttons">' +
                    '<button type="button" class="ngdialog-button ngdialog-button-secondary btn-small" ng-click="closeThisDialog(0)">取消</button>' +
                    '<button type="button" class="ngdialog-button ngdialog-button-primary btn-small" ng-click="confirm(1)">确定</button>' +
                    '</div>',
                    plain   : true
                }).then(
                    function (value) {
                        if(callback) {
                            (callback && typeof(callback) === "function") && callback(1);
                        }
                    }
                );
            }
        }
    });