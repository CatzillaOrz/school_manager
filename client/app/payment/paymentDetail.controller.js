'use strict';

angular.module('dleduWebApp')
    .controller('PaymentDetailCtrl', function ($scope,$stateParams,$state, $rootScope,AuthService,ngDialog, PaymentService,CollegeService, messageService,CommonService,
                                         Upload, UploadService, ImpBatchService) {
        $scope.paymentFn = {
            paymentParams:null,
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
            personPage:{
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 5
            },
            orderPage:{
                totalElements: 0,
                totalPages: 0,
                pageNumber: 1,
                pageSize: 5
            },
            errorInfos: [], //返回的错误信息
            orderState: {
                10: '支付未完成',
                20:'支付成功',
                30:'已失效',
                40:'支付失败'

            },

            //获取收费详情数据
            getPersonCost:function(){
                var _this = this;
                var params= {
                    id: this.paymentParams.id,
                };
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
                this.getPersonCostList();


            },

            //获取人员缴费信息列表
            getPersonCostList:function(){
                var params={
                    paymentSubjectId:this.paymentParams.id,
                    name:this.searchPaymentName,
                    paymentState:this.paymentStatus.id==0?'':this.paymentStatus.id,
                    professionalName:this.major.name=='全部'?'':this.major.name,
                    pageNumber:this.personPage.pageNumber,
                    pageSize:this.personPage.pageSize,
                }
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
                    this.getPersonCostList()
                }else if(this.tabType == 'showByPayment'){
                    this.getOrderCostList()
                }

            },

            //获取按支付明细查看缴费信息列表
            getOrderCostList:function(){
                var that = this;
                var params={
                    paymentSubjectId:this.paymentParams.id,
                    name:this.orderParams.searchOrderName,
                    start:this.orderParams.startDate,
                    lastDate:this.orderParams.endDate,
                    pageNumber:this.orderPage.pageNumber,
                    pageSize:this.orderPage.pageSize,
                }
                PaymentService.getOrderCostList(params).$promise
                    .then(function (data) {
                        that.orderCostList = _.map(data.data,function(item){
                            item.orderState = that.orderState[item.orderState];
                            return item;
                        })
                        that.orderPage = data.page;
                    })
                    .catch(function (error) {
                    })
            },
            exportPersonExcel:function(){
                var that = this;
                var params={
                    paymentSubjectId:this.paymentParams.id,
                    name:'',
                    paymentState:'',
                    professionalName:'',
                    pageNumber:1,
                    pageSize:100000,
                }
                PaymentService.getPersonCostList(params).$promise
                    .then(function (data) {
                        var personList = _.map(data.data,function(item){
                            return {
                                '交费人':item.name,
                                '身份证号':item.idNumber,
                                '专业':item.professionalName,
                                '应缴金额':item.shouldPay,
                                '实交金额':item.hasPay,
                                '欠费金额':item.shouldPay-item.hasPay,
                                '状态':item.paymentState==10?'未交费':item.paymentState==20?'有欠费':'已结清',
                                '收费明细':item.payDesc
                            }

                        })
                        var personCal =[{
                            费用名称:that.personCal.name,
                            人数总计:that.personCal.totalPersons,
                            未交费人数:that.personCal.noPayPersons,
                            欠费人数:that.personCal.owedPersons,
                            已结清人数总计:that.personCal.completePersions,
                            应交金额总计:'￥'+that.personCal.totalShouldPay,
                            未交费金额总计:'￥'+that.personCal.noPayShouldPay,
                            欠费已缴金额总计:'￥'+that.personCal.owedHasPay,
                            已结清金额总计:'￥'+that.personCal.completeHasPay,
                            实际交费金额总计:'￥'+that.personCal.owedHasPay+that.personCal.completeHasPay,
                        }];
                        var fileName = that.paymentParams.name+'-按人员';
                        return alasql('SELECT * INTO XLSX("'+fileName +'.xlsx",{headers:true}) FROM ?',[personList]);
                    })
                    .catch(function (error) {
                    })
            },
            exportOrderExcel:function(){
                var that = this;
                var params={
                    paymentSubjectId:this.paymentParams.id,
                    name:'',
                    start:'',
                    lastDate:'',
                    pageNumber:1,
                    pageSize:100000,
                }
                PaymentService.getOrderCostList(params).$promise
                    .then(function (data) {
                        var personList = _.map(data.data,function(item){
                            return {
                                '付款单号':item.orderNo,
                                '交费人':item.name,
                                '身份证号':item.idNumber,
                                '支付金额':item.amount,
                                '支付时间':item.payTime,
                                '状态':that.orderState[item.orderState],
                                '支付宝订单号':item.aliOrderNo
                            }

                        })
                        var fileName = that.paymentParams.name+'-按明细';
                        return alasql('SELECT * INTO XLSX("'+fileName +'.xlsx",{headers:true}) FROM ?',[personList])
                    })
                    .catch(function (error) {
                    })
            },

            //修改截止日期
            editPersonTime:function(){
                var that = this;
                if(this.personCostData.lastDate == ''){
                    messageService.openDialog("请选择截止日期！");
                    return;
                }
                var params = {
                    id:that.personCostData.id,
                    lastDate:that.personCostData.lastDate,
                    userId:AuthService.getUser().id,
                }
                PaymentService.updatelastdate(params).$promise
                    .then(function (data) {
                        that.showPaymentTime =false;
                        that.getPersonCost(that.personCostData);
                    })
                    .catch(function (error) {
                    })
            },

            //修改支付方式
            editPersonPayment:function(){
                var _this = this;
                if(this.personCostData.smallAmount == ''&&this.personCostData.paymentType==20){
                    messageService.openDialog("请输入正确的最低支付额度！");
                    return;
                }
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

            editPayment:function(){
                this.showPaymentStyle = false;
                this.paymentStyle = this.isFullParagraph?'全款支付':((this.isFirstPayment?'首次缴费':'每次缴费')+'最低限额￥'+this.paymentAmount+'元');
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
                    orgId: AuthService.getUser().orgId,//AuthService.getUser().orgId,
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
                        _this.getPersonCost();

                    })
                    .catch(function (error) {
                    })
            },

            //返回按钮
            goBackHomePage:function(){
                $state.go('payment');
            },

            inputKeyUpFun:function(){
                this.personCostData.smallAmount = this.personCostData.smallAmount.replace(/\D/g,'')
            },
            init: function () {
                if ($stateParams.payment) {
                    this.paymentParams = $stateParams.payment;
                    this.paymentStatus = this.paymentStatusList[0];
                    this.getProfessional();
                    $rootScope.$on("timeInterval",function(event,data) {
                        if (data.id == 'startTime'){
                            $('#endTime').datepicker('setStartDate', data.time);
                        }
                        if (data.id == 'endTime'){
                            $('#startTime').datepicker('setEndDate', data.time);
                        }
                    });
                }else{
                    $state.go('payment');
                }
            }
        };
        $scope.paymentFn.init();
    });
