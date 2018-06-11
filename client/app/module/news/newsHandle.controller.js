'use strict';

angular.module('dleduWebApp')
    .controller('NewsHandleCtrl', function ($scope,$state,NewsService, AuthService, messageService,CommonService,$timeout) {
         $scope.newsHandle={
             editorid: 'introduce',
             editor: {},
             handle:"",
             editorConf: {
                 autoHeight: false,
                 autoHeightEnabled: false,
                 autoFloatEnabled: false,
                 initialFrameWidth: '100%',
                 initialFrameHeight: '500px',
                 maximumWords: '3000'
             },
             params:{
                 content: "",
                 id: 0,
                 organId: AuthService.getUser().orgId,
                 title: "",
                 type: 10
             },
             /**
              * 添加
              */
             addNews:function () {
                 var _this=this;
                 NewsService.addNews(_this.params).$promise
                     .then(function (data) {
                         CommonService.msgDialog("添加成功！",1);
                         $timeout(function () {
                             $state.go("newslist")
                         },1500)
                     })
                     .catch(function (error) {
                         messageService.openMsg(CommonService.exceptionPrompt(error,"添加通知失败！"));
                     })
             },
             /**
              * 更新
              */
             updateNews:function () {
                 var _this=this;
                 NewsService.updateNews(_this.params).$promise
                     .then(function (data) {
                         CommonService.msgDialog("更新成功！",1);
                         $timeout(function () {
                             $state.go("newslist")
                         },1500)
                     })
                     .catch(function (error) {
                         messageService.openMsg(CommonService.exceptionPrompt(error,"更新通知失败！"));
                     })
             },
             submit:function () {
                 var _this=this;
                 var content=CommonService.strCut(_this.params.content);
                 if(!content){
                     CommonService.msgDialog("内容不能为空！",2);
                     return;
                 }else if(content.length>3000){
                     CommonService.msgDialog("内容不能超过最大长度！",2);
                     return;
                 }
                 if (_this.handle == "newsedit") {
                     _this.updateNews();
                 }else {
                     _this.addNews();
                 }
             },
             /**
              * 查询
              * */
             getNewsById:function () {
                 var _this=this;
                 var params={
                     id:_this.params.id
                 };
                 NewsService.getNewsById(params).$promise
                     .then(function (data) {
                        _this.params=data;
                     })
                     .catch(function (error) {
                     })
             },
             init:function () {
                var _this=this;
                _this.handle=$state.current.name;
               if(_this.handle=="newsedit"){
                   _this.params.id=$state.params.id;
                   _this.getNewsById();
               }
             }
         };
        $scope.newsHandle.init();

    })