'use strict';
var Promise = require('bluebird'),
    RestClient = require('./helper/RestClient'),
    ErrorCode = require('../common/errorCode'),
    Config = require('../config/environment'),
    fs = require('fs'),
    request = require('request');

var paymentService = {
    getPaymentList: function (params,callback) {
        RestClient.get({
                host:'pay',
                path: '/v1/paymentsubject/list',
                params: params
            })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function(err){
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },
    deletePayment: function (params,callback) {
        RestClient.delete({
            host: 'pay',
            path: '/v1/paymentsubject/delete/' + params.id,
            params: {userId: params.userId}
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }).catch(function (e) {
            callback(e);
        });
    },
    publishPayment: function (params, callback) {
        RestClient.put({
            host: 'pay',
            path: '/v1/paymentsubject/publish/'+ params.id,
            params: {userId: params.userId}
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }).catch(function (e) {
            callback(e);
        });
    },
    updatepaymenttype: function (params, callback) {
        RestClient.put({
            host: 'pay',
            path: '/v1/paymentsubject/updatepaymenttype',
            params: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }).catch(function (e) {
            console.log(e);
            callback(e);
        });
    },
    updatelastdate: function (params, callback) {
        RestClient.put({
            host: 'pay',
            path: '/v1/paymentsubject/updatelastdate',
            params: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }).catch(function (e) {
            callback(e);
        });
    },
    getPaymentCal: function (params,callback) {
        RestClient.get({
                host:'pay',
                path: '/v1/paymentsubject/cal',
                params:params
            })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function(err){
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },
    getPayment: function (params,callback) {
        RestClient.get({
                host:'pay',
                path: '/v1/paymentsubject/get/'+params.id,
            })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function(err){
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },
    getProfessional: function (params,callback) {
        RestClient.get({
                host:'gateway-org',
                path: '/v1/professionnal/list',
                params:params
            })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function(err){
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },
    getPersonCostList: function (params,callback) {
        RestClient.get({
                host:'pay',
                path: '/v1/personcost/list',
                params:params
            })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function(err){
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },
    getOrderCostList: function (params,callback) {
        RestClient.get({
                host:'pay',
                path: '/v1/orderitem/list',
                params:params
            })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function(err){
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },
    getPersonPayDetail: function (params,callback) {
        RestClient.get({
                host:'pay',
                path: '/v1/orderitem/simplelist',
                params:params
            })
            .then(function (res) {
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function(err){
                            callback(err);
                        });
                }
            })
            .catch(function (e) {
                callback(e);
            });
    },
    upload: function (options, callback) {
        console.log(encodeURI(Config.backend_api.api_gateway + "zuul/paycallback" +  options.path));
        var r = request.post({
            uri: encodeURI(Config.backend_api.api_gateway + "paycallback" +  options.path),
        }, function (err, res, body) {
            if (err) {
                console.log(err);
                callback(err);
                return;
            }
            callback(err, res);
        });
        var form = r.form();
        form.append(options.fileKey, fs.createReadStream(options.filePath));
    },
    uploadPayment: function (options, callback) {
        console.log(encodeURI(Config.backend_api.api_gateway + "zuul/paycallback" +  options.path));
        var r = request.put({
            uri: encodeURI(Config.backend_api.api_gateway + "zuul/paycallback" +  options.path),
        }, function (err, res, body) {
            if (err) {
                console.log(err);
                callback(err);
                return;
            }
            callback(err, res);
        });
        var form = r.form();
        form.append(options.fileKey, fs.createReadStream(options.filePath));
    },

    deleteTempFile: function(fileUrl){
        var that = this;
        var files = fs.readdirSync(fileUrl);//读取该文件夹
        files.forEach(function(file){
            var stats = fs.statSync(fileUrl+'/' + file);
            if(stats.isDirectory()){
                that.deleteTempFile(fileUrl+'/'+file);
            }else{
                fs.unlinkSync(fileUrl+'/'+file);
                console.log("删除文件"+fileUrl+'/'+file+"成功");

            }

        });
    },
    updatePayment: function (filePath,params,callback) {
        var that = this;
        this.uploadPayment({
            host: 'pay',
            path: '/v1/paymentsubject/update' +
            '?fileName=' +params.fileName +
            '&id=' +params.id +
            (params.paymentType ? '&paymentType=' +params.paymentType : "") +
            (params.smallAmount ? '&smallAmount=' +params.smallAmount : "")+
            (params.installmentRate ? '&installmentRate=' +params.installmentRate : "") +
            '&lastDate=' +params.lastDate+
            '&orgId=' +params.orgId+
            '&userId=' +params.userId,
            filePath: filePath,
            fileKey: 'file'
        }, function (err, res) {
            that.deleteTempFile('./uploads/');
            if (err) {
                callback(err);
                return;
            }
            if (res.statusCode === 200 || res.statusCode === 426) {
                if(res.body == ''){
                    callback(null, JSON.parse('{"success":true}'));
                }else{
                    callback(null, res.body);
                }
            } else {
                callback(function(){
                    return {
                        code: JSON.parse(res.body).code,
                        message: JSON.parse(res.body).cause
                    };
                }());
            }
        })
    },

    importPayment: function (filePath,params,callback) {
        var that = this;
        this.upload({
            host: 'pay',
            path: '/v1/paymentsubject/add' +
            '?fileName=' +params.fileName +
            (params.paymentType ? '&paymentType=' +params.paymentType : "") +
            (params.smallAmount ? '&smallAmount=' +params.smallAmount : "")+
            (params.installmentRate ? '&installmentRate=' +params.installmentRate : "") +
            '&lastDate=' +params.lastDate+
            '&orgId=' +params.orgId+
            '&userId=' +params.userId,
            filePath: filePath,
            fileKey: 'file'
        }, function (err, res) {
            that.deleteTempFile('./uploads/');
            if (err) {
                callback(err);
                return;
            }
            if (res.statusCode === 200 || res.statusCode === 426) {
                if(res.body == ''){
                    callback(null, JSON.parse('{"success":true}'));
                }else{
                    callback(null, res.body);
                }
            } else {
                console.log(res.body.cause);
                callback(function(){
                    return {
                        code: JSON.parse(res.body).code,
                        message: JSON.parse(res.body).cause
                    };
                }());
            }
        })
    },
    addPersonalCost: function (filePath,params,callback) {
        var that = this;
        this.upload({
            host: 'pay',
            path: '/v1/paymentsubject/addpersonalcost' +
            '?paymentSubjectId=' +params.paymentSubjectId+
            '&userId=' +params.userId,
            filePath: filePath,
            fileKey: 'file'
        }, function (err, res) {
            that.deleteTempFile('./uploads/');
            if (err) {
                callback(err);
                return;
            }
            if (res.statusCode === 200 || res.statusCode === 426) {
                if(res.body == ''){
                    callback(null, JSON.parse('{"success":true}'));
                }else{
                    callback(null, res.body);
                }
            } else {
                console.log(res.body.cause);
                callback(function(){
                    return {
                        code: JSON.parse(res.body).code,
                        message: JSON.parse(res.body).cause
                    };
                }());
            }
        })
    },
    stopPublishPayment: function (params, callback) {
        RestClient.put({
            host: 'pay',
            path: '/v1/paymentsubject/cansel/'+params.id,
            params: params
        }).then(function (res) {
            if (res.status.code == 200) {
                callback(null, res.entity);
            } else {
                callback(ErrorCode.errorHandle(res));
            }
        }).catch(function (e) {
            callback(e);
        });
    },
};

Promise.promisifyAll(paymentService, {suffix: "Sync"});
module.exports = paymentService;
