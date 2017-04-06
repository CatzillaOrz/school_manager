'use strict';

/*
 * 个人资料服务
 * 查询、更新
 **/

var Promise = require('bluebird'),
  RestClient = require('./helper/RestClient'),
  Config = require('../config/environment'),
  ErrorCode = require('../common/errorCode');

var MainService = {
  getCategory: function (params, callback) {
    RestClient.get({
      path: '/api/web/v1/categories/first',
      params: params
    })
      .then(function (res) {
        if (res.status.code == 200) {
          callback(null, res.entity);
        } else {
          ErrorCode.getErrorSync(res.entity)
            .then(function (err) {
              callback(err);
            });
        }
      })
      .catch(function (e) {
        callback(e);
      });
  },
  getCompetitiveCourse: function (params, callback) {
    RestClient.get({
      path: '/api/web/v1/courses/studentNum',
      params: params
    })
      .then(function (res) {
        if (res.status.code == 200) {
          callback(null, res.entity);
        } else {
          ErrorCode.getErrorSync(res.entity)
            .then(function(err){
              callback(err);
            });
        }
      })
      .catch(function (e) {
        callback(e);
      });
  },
  getCompetitiveCourseByIDs: function (params, callback) {
    RestClient.get({
      path: '/api/web/v1/courses/ids',
      params: params
    }).then(function (res) {
      if (res.status.code == 200) {
        callback(null, res.entity);
      } else {
        ErrorCode.getErrorSync(res.entity)
          .then(function(err){
            callback(err);
          });
      }
    }).catch(function (e) {
      callback(e);
    });
  },
  getNewCourse: function (params, callback) {
    RestClient.get({
      path: '/api/web/v1/courses',
      params: params
    })
      .then(function (res) {
        if (res.status.code == 200) {
          callback(null, res.entity);
        } else {
          ErrorCode.getErrorSync(res.entity)
            .then(function(err){
              callback(err);
            });
        }
      })
      .catch(function (e) {
        callback(e);
      });
  },
  getCourseByCategoryId: function (params, callback) {
    RestClient.get({
      path: '/api/web/v1/courses/first',
      params: params
    })
      .then(function (res) {
        if (res.status.code == 200) {
          callback(null, res.entity);
        } else {
          ErrorCode.getErrorSync(res.entity)
            .then(function(err){
              callback(err);
            });
        }
      })
      .catch(function (e) {
        callback(e);
      });
  }
};

Promise.promisifyAll(MainService, {suffix: "Sync"});

module.exports = MainService;

