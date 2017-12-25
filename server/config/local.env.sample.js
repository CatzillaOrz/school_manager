'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
    DOMAIN        : 'http://localhost:9000',
    SESSION_SECRET: 'dleduweb-secret',
    BACKEND_API   : 'http://dledu.aizhixindev.com/zhixin_api',
    DIANDIAN_API: 'http://dd.aizhixindev.com/diandian_api',
    IO_API: 'http://io.aizhixindev.com',
    API_GATEWAY:'http://gateway.aizhixintest.com',
    //redis
    SESSION_REDIS_HOST: '172.16.23.30',
    SESSION_REDIS_PORT  : 6379,
    SESSION_REDIS_PASS: '',
    SESSION_REDIS_DB    : 0,
    SESSION_REDIS_PREFIX: 'aizhixin_frontend_session_dev:',

    SESSION_DOMAIN:'localhost',
    //debug
    DEBUG               : ''
};
