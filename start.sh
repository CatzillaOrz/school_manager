##此脚本用于模拟服务器发布
export OPENSHIFT_NODEJS_PORT=3004 # 可以不修改，默认端口8080

export NODE_ENV=production

export SESSION_REDIS_HOST=172.16.23.30 # 用于缓存Session的Redis服务地址， 缺省值：172.16.23.32

export SESSION_REDIS_PORT=6379 # 用于缓存Session的Redis服务端口， 缺省值：6479

export SESSION_REDIS_PASS="" # 用于缓存Session的Redis服务密码， 缺省值：Good2015

export SESSION_REDIS_DB=0 # 用于缓存Session的Redis服务DB的index， 缺省值：0

export SESSION_REDIS_PREFIX=aizhixin_frontend_session_dev: # 用于缓存Session的Redis中保存session值key的前缀， 缺省值：web_enrichmind_session:

export BACKEND_API=http://dledudev.aizhixin.com/zhixin_api #知新api

export DIANDIAN_API=http://dddev.aizhixin.com/diandian_api #企业管理api（目前的点点）

export API_GATEWAY=http://172.16.23.120:3333/

export EM_API=http://emdev.aizhixin.com/em_api2
node dist/server/app.js




