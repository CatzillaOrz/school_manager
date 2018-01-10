'use strict';

angular.module('dleduWebApp')
    .controller('PaymentCtrl', function ($scope, AuthService,ngDialog,$state,$rootScope, PaymentService,CollegeService, messageService,CommonService,
                                         Upload, UploadService, ImpBatchService, SchoolService) {
        $scope.paymentFn = {
            exportParam:{
                file:null,
                installmentRate:10,
                lastDate :'',
                paymentType  :10,
                smallAmount  :1000,
            },
            paymentName:'',
            paymentAmount:1000,
            paymentList:[],
            uploadOrAddPayment:true,
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            errorInfos: [], //返回的错误信息
            // 获取缴费单列表
            getPaymentList: function () {
                var that = this;
                var params = {
                    orgId: AuthService.getUser().orgId,
                    pageNumber: this.page.pageNumber,
                    pageSize: this.page.pageSize,
                    name:this.paymentName
                };
                PaymentService.getPaymentList(params).$promise
                    .then(function (data) {
                        that.paymentList = data.data;
                        that.page=data.page;
                    })
                    .catch(function (error) {

                    })
            },

            //删除提示弹出框
            deletePayment: function (payment) {
                this.deletePaymentId = payment.id;
                messageService.getMsg("您确定要删除此缴费单吗？", this.deletePaymentList);
            },

            //确认删除
            deletePaymentList: function () {
                var _this = $scope.paymentFn;
                var params = {
                    id: _this.deletePaymentId,
                    userId: AuthService.getUser().id,
                }
                PaymentService.deletePayment(params).$promise
                    .then(function (data) {
                        messageService.openMsg("缴费单删除成功！");
                        _this.getPaymentList();
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"缴费单删除失败！"));
                    })
            },

            //缴费单生效
            publishPayment:function(payment){
                var _this = this;
                var params = {
                    id: payment.id,
                    userId: AuthService.getUser().id,
                }
                PaymentService.publishPayment(params).$promise
                    .then(function (data) {
                        _this.getPaymentList();
                    })
                    .catch(function (error) {
                    })
            },

            //获取单个缴费单数据
            getPayment:function(payment){
                var _this = this;
                var params= {
                    id: payment.id,
                };
                this.paymentId =  payment.id;
                PaymentService.getPayment(params).$promise
                    .then(function (data) {
                        _this.exportParam={
                            file:null,
                            installmentRate:data.installmentRate,
                            lastDate :data.lastDate,
                            paymentType  :data.paymentType,
                            smallAmount  :data.smallAmount,
                        },
                            _this.uploadOrAddPayment = false;
                        _this.openImpBatch();
                    })
                    .catch(function (error) {
                    })

            },

            //选择文件事件
            selected: function($newFiles){
                ImpBatchService.selected($newFiles);
            },

            //下载模板
            downLoad: function(){
                SchoolService.getApiUrl({type:"pay"}).$promise
                    .then(function (data) {
                        window.location.href= data.url + '/v1/paymentsubject/newstudentcosttemplate';
                    })
                    .catch(function (error) {
                    })
            },

            //获取收费详情数据
            getPaymentDetail:function(payment){
                $state.go('paymentDetail',{payment:payment});
            },
            //初始化导入缴费单数据信息
            initialization:function(){
                this.exportParam={
                    file:null,
                    installmentRate:10,
                    lastDate :'',
                    paymentType  :10,
                    smallAmount  :1000,
                };
                this.uploadOrAddPayment = true;
                this.openImpBatch();
            },
            //打开导入缴费单窗口
            openImpBatch: function(){
                var params = {
                    template: 'importDialog',
                    width: 600,
                    scope: $scope,
                };
                ImpBatchService.openImpBatch(params);
            },
            inputKeyUpFun:function(){
                this.exportParam.smallAmount = this.exportParam.smallAmount.replace(/\D/g,'')
            },
            //导入或重新导入缴费单
            importPayment:function(){
                var that = this;
                if(this.exportParam.file == null){
                    messageService.openDialog("请选择excel文件！");
                    return;
                }
                if(this.exportParam.lastDate == ''){
                    messageService.openDialog("请选择截止日期！");
                    return;
                }
                if(this.exportParam.smallAmount == ''&&this.exportParam.paymentType==20){
                    messageService.openDialog("请输入正确的最低支付额度！");
                    return;
                }
                var fileName = this.exportParam.file.name, indexLast = fileName.lastIndexOf(".");
                var name = fileName.substring(0, indexLast);
                var params={
                    file:this.exportParam.file,
                    fileName:name,
                    installmentRate:this.exportParam.installmentRate,
                    lastDate :this.exportParam.lastDate,
                    paymentType  :this.exportParam.paymentType,
                    smallAmount  :this.exportParam.smallAmount,
                    userId   :AuthService.getUser().id,
                    orgId: AuthService.getUser().orgId,
                };
                CommonService.delEmptyProperty(params);
                if(this.uploadOrAddPayment ){
                    PaymentService.importPayment(params, this,this.getPaymentList);
                }else{
                    params = _.extend(params,{id:that.paymentId})
                    PaymentService.updatePayment(params, this,this.getPaymentList);
                }
            },
            init: function () {
                this.getPaymentList();
            }
        };
        $scope.paymentFn.init();
    });
