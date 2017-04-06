'use strict';

var _ = require('lodash'),
  MainService = require('../../services/mainService');

module.exports = {
  getCategory: function(req, res){
    //console.log('OOOOO')
   var  limit=req.query.limit;
   var  offset=req.query.offset;
    MainService.getCategorySync({
      limit:limit,
      offset:offset
    })
      .then(function(data){
        res.json(data);
      })
      .catch(function(err){
        res.status(405).json({
          message: err.message,
          code: err.code
        })
      });
    },
    getCompetitiveCourse: function(req, res){
        //console.log('OOOOO')
       var  limit=req.query.limit;
       var  offset=req.query.offset;
        MainService.getCompetitiveCourseSync({
          limit:limit,
          offset:offset
        }).then(function(data){
            res.json(data);
        }).catch(function(err){
            res.status(405).json({
              message: err.message,
              code: err.code
            })
          });
      },
  getCompetitiveCourseByIDs: function(req, res) {
    //console.log('OOOOO')
    var  limit=req.query.limit;
    var  offset=req.query.offset
    var  ids=req.query.ids;
    MainService.getCompetitiveCourseByIDsSync({
      limit:limit,
      offset:offset,
      ids:ids
    }).then(function(data){
      res.json(data);
    }).catch(function(err){
      res.status(405).json({
        message: err.message,
        code: err.code
      })
    });
  },
    getNewCourse: function(req, res){
          //console.log('OOOOO')
         var  limit=req.query.limit;
         var  offset=req.query.offset;
          MainService.getNewCourseSync({
            limit:limit,
            offset:offset
          })
            .then(function(data){
              res.json(data);
            })
            .catch(function(err){
              res.status(405).json({
                message: err.message,
                code: err.code
              })
            });
      },
    getCourseByCategoryId: function(req, res){
            //console.log('OOOOO')
           var  limit=req.query.limit;
           var  offset=req.query.offset;
           var  categoryId=req.query.categoryId;
            MainService.getCourseByCategoryIdSync({
              limit:limit,
              offset:offset,
              categoryId:categoryId
            })
              .then(function(data){
                res.json(data);
              })
              .catch(function(err){
                res.status(405).json({
                  message: err.message,
                  code: err.code
                })
              });
        },
}


