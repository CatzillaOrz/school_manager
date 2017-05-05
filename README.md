# 知新学校管理平台

## 安装&运行

* Python 2.7
* Ruby
* compass:  gem install compass   //此处可使用淘宝ruby镜像， https://ruby.taobao.org/
* Node.js: https://nodejs.org/dist/v4.4+/
* c++: (Linux)`gcc-c++`,  (Widnows)`VISUAL C++ 2010 EXPRESS` or `Visual Studio 2010`  or lastest
* Bower:  npm install -g bower
* Grunt:  npm install -g grunt-cli
* pm2:    npm install -g pm2

> 补充：如果npm安装比较慢的话，可以使用cnpm(淘宝提供)代替。 安装：`npm install -g cnpm` 。安装完成后，以下部署命令中的npm都可以使用cnpm代替

### Jenkins build
    npm install
    bower install
    grunt serve
## 开发配置
    export OPENSHIFT_NODEJS_PORT=9009
    export NODE_ENV=production
    export BACKEND_API=http://dledudev.aizhixin.com/zhixin_api
    export DIANDIAN_API=http://dddev.aizhixin.com/diandian_api
    export API_GATEWAY=http://172.16.23.120:3333/org-manager
    export SESSION_REDIS_HOST=172.16.23.30
    export SESSION_REDIS_PORT=6379
    export SESSION_REDIS_DB='0'
    export SESSION_REDIS_PREFIX=dledu_web_session:
    export SESSION_DOMAIN=aizhixin.com
    pm2 start server/app.js -i 1 --name 'DLEDU_school_manager'
## 测试配置
    export OPENSHIFT_NODEJS_PORT=9009
    export NODE_ENV=production
    export BACKEND_API=http://dledutest.aizhixin.com/zhixin_api
    export DIANDIAN_API=http://ddtest.aizhixin.com/diandian_api
    export API_GATEWAY=http://172.16.23.122:3333/org-manager
    export SESSION_REDIS_HOST=172.16.23.32
    export SESSION_REDIS_PORT=6379 
    export SESSION_REDIS_PASS= 
    export SESSION_REDIS_DB=0
    export SESSION_REDIS_PREFIX=dledu_web_session
    export SESSION_DOMAIN=aizhixin.com
    pm2 start server/app.js -i 1 --name 'DLEDU_school_manager'
## 伪生产配置

