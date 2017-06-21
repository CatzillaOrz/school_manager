#!/bin/bash
########################## For uat env ######################################

export OPENSHIFT_NODEJS_PORT=9009
export NODE_ENV=production
export BACKEND_API=http://dledu.dlztc.com/zhixin_api
export DIANDIAN_API=http://dd.dlztc.com/diandian_api
export EM_API=http://em.dlztc.com/em_api2
export HY_API=http://hy.dlztc.com/ew_api
export IO_API=http://io.dlztc.com
export API_GATEWAY=http://apigateway.dlztc.com/

#redis共享前缀
export SESSION_REDIS_HOST=172.16.23.31
export SESSION_REDIS_PORT=6379
export SESSION_REDIS_PASS=
export SESSION_REDIS_DB=0
export SESSION_REDIS_PREFIX=dledu_web_session
export SESSION_DOMAIN=dlztc.com
pm2 start server/app.js -i 1 --name 'DLEDU_school_manager'