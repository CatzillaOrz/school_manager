/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
    .controller('instructorAttendCtrl', function ($scope, $state, AuthService, Select2LoadOptionsService, CollegeService, ClassService, EduManService, tempStorageService, MajorService, $timeout, messageService, ngDialog) {
        //当天时间
        var today = new Date().Format("yyyy-MM-dd");
        $scope.insAttendFn={
            currentEntity: {},
            collegeDropList:[],
            params:{
                collegeId:""

            },
            map:null,
            markers:[],
            infoWindow:{},
            //分页参数
            page: {
                totalElements: 0,
                totalPages: 0,
                pageNumber: 0,
                pageSize: 10
            },
            testEntity:{
                map:this.map,
                position:[116.382122,39.921176],
                data:{
                    id:1,
                    name:"新刚1",
                    number:'sdsd'
                }
            },
            //select2动态关键字查询列表配置
            selectCollege2Options: function () {
                var _this = this;
                return {

                    ajax: Select2LoadOptionsService.getLoadOptions("api/college/getCollegeDropList", {
                        orgId: AuthService.getUser().orgId,
                        pageNumber: 1,
                        pageSize: 100,
                        managerId: AuthService.getUser().id
                    }, "name"),

                    templateResult: function (data) {

                        if (data.id === '') { // adjust for custom placeholder values
                            _this.collegeDropList = [];
                            return '按班级筛选';
                        }
                        _this.collegeDropList.push(data);
                        return data.name;
                    },
                    placeholder: {
                        id: -1, // the value of the option
                        text: '全部'
                    },
                    allowClear: true
                }
            },
            //创建地图
            createMap:function (position) {
                var _this=this;
                if(!_this.map){
                    _this.map=new AMap.Map("mapContainer", {
                        resizeEnable: true,
                        center: [position.x, position.y],
                        zoom: 13
                    });
                }

            },
            //修改地图中心点
            setMapCenter:function(position){
               var _this=this;
               _this.map.setCenter(position);
           },
            //创建标记
            createMaker:function (lnglats) {
                var _this=this;
                _this.map.clearMap();
                _this.markers=[];
                for(var i = 0,marker; i < lnglats.length; i++){
                    marker=new AMap.Marker({
                        position:lnglats[i],
                        map:_this.map,
                        icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                    });
                    marker.data={
                        id:i,
                        name:"新刚"+i,
                        number:'sdsd'
                    };
                    //给Marker绑定单击事件
                    marker.on('click', _this.markerClick);
                    _this.markers.push(marker);
                }
            },
            //创建弹出框
            openInfoWindow:function(map,posions,data) {
                var _this=this;
                //构建信息窗体中显示的内容
                var info = [];
                info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>"+data.name+"</b>");
                info.push("电话 : 010-84107000   邮编 : 100102");
                info.push("地址 :北京市朝阳区望京阜荣街10号首开广场4层</div></div>");

                _this.infoWindow = new AMap.InfoWindow({
                    content: info.join("<br>") , //使用默认信息窗体框样式，显示信息内容
                    offset: new AMap.Pixel(0, -30)
                });
                _this.infoWindow.open(map, posions);
                //图标更换
                angular.forEach(_this.markers,function (marker) {
                    if(marker.data.id==data.id){
                        marker.setIcon("http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png");
                    }else {
                        marker.setIcon("http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png");
                    }
                })
            },
            //标记物点击事件
            markerClick:function (e) {
                var _this=$scope.insAttendFn;
                _this.openInfoWindow(_this.map, e.target.getPosition(),e.target.data);
            },

            init:function () {
               var _this=this;
               var position={
                x:116.40,
                y:39.91
               };
                var lnglats=[//也可以使用LngLat对象
                    [116.368904,39.923423],[116.382122,39.921176],
                    [116.387271,39.922501],[116.398258,39.914600]
                ];
                _this.createMap(position);
                _this.createMaker(lnglats);
            }
        };
        $scope.insAttendFn.init();
    });