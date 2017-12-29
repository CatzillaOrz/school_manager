'use strict';

var path = require('path');
var _ = require('lodash');
function requiredProcessEnv(name) {
    if (!process.env[name]) {
        throw new Error('You must set the ' + name + ' environment variable');
    }
    return process.env[name];
}

// All configurations will extend these options
// ============================================
var all = {
    env: process.env.NODE_ENV,

    // Root path of server
    root: path.normalize(__dirname + '/../../..'),

    // Server port
    port: process.env.PORT || 9000,

    // Secret for session, you will want to change this and make it an environment variable
    secrets: {
        session: 'dledu-web-secret',
        client_id: 'dleduApp'
    },

    // List of user roles
    userRoles: ['guest', 'student', 'teacher'],

    backend_api: {
        host: process.env.BACKEND_API || 'http://172.16.23.58:9093/dledu',
        //host: process.env.BACKEND_API || 'http://127.0.0.1:8080/dledu',
        diandian_host: process.env.DIANDIAN_API || 'http://dddev.aizhixin.com/diandian_api',
        em_host: process.env.EM_API ||  'http://emdev.aizhixin.com/em_api2',
        pt_host: process.env.PT_API ||  'http://ptdev.aizhixin.com/pt_api',
        hy_host: process.env.HY_API ||  'http://hy.aizhixindev.com/ew_api',
        io_host: process.env.IO_API ||  'http://iodev.aizhixin.com',
        open_host: process.env.BACKEND_OPEN_API || 'http://127.0.0.1:8080/dledu',
        api_gateway:process.env.API_GATEWAY || 'http://172.16.23.120:3333',
        pay_host:process.env.PAY_API || 'http://dddev.aizhixin.com/diandian_api',
    },

    oa: 'http://172.16.1.103',

    log4js: {
        appenders: [
            {
                type: 'console'
            },
            {
                type: 'file',
                filename: './logs/access.log',
                maxLogSize: 20480,
                backups: 10,
                category: 'access'
            },
            {
                type: 'file',
                filename: './logs/error.log',
                maxLogSize: 20480,
                backups: 10,
                category: 'error'
            }
        ],
        replaceConsole: true
    },

    cache: {
        session: {
            ttl: 2 * 60 * 60,  // 1小时过期
            host: process.env.SESSION_REDIS_HOST || '172.16.23.30',
            port: process.env.SESSION_REDIS_PORT || 6379,
            pass: process.env.SESSION_REDIS_PASS || '',
            db: process.env.SESSION_REDIS_DB || 0,
            prefix: process.env.SESSION_REDIS_PREFIX || 'aizhixin_frontend_session',
            domain: process.env.SESSION_DOMAIN || 'aizhixin.com'
        }
    }
};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
    all,
    require('./' + process.env.NODE_ENV + '.js') || {});
