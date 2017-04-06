'use strict';

var _ = require('lodash'),
    UserService = require('../../services/userService');

module.exports = {
    updateUser: function(req, res){
        UserService.updateUserSync(req.user.access_token, req.body)
            .then(function (msg){
                res.json(msg);
            })
            .catch(function (e){
                res.status(405).json({
                    message: err.message,
                    code: err.code
                })
            });
    },
    updatePassword: function(req, res){
        UserService.updatePasswordSync(req.user.access_token, req.body)
            .then(function(data){
                res.json(data);
            })
            .catch(function(err){
                res.status(405).json({
                    message: err.message,
                    code: err.code
                })
            });
    },
    updatePasswordBindPhone: function(req, res){
        UserService.updatePasswordBindPhoneSync(req.user.access_token, req.body)
            .then(function(data){
                res.json(data);
            })
            .catch(function(err){
                res.status(405).json({
                    message: err.message,
                    code: err.code
                })
            });
    },
    sendBindPhoneCode: function(req, res){
        UserService.sendBindPhoneCodeSync(req.user.access_token, req.body)
            .then(function(data){
                res.json(data);
            })
            .catch(function(err){
                res.status(405).json({
                    message: err.message || err.cause,
                    code: err.code
                })
            });
    },
    sendPhoneCode: function(req, res){
        UserService.sendPhoneCodeSync(req.user.access_token)
            .then(function(data){
                res.json(data);
            })
            .catch(function(err){
                res.status(405).json({
                    message: err.message,
                    code: err.code
                })
            });
    },
    sendUnBindPhoneCode: function(req, res){
        UserService.sendUnBindPhoneCodeSync(req.user.access_token)
            .then(function(data){
                res.json(data);
            })
            .catch(function(err){
                res.status(405).json({
                    message: err.message,
                    code: err.code
                })
            });
    },
    bindPhone: function(req, res){
        UserService.bindPhoneSync(req.user.access_token, req.body)
            .then(function(data){
                res.json(data);
            })
            .catch(function(err){
                res.status(405).json({
                    message: err.message,
                    code: err.code
                })
            });
    },
    unBindPhone: function(req, res){
        UserService.unBindPhoneSync(req.user.access_token, req.body)
            .then(function(data){
                res.json(data);
            })
            .catch(function(err){
                res.status(405).json({
                    message: err.message,
                    code: err.code
                })
            });
    },
    sendBindMailCode: function(req, res){
        UserService.sendBindMailCodeSync(req.user.access_token, req.body)
            .then(function(data){
                res.json(data);
            })
            .catch(function(err){
                res.status(405).json({
                    message: err.message,
                    code: err.code
                })
            });
    },
    sendUnBindMailCode: function(req, res){
        UserService.sendUnBindMailCodeSync(req.user.access_token, req.body)
            .then(function(data){
                res.json(data);
            })
            .catch(function(err){
                res.status(405).json({
                    message: err.message,
                    code: err.code
                })
            });
    },
    bindMail: function(req, res){
        UserService.bindMailSync(req.user.access_token, req.body)
            .then(function(data){
                res.json(data);
            })
            .catch(function(err){
                res.status(405).json({
                    message: err.message,
                    code: err.code
                })
            });
    },
    unBindMail: function(req, res){
        UserService.unBindMailSync(req.user.access_token, req.body)
            .then(function(data){
                res.json(data);
            })
            .catch(function(err){
                res.status(405).json({
                    message: err.message,
                    code: err.code
                })
            });
    },
    vildCode: function(req, res){
        console.log(req.query);
        UserService.vildCodeSync(req.user.access_token, req.query)
            .then(function(data){
                res.json(data);
            })
            .catch(function(err){
                res.status(405).json({
                    message: err.message,
                    code: err.code
                })
            });
    },
    changePhone: function(req, res){
        UserService.changePhoneSync(req.user.access_token, req.body)
            .then(function(data){
                res.json(data);
            })
            .catch(function(err){
                res.status(405).json({
                    message: err.message,
                    code: err.code
                })
            });
    }
};


