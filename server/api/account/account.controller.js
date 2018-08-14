/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash'),
    AccountService = require('../../services/accountService'),
    SecurityCode = require('../../middleware/securityCode');

// Get list of things
module.exports = {
    index: function (req, res) {
        AccountService.getAccountSync(req.user.access_token)
            .then(function (account) {
                res.json(account);
            })
            .catch(function (e) {
                res.status(500).send(e.message);
            });

    },
    signOut: function (req, res) {
        delete req.session.oauth;
        res.send('ok');
    },
    validEmail: function (req, res) {
        AccountService.validEmailSync(req.query.code)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    },
    sendPhoneCode: function (req, res) {
        var phoneNumber = req.body.phoneNumber;
        AccountService.sendPhoneCodeSync(phoneNumber)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(403).json(e);
            });
    },
    validPhoneCode: function (req, res) {
        var phoneNumber = req.query.phoneNumber,
            code = req.query.code;
        AccountService.validPhoneCodeSync(phoneNumber, code)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(403).json(e);
            });
    },

    resetPassword: function (req, res) {
        AccountService.resetPasswordSync(req.query.id, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    },
    unlockBindPhoneAndResetPassword: function (req, res) {
        AccountService.unlockBindPhoneAndResetPasswordSync(req.query.id, req.user.access_token)
            .then(function (data) {
                res.json(data);
            })
            .catch(function (e) {
                res.status(500).json(e);
            });
    },
};
