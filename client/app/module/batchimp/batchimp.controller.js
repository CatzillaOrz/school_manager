'use strict';

angular.module('dleduWebApp')
    .controller('BatchImpCtrl', function ($scope, AuthService, ngDialog, messageService, CommonService, Upload,
                                          UploadService, ImpBatchService, ImpService) {
        $scope.batchImpFn = {
            myFile: null, //选择的文件对象
            errorInfos: [], //返回的错误信息
            templateName: "基础数据模板",
            impType: '',

            /**
             * 弹出批量导入弹出框
             */
            openImpBatch: function(type, isReset){
                this.impType = type;
                this.templateName = this.impType == 'normal' ? "基础数据模板" : "课程课表模板";
                var that = this;
                var params = {
                    template: 'importDialog',
                    width: 600,
                    scope: $scope,
                };
                if(isReset == 'reset'){
                    ngDialog.close();
                    ImpBatchService.openImpBatch(params);
                    return;
                }
                if(this.impType == 'normal'){
                    ImpService.getNormalImpResult({orgId: AuthService.getUser().orgId, userId: AuthService.getUser().id}).$promise
                        .then(function (data) {
                            that.resultHandle(data, params);
                        })
                        .catch(function (error) {

                        })
                }else{
                    ImpService.getTimetableImpResult({orgId: AuthService.getUser().orgId, userId: AuthService.getUser().id}).$promise
                        .then(function (data) {
                            that.resultHandle(data, params);
                        })
                        .catch(function (error) {

                        })
                }
            },

	        /**
	         * 结果处理
             */
            resultHandle: function(data, params){
                var that = this;
                if(typeof data.state == 'undefined'){
                    ImpBatchService.openImpBatch(params);
                }else{
                    if(data.state == 10){//数据正在处理请稍候查看
                        messageService.openMsg("数据正在处理，请稍候导入数据！");
                    }else if(data.state == 20){
                        ImpBatchService.openImpBatch(params);
                    }else if(data.state == 30){ //数据出错
                        that.errorInfos = data
                        ngDialog.close();
                        var dialogParams = {
                            template: 'importResultDialog',
                            width: 600,
                            scope: $scope
                        };
                        ngDialog.open(dialogParams);
                    }
                }
            },

            /**
             * 弹出批量导入弹出框
             */
            importantBatch: function(file){
                var params = {
                    file: file,
                    orgId: AuthService.getUser().orgId,
                    userId: AuthService.getUser().id,
                    uploadType: this.impType
                };
                var dialogParams = {
                    template: 'importResultDialog',
                    width: 600,
                    scope: $scope
                };
                ImpBatchService.importantBatch(params, this, dialogParams);
            },

            //选择文件事件
            selected: function($newFiles){
                ImpBatchService.selected($newFiles);
            },

			/**
			 * 下载模板
             */
            downLoad: function(){
                ImpBatchService.downLoad(this.impType);
            },

            init: function () {

            }
        };

            $scope.batchImpFn.init();
    });
