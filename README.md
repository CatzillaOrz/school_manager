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

### For Dev

* 修改业务服务接口等环境变量配置，可以复制 server/config/local.env.sample.js 为 server/config/local.env.js。 如添加变量：BACKEND_API: 'http://172.16.40.62:8080/dledu'

> $ npm install

> $ bower install

> $ grunt serve

### For Test

> $ pm2 delete school_manager    // 如果school_manager不在pm2的list中（$ pm2 list 查看）则不执行此命令

> $ npm install

> $ bower install --allow-root

> $ grunt build

> $ cd dist

> $ export OPENSHIFT_NODEJS_PORT={PORT}     // 端口自定,不设置此变量则默认为8080

> $ export NODE_ENV=production

> $ export BACKEND_API=http://dledudev.aizhixin.com/zhixin_api   // 知新登录验证api

> $ export DIANDIAN_API=http://dddev.aizhixin.com/diandian_api   // 点点api

> $ export API_GATEWAY=http://172.16.23.120:3333/org-manager   // org-manage api

> $ export SESSION_REDIS_HOST=172.16.23.32   // 用于缓存Session的Redis服务地址， 缺省值：`172.16.23.32`

> $ export SESSION_REDIS_PORT=6379   // 用于缓存Session的Redis服务端口， 缺省值：`6479`

> $ export SESSION_REDIS_PASS=   // 用于缓存Session的Redis服务密码， 缺省值：``

> $ export SESSION_REDIS_DB=0                // 用于缓存Session的Redis服务DB的index， 缺省值：`0`

> $ export SESSION_REDIS_PREFIX=dledu_web_session   // 用于缓存Session的Redis中保存session值key的前缀， 缺省值：`dledu_web_session`

> $ pm2 start server/app.js -i max --name 'school_manager'

### For Production

> $ grunt build              // 开发环境或测试环境build

> $ cp dist {target folder}    // 打包或直接拷贝dist目录下文件至部署服务器上

> //以下命令在部署服务器终端执行

> $ pm2 delete DLEDU_Web     // 如果DLEDU_Web不在pm2的list中（$ pm2 list 查看）则不执行此命令

> $ export OPENSHIFT_NODEJS_PORT={PORT}     // 端口自定,不设置此变量则默认为8080

> $ export NODE_ENV=production

> $ export BACKEND_API=http://dledudev.aizhixin.com/zhixin_api   // 知新登录验证api

> $ export DIANDIAN_API=http://dddev.aizhixin.com/diandian_api   // 点点api

> $ export API_GATEWAY=http://172.16.23.120:3333/org-manager   // org-manage api

> $ export SESSION_REDIS_HOST=172.16.23.32   // 用于缓存Session的Redis服务地址， 缺省值：`172.16.23.32`

> $ export SESSION_REDIS_PORT=6379   // 用于缓存Session的Redis服务端口， 缺省值：`6479`

> $ export SESSION_REDIS_PASS=   // 用于缓存Session的Redis服务密码， 缺省值：``

> $ export SESSION_REDIS_DB=0                // 用于缓存Session的Redis服务DB的index， 缺省值：`0`

> $ export SESSION_REDIS_PREFIX=dledu_web_session   // 用于缓存Session的Redis中保存session值key的前缀， 缺省值：`dledu_web_session`

> $ npm install --production

> $ pm2 start server/app.js -i max --name 'school_manager'

## Main Stack

> * Node.js

> * Express
  
> * Angular.js
  
> * Jade
  
> * Socket.io
  
> * Grunt

> * Bower

> * moment

> * bluebird

> * rest

> * bootstrap

> * lodash

> * flexpaper

> * kindeditor

> * echarts
