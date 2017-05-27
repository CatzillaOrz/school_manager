'use strict';

var passport       = require('passport'),
    LocalStrategy  = require('passport-local').Strategy,
    _              = require('lodash'),
    AccountService = require('../services/accountService');

var API_REGX            = /^\/api/,
    MIN_REFRESH_SECONDS = 4 * 40 * 1000; //1 * 60 * 60 * 1000;

module.exports = function (app) {

// refresh access token
    app.use(function (req, res, next) {
        res.clearCookie('dledu.sid',{path:'/',domain:'pt.aizhixin.com'});
        res.clearCookie('dledu.sid',{path:'/',domain:'ptdev.aizhixin.com'});
        res.clearCookie('dledu.sid',{path:'/',domain:'pttest.aizhixin.com'});
        if (req.session.oauth && !req.session._refresh_token && API_REGX.test(req.url)) {
            var _time_offset = new Date().getTime() - req.session.oauth.timestamp;
            if (_time_offset > req.session.oauth.timestamp_left) {
                req.session._refresh_token = true;
                AccountService.refreshTokenSync(req.session.oauth.refresh_token)
                    .then(function (oauth) {
                        req.session.oauth = oauth;
                        req.session.oauth.timestamp_left = req.session.oauth.expires_in * 1000;
                        req.session.oauth.timestamp = new Date().getTime();
                        req.session._refresh_token = false;
                        next();
                    })
                    .catch(function (err) {
                        console.log('[passport refresh token]error: ' + err.message);
                        req.session._refresh_token = false;
                        next();
                    });
                return;
            }
        }
        next();
    });


    app.post('/api/signin',
        //passport.authenticate('local', {}),
        function (req, res) {
            var username = req.body.username,
                password = req.body.password,
                _oauth   = null;
            AccountService.signInSync({
                username: username,
                password: password
            }).then(function (oauth) {
                _oauth = oauth;
                return AccountService.getAccountSync(oauth.access_token);
            }).then(function (account) {
                req.session.oauth = _oauth;
                req.session.oauth.timestamp_left = req.session.oauth.expires_in * 1000;
                req.session.oauth.timestamp = new Date().getTime();
                res.json(account);
            })
                .catch(function (e) {
                    res.status(401).json({
                        code   : 401,
                        message: e.message
                    });
                });
        });

    app.get('/api/verified/oauth',
        function (req, res) {
            req.session.oauth = {
                access_token: req.query.pt
            };
            res.cookie('authorize', 'true', {path: '/'});
            res.cookie('getuserflag', 'true', {path: '/'});
            res.redirect('/dashboard');
        });
};