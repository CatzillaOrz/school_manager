'use strict';

angular.module('dleduWebApp')
    .controller('BatchImpCtrl', function ($scope, AuthService, ngDialog, messageService, CommonService, Upload,
                                          UploadService, ImpBatchService) {
        $scope.batchImpFn = {
            myFile: null, //选择的文件对象
            errorInfos: [], //返回的错误信息

            /**
             * 弹出批量导入弹出框
             */
            openImpBatch: function(){
                var params = {
                    template: 'importDialog',
                    width: 600,
                    scope: $scope,
                };
                ImpBatchService.openImpBatch(params);
            },

            /**
             * 弹出批量导入弹出框
             */
            importantBatch: function(file){
                var params = {
                    file: file,
                    orgId: AuthService.getUser().orgId,
                    userId: AuthService.getUser().id,
                    uploadType: 'college'
                };
                var dialogParams = {
                    template: 'importResultDialog',
                    width: 600,
                    scope: $scope
                };
                ImpBatchService.importantBatch(params, this, dialogParams, this.getCollegeList);
            },

            //选择文件事件
            selected: function($newFiles){
                ImpBatchService.selected($newFiles);
            },

			/**
			 * 下载模板
             */
            downLoad: function(){
                ImpBatchService.downLoad('college');
            },

            init: function () {

            }
        };

            $scope.batchImpFn.init();
    });
