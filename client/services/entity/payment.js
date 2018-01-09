angular.module('dleduWebService')
    .factory('PaymentService', function ($http,$q,$resource,Upload,CommonService,messageService,ngDialog) {
        return {
            getPaymentList:function(params){
                var paymentList = $resource('api/payment/getPaymentList');
                return paymentList.get(params);
            },
            deletePayment:function(params){
                var payment=$resource('api/payment/deletePayment');
                return payment.remove(params);
            },
            publishPayment: function (params) {
                var payment = $resource('api/payment/publishPayment','',{
                    update: {method:'PUT'}});
                return payment.update(params);
            },
            getPayment:function(params){
                var payment= $resource('api/payment/getPayment');
                return payment.get(params);
            },
            updatepaymenttype:function (params) {
                var payment = $resource('api/payment/updatepaymenttype','',{
                    update: {method:'PUT'}});
                return payment.update(params);
            },
            updatelastdate:function (params) {
                var payment = $resource('api/payment/updatelastdate','',{
                    update: {method:'PUT'}});
                return payment.update(params);
            },
            getPaymentCal:function(params){
                var paymentList = $resource('api/payment/getPaymentCal');
                return paymentList.get(params);
            },
            getProfessional:function(params){
                var paymentList = $resource('api/payment/getProfessional');
                return paymentList.get(params);
            },
            getPersonCostList:function(params){
                var paymentList = $resource('api/payment/getPersonCostList');
                return paymentList.get(params);
            },
            getOrderCostList:function(params){
                var paymentList = $resource('api/payment/getOrderCostList');
                return paymentList.get(params);
            },
            getPersonPayDetail:function(params){
                return $http({
                    method: "GET",
                    url: "api/payment/getPersonPayDetail",
                    params:params
                });
            },
            //获取环境
            importPayment: function(params,scopeObj,callback){
                CommonService.addLoading(true, 'all');
                if (params.file) {
                    Upload.upload({
                        url: '/api/payment/importPayment',
                        method: 'POST',
                        data: params
                    }).then(function(res){
                        CommonService.addLoading(false, 'all');
                        if(res.status === 200){
                            messageService.openMsg("导入成功！");
                            callback.call(scopeObj);
                        }
                    },function(res){
                        CommonService.addLoading(false, 'all');
                        if(res.data && res.data.message){
                            messageService.openMsg("导入失败!错误信息："+res.data.message+'\n请检查导入数据或重新下载模板！');
                        }else{
                            messageService.openMsg("导入失败!");
                        }
                    })
                }
            },
            updatePayment: function(params,scopeObj,callback){
                CommonService.addLoading(true, 'all');
                if (params.file) {
                    Upload.upload({
                        url: '/api/payment/updatePayment',
                        method: 'POST',
                        data: params
                    }).then(function(res){
                        CommonService.addLoading(false, 'all');
                        if(res.status === 200){
                            messageService.openMsg("重新导入成功！");
                            callback.call(scopeObj);
                        }
                    },function(res){
                        CommonService.addLoading(false, 'all');
                        if(res.data && res.data.message){
                            messageService.openMsg(res.data.message);
                        }else{
                            messageService.openMsg("导入失败!");
                        }
                    })
                }
            },

        }
    });
