/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
/*
 * 模块路由配置常量
 * @author: Karl Sun
 * */
var MODULE_PATHS = [
    {
        expression: /^\/diandian/,
        template  : '/views/dd.html'
    }
];

module.exports = function (app) {
    /*
     * 初始化模块入口
     * @author: Karl Sun
     * */
    MODULE_PATHS.forEach(function (path) {
        app.route(path.expression)
            .get(function (req, res) {
                res.sendfile(app.get('appPath') + path.template);
            });
    });
    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets|user)/*')
        .get(errors[404]);


    // Home router
    app.route('/*')
        .get(function (req, res) {
            res.sendfile(app.get('appPath') + '/index.html');
        });
};

