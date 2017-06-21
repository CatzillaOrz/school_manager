#!/bin/bash
########################## For develop env ######################################
export OPENSHIFT_NODEJS_PORT=9009
export NODE_ENV=production
export BACKEND_API=http://dledudev.aizhixin.com/zhixin_api
export DIANDIAN_API=http://dddev.aizhixin.com/diandian_api
export EM_API=http://emdev.aizhixin.com/em_api2
export HY_API=http://hydev.aizhixin.com /ew_api
export IO_API=http://iodev.aizhixin.com
export API_GATEWAY=http://172.16.23.120:3333/

#redis共享前缀
export SESSION_REDIS_HOST=172.16.23.30
export SESSION_REDIS_PORT=6379
export SESSION_REDIS_DB='0'
export SESSION_REDIS_PASS=
export SESSION_REDIS_PREFIX=dledu_web_session
export SESSION_DOMAIN=aizhixin.com

pm2 start server/app.js -i 1 --name 'DLEDU_school_manager'

