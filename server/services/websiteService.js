/**
 * 在线教育平台网站管理服务
 */

'use strict';

var Promise = require('bluebird'),
  RestClient = require('./helper/RestClient'),
  Config = require('../config/environment'),
  ErrorCode = require('../common/errorCode');

var WebsiteService = {
  /**
   * 根据页面编码、状态查询所有资源
   * }
   */
    find: function(callback) {

        RestClient.get({
                path: '/api/web/v1/conMan/getAllRes'
            }).then(function(res) {
                //console.log(res);
                if (res.status.code == 200) {
                    callback(null, res.entity);
                } else {
                    ErrorCode.getErrorSync(res.entity)
                        .then(function(err){
                            callback(err);
                        });
                }
            })
            .catch(function(e) {
                callback(e);
            });
    }

};

Promise.promisifyAll(WebsiteService, {
  suffix: "Sync"
});

module.exports = WebsiteService;
