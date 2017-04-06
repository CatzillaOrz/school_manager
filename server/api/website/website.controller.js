'use strict';

var _ = require('lodash'),
    WebsiteService = require('../../services/websiteService'),
    defaultJson=require('../../config/homePage.json')

module.exports = {
    find: function(req, res) {
        WebsiteService.findSync()
            .then(function(resources) {
                if(resources.length>0){
                    //判断是否有值
                    for(var i = 0; i < resources.length; i++){
                      //首页管理
                      var temp =  resources[i];
                      var busId = temp.id;
                      if(busId == 1 || busId == 2 || busId == 4 ||  busId == 6 || busId == 27 ){
                        var data = temp.data;
                        if(data.length == 0){
                          for(var k = 0; k < defaultJson.length; k++){
                            if(busId == defaultJson[k].id){
                              temp.data = defaultJson[k].data;
                            }
                          }
                        }else{
                          for(var j = 0; j < data.length; j++){
                            var itemsId = data[j].id;
                            var itemsData = data[j].items;
                            if(itemsId == 7 || itemsId == 8 || itemsId == 9 || itemsId == 10 || itemsId == 11 ||
                              itemsId == 12 || itemsId == 13 || itemsId == 14 || itemsId == 15 ||
                              itemsId == 16 || itemsId == 19 || itemsId == 21 ||
                              itemsId == 23 || itemsId == 25 || itemsId == 29 || itemsId == 31 || itemsId == 33){
                              if(itemsData.length == 0){
                                for(var m = 0; m < defaultJson[i].data.length; m++){
                                  if(itemsId == defaultJson[i].data[m].id){
                                    temp.data[j].items = defaultJson[i].data[m].items;
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    res.json(resources);
                }else{
                    res.json(defaultJson);
                }

            })
            .catch(function(e) {
                res.json(defaultJson);
                res.status(500).send(e.message);

            });
    }
}
