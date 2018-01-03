'use strict';

angular.module('dleduWebApp')
    .controller('PaymentCtrl', function ($scope, AuthService,ngDialog, PaymentService,CollegeService, messageService,CommonService,
                                         Upload, UploadService, ImpBatchService) {
        $scope.paymentFn = {
            isPayment:true,
            paymentId:'',
            personCostData:{},
            uploadOrAddPayment:true,
            exportParam:{
                file:null,
                installmentRate:10,
                lastDate :'',
                paymentType  :10,
                smallAmount  :1000,
            },
            showPaymentStyle:false,
            showPaymentTime:false,
            paymentAmount:1000,
            tabType:"showByPerson",
            searchPaymentName:'',
            orderParams:{
                searchOrderName:'',
                startDate:'',
                endDate:''
            },
            personCal:{
                "name": "",
                "totalPersons": 0,
                "noPayPersons": 0,
                "owedPersons": 0,
                "completePersions": 0,
                "totalShouldPay": 0,
                "noPayShouldPay": 0,
                "owedHasPay": 0,
                "completeHasPay": 0
            },
            paymentStatusList:[
                {
                    name:'全部',
                    id:0
                },
                {
                    name:'未交费',
                    id:10
                },
                {
                    name:'有欠费',
                    id:20
                },
                {
                    name:'已结清',
                    id:30
                }
            ],
            majorList:[],
            paymentName:'',
            paymentList:[],
            personCostList:[],
            orderCostList:[],
            personPayDetailList:[],
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            personPage:{
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            orderPage:{
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 10
            },
            errorInfos: [], //返回的错误信息
            orderState: {
                10: '支付未完成',
                20:'支付成功',
                30:'已失效',
                40:'支付失败'

            },
            // 获取缴费单列表
            getPaymentList: function () {
                var that = this;
                var params = {
                    orgId: 218,//AuthService.getUser().orgId,
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
                var host = this.getEnvHost();
                window.location.href= host + '/v1/paymentsubject/newstudentcosttemplate';
            },

            getEnvHost: function(){
                var hostname = window.location.hostname;
                var host = 'http://gateway.aizhixintest.com/paycallback';
                if(hostname.indexOf('school.aizhixindev.com') != -1){
                    host = 'http://gateway.aizhixindev.com/zuul/paycallback';
                }else if(hostname.indexOf('school.aizhixintest.com') != -1){
                    host = 'http://gateway.aizhixintest.com/zuul/paycallback';
                }else if(hostname.indexOf('school.dlztc.com') != -1){
                    host = 'http://gateway.dlztc.com/zuul/zuul/paycallback';
                }else if(hostname.indexOf('school.aizhixin.com') != -1){
                    host = 'http://gateway.aizhixin.com/zuul/paycallback';
                }
                return host;
            },

            //获取收费详情数据
            getPersonCost:function(payment){
                var _this = this;
                this.isPayment = false;
                var params= {
                    id: payment.id,
                };
                this.paymentId =  payment.id;
                PaymentService.getPayment(params).$promise
                    .then(function (data) {
                        _this.personCostData = data;
                        _this.personCostData.paymentString = data.paymentType==10?'全款支付':((data.installmentRate==10?'首次缴费':'每次缴费')+'最低限额￥'+data.smallAmount+'元');
                        _this.showPaymentStyle = false;
                        if(_this.personCostData.paymentType==10){
                            _this.personCostData.smallAmount=1000;
                            _this.personCostData.installmentRate=10;
                        }
                    })
                    .catch(function (error) {
                    })
                PaymentService.getPaymentCal(params).$promise
                    .then(function (data) {
                        _this.personCal = data;
                    })
                    .catch(function (error) {
                    })
                    this.getPersonCostListByPage();


            },

            //切换页码获取按人员查看缴费单信息
            getPersonCostListByPage:function(){
                var Params={
                    paymentSubjectId:this.paymentId,
                    name:this.searchPaymentName,
                    paymentState:this.paymentStatus.id==0?'':this.paymentStatus.id,
                    professionalName:this.major.name=='全部'?'':this.major.name,
                    pageNumber:this.personPage.pageNumber,
                    pageSize:this.personPage.pageSize,
                }
                this.getPersonCostList(Params)
            },

            //切换页码获取按支付明细查看缴费单信息
            getOrderCostListByPage:function(){
                var params={
                    paymentSubjectId:this.paymentId,
                    name:this.orderParams.searchOrderName,
                    start:this.orderParams.startDate,
                    lastDate:this.orderParams.endDate,
                    pageNumber:this.orderPage.pageNumber,
                    pageSize:this.orderPage.pageSize,
                }
                this.getOrderCostList(params);
            },

            //获取人员缴费信息列表
            getPersonCostList:function(params){
                var _this = this;
                PaymentService.getPersonCostList(params).$promise
                    .then(function (data) {
                        _this.personCostList = data.data;
                        _this.personPage = data.page;
                    })
                    .catch(function (error) {
                    })
            },

            //切换页签
            switchOneTab:function(type){
                this.tabType = type;
                if(this.tabType == 'showByPerson'){
                    this.personPage.pageNumber = 1;
                    this.personPage.pageSize=10;
                    this.searchPaymentName = '';
                    this.paymentStatus = this.paymentStatusList[0];
                    this.major =this.majorList[0];
                    var params={
                        paymentSubjectId:this.paymentId,
                        name:this.searchPaymentName,
                        paymentState:this.paymentStatus.id==0?'':this.paymentStatus.id,
                        professionalName:this.major.name=='全部'?'':this.major.name,
                        pageNumber:this.personPage.pageNumber,
                        pageSize:this.personPage.pageSize,
                    }
                    this.getPersonCostList(params)
                }else if(this.tabType == 'showByPayment'){
                    this.orderPage.pageNumber = 1;
                    this.orderPage.pageSize=10;
                    this.orderParams.searchOrderName ='';
                    this.orderParams.startDate='';
                    this.orderParams.endDate='';
                    var params={
                        paymentSubjectId:this.paymentId,
                        name:this.orderParams.searchOrderName,
                        start:this.orderParams.startDate,
                        lastDate:this.orderParams.endDate,
                        pageNumber:this.orderPage.pageNumber,
                        pageSize:this.orderPage.pageSize,
                    }
                    this.getOrderCostList(params)
                }

            },

            //获取按支付明细查看缴费信息列表
            getOrderCostList:function(params){
                var that = this;
                PaymentService.getOrderCostList(params).$promise
                    .then(function (data) {
                        that.orderCostList = _.map(data.data,function(item){
                            item.orderState = that.orderState[item.orderState];
                            return item;
                        })
                    })
                    .catch(function (error) {
                    })
            },

            //按条件查询支付明细列表
            searchOrderCostList:function(){
                this.orderPage.pageNumber = 1;
                this.orderPage.pageSize=10;
                var params={
                    paymentSubjectId:this.paymentId,
                    name:this.orderParams.searchOrderName,
                    start:this.orderParams.startDate,
                    lastDate:this.orderParams.endDate,
                    pageNumber:this.orderPage.pageNumber,
                    pageSize:this.orderPage.pageSize,
                }
                this.getOrderCostList(params)
            },

            //按条件查询人员缴费列表
            searchPersonCostList:function(){
                this.personPage.pageNumber = 1;
                this.personPage.pageSize=10;
                var personCostListParams={
                    paymentSubjectId:this.paymentId,
                    name:this.searchPaymentName,
                    paymentState:this.paymentStatus.id==0?'':this.paymentStatus.id,
                    professionalName:this.major.name=='全部'?'':this.major.name,
                    pageNumber:this.personPage.pageNumber,
                    pageSize:this.personPage.pageSize,
                }
                this.getPersonCostList(personCostListParams)
            },


            //修改截止日期
            editPersonTime:function(){
                var that = this;
                var params = {
                    id:that.personCostData.id,
                    lastDate:that.personCostData.lastDate,
                    userId:AuthService.getUser().id,
                }
                PaymentService.updatelastdate(params).$promise
                    .then(function (data) {
                        this.showPaymentTime =false;
                        that.getPersonCost(that.personCostData);
                    })
                    .catch(function (error) {
                    })
            },

            //修改支付方式
            editPersonPayment:function(){
                var _this = this;
                var params={
                    id:this.personCostData.id,
                    paymentType:this.personCostData.paymentType,
                    smallAmount:this.personCostData.smallAmount,
                    installmentRate:this.personCostData.installmentRate,
                    userId: AuthService.getUser().id,
                }
                PaymentService.updatepaymenttype(params).$promise
                    .then(function (data) {
                        _this.getPersonCost(_this.personCostData);
                    })
                    .catch(function (error) {
                    })
            },

            //选择支付方式
            checkPaymentStyle:function(param){
                this.exportParam.paymentType =param;
                if(this.exportParam.paymentType==10){
                    this.exportParam.installmentRate =10;
                    this.exportParam.smallAmount=1000;
                }
            },

            //编辑支付方式内容
            editPayment:function(){
                this.showPaymentStyle = false;
                this.paymentStyle = this.isFullParagraph?'全款支付':((this.isFirstPayment?'首次缴费':'每次缴费')+'最低限额￥'+this.paymentAmount+'元');
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

            //按人员查看缴费详情弹出框
            showPersonPayDetail:function(id){
                var that = this;
                PaymentService.getPersonPayDetail({personCostId:id}).success(function (res) {
                    if(res){
                        that.personPayDetailList = res;
                        var params = {
                            template: 'importResultDialog',
                            width: 600,
                            scope: $scope,
                        };
                        ImpBatchService.openImpBatch(params);
                    }
                });
            },

            //获取专业列表
            getProfessional:function(){
                var _this = this;
                var params = {
                    orgId: 218,//AuthService.getUser().orgId,
                }
                PaymentService.getProfessional(params).$promise
                    .then(function (data) {
                        _this.majorList= _.union([
                            {
                            name:'全部',
                            id:0
                            }
                        ],data.data);
                        _this.major=_this.majorList[0];
                    })
                    .catch(function (error) {
                    })
            },

            //返回按钮
            goBackHomePage:function(){
                this.isPayment = true;
            },
            //导入或重新导入缴费单
            importPayment:function(){
                var that = this;
                if(this.exportParam.file == null){
                    messageService.openDialog("请选择excel文件！");
                    return;
                }
                var params={
                    file:this.exportParam.file,
                    name:this.exportParam.file.name,
                    installmentRate:this.exportParam.installmentRate,
                    lastDate :this.exportParam.lastDate,
                    paymentType  :this.exportParam.paymentType,
                    smallAmount  :this.exportParam.smallAmount,
                    userId   :AuthService.getUser().id,
                    orgId: 218,
                };
                if(this.uploadOrAddPayment ){
                    PaymentService.importPayment(params, this,this.getPaymentList);
                }else{
                    params = _.extend(params,{id:that.paymentId})
                    PaymentService.updatePayment(params, this,this.getPaymentList);
                }
            },
            init: function () {
                this.paymentStatus=this.paymentStatusList[0];
                this.getPaymentList();
                this.getProfessional();
            }
        };
        $scope.paymentFn.init();
    });
