/**
 * Created by Administrator on 2016/11/25.
 */
angular.module('dleduWebService')
    .factory('amapService', function (AuthService) {
        return{
            center:{},
            //获取地图对象
            getMapObj: function(container, options){
                var map = new AMap.Map(container, options);
                return map;
            },

            //保存中心点
            getCenter: function(){
                return this.center;
            },

            //根据学校名称获取位置
            getLocation: function(map){
                var user = AuthService.getUser();
                var schoolName = user.organName;
                var that=this ;
                AMap.service(["AMap.PlaceSearch"], function() {
                    var placeSearch = new AMap.PlaceSearch({ //构造地点查询类
                        pageSize: 1,
                        pageIndex: 1,
                        //city: "010", //城市,
                        type: '科教文化服务;学校;高等院校',
                        map: map,
                        panel: "panel"
                    });
                    //关键字查询
                    placeSearch.search(schoolName, function(status, result){
                        if(result && result.poiList && result.poiList.pois.length > 0){
                            var lon = result.poiList.pois[0].location.lng, lat = result.poiList.pois[0].location.lat;
                            map.setCenter([parseFloat(lon), parseFloat(lat)]);
                            that.center = {lon: parseFloat(lon), lat: parseFloat(lat)};
                        }
                    });
                });
            }
        }
    });
