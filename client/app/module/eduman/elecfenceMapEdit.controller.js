/**
 * Created by Administrator on 2017/6/21.
 * 电子围栏地图编辑
 */
angular.module('dleduWebApp')
	.controller('ElecFenceMapEditCtrl', function ($scope, $state, AuthService, EduManService, amapService, messageService) {
		$scope.ElecFenceCreateFn = {
			isDisabled: false,//不存在多边形时
			polyVer: [],
			polyVers: [],  //多边形顶点数组
			polygons: [], //保存多边形
			mousetool: null, //mousetool插件对象
			polygonEditor: null,
			polyObj: null,
			targetObj: null,
			mapObj: null,

			/**
			 * 加载设置
			 */
			loadSetInfo: function(){
				var that = this;
				EduManService.getElecSetInfo({organId: AuthService.getUser().orgId}).$promise
					.then(function(data){
						if(!data){//第一次进入设置
							that.isDisabled = false;
						}else {//初始化选择的数据
							that.record = data;
							that.polyVer = data.lltudes;
							//选择类型
							if(that.polyVer && that.polyVer.length > 0){
								that.isDisabled = true;
							}
							that.startDraw();
						}
					})
					.catch(function(e){

					});
			},

			//加载地图插件
			loadMouseTool: function(){
				var that = this;
				this.mapObj.plugin(["AMap.MouseTool"], function () {//鼠标工具插件
					that.mousetool = new AMap.MouseTool(that.mapObj);
					that.mousetool.polygon();
					AMap.event.addListener(that.mousetool, 'draw', function (obj) {
						that.polyObj = obj.obj;
						var vertexs = that.polyObj.getPath();
						var verNew = [];
						for(var i = 0, length = vertexs.length; i < length; i++){
							var temp = vertexs[i];
							if(temp.I && temp.L){
								verNew.push({longitude: temp.I, latitude: temp.L});
							}else{
								verNew.push({longitude: temp.lng, latitude: temp.lat});
							}
						}
						that.mapObj.remove([that.polyObj]);
						that.polyVers.push(verNew);
						that.polyVer = [verNew];
						that.isDisabled = true;
						$scope.$apply();
						that.startDraw();
					});
				});
			},

			/**
			 * 编辑多边形
			 */
			startDraw: function(){
				var that = this;
				if(this.isDisabled){
					var polygons = this.polyVer, ver = [];
					this.mapObj.setCenter([parseFloat(this.polyVer[0][0].longitude), parseFloat(this.polyVer[0][1].latitude)]);
					this.mapObj.plugin(["AMap.PolyEditor"], function () {
						for(var i = 0; i < polygons.length; i++){
							ver = [];
							var polygonVer = polygons[i];
							for(var j = 0; j < polygonVer.length; j++){
								ver.push([parseFloat(polygonVer[j].longitude), parseFloat(polygonVer[j].latitude)]);
							}
							var polygonObj = new AMap.Polygon({
								path: ver,    //设置多边形轮廓的节点数组
								strokeColor:"#1791fc",
								strokeOpacity:0.8,
								strokeWeight:2,
								fillColor: "#1791fc",
								fillOpacity: 0.35
							});
							polygonObj.setMap(that.mapObj);


							var contextMenu = new AMap.ContextMenu();  //创建右键菜单
							//添加菜单
							contextMenu.addItem("删除", function() {
								if(this.polygonEditor){
									that.polygonEditor.close();
								}
								that.mapObj.remove(that.targetObj);
								var polygons = that.mapObj.getAllOverlays('polygon');
								if(polygons.length == 0){
									$scope.$apply(function () {
										that.isDisabled = false;
									});
								}
							}, 0);
							//添加菜单
							contextMenu.addItem("编辑", function() {
								if(this.polygonEditor){
									that.polygonEditor.close();
								}
								that.polygonEditor = new AMap.PolyEditor(that.mapObj, that.targetObj);
								that.polygonEditor.open();
							}, 1);
							AMap.event.addListener(polygonObj,'rightclick',function(e){
								that.targetObj = e.target;
								contextMenu.open(that.mapObj, e.lnglat);
							});
						}
					});
				}else{
					this.mousetool.polygon();
				}
			},

			//删除多边形
			delDraw: function(){
				if(this.polygonEditor){
					this.polygonEditor.close();
				}
				this.polyVer = [];
				this.mapObj.clearMap();
				this.isDisabled = false;
			},

			/**
			 * 保存设置
			 */
			saveDraw: function(){
				var polygons = this.mapObj.getAllOverlays('polygon');
				if(polygons.length == 0){
					messageService.openMsg("请绘制多边形!");
					return;
				}
				var itemVer = [], itemVers = [];
				for(var j = 0; j < polygons.length; j++){
					var polygon = polygons[j];
					var vertexs = polygon.getPath();
					itemVer = [];
					for(var i = 0, length = vertexs.length; i < length; i++){
						var temp = vertexs[i];
						if(temp.I && temp.L){
							itemVer.push({longitude: temp.I, latitude: temp.L});
						}else{
							itemVer.push({longitude: temp.lng, latitude: temp.lat});
						}
					}
					itemVers.push(itemVer);
				}
				if(!this.record){
					var params = {lltudes: itemVers, monitorDate: [], nomonitorDate: [], semesterId: 0};
					this.record = params;
				}else{
					if(this.polyVers.length > 0){
						this.record.lltudes = itemVers;
					}else{
						this.record.lltudes = itemVers;
					}

					if(!this.record.monitorDate){
						this.record.monitorDate = [];
					}
					if(!this.record.nomonitorDate){
						this.record.nomonitorDate = [];
					}
				}
				this.record.organId = AuthService.getUser().orgId;
				EduManService.setElecFenceInfo(this.record).$promise
					.then(function(data){
						if(data.trueMSG){
							messageService.openMsg("保存成功!");
						}else{
							messageService.openMsg("保存失败!");
						}
						$state.go('elecfencecreate');
					})
					.catch(function(e){

					})
			},

			init: function () {
				this.mapObj = amapService.getMapObj("elecmap", {
					resizeEnable: true,
					zoom:13
				});
				/*amapService.getLocation(this.map);
				var center = amapService.getCenter();
				if(center.lon && center.lat){
					this.map.setCenter([center.lon, center.lat]);
				}*/
				this.loadMouseTool();
				this.loadSetInfo();
			}
		};
		$scope.ElecFenceCreateFn.init();
	});