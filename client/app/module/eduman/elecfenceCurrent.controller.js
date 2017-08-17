/**
 * Created by Administrator on 2017/6/21.
 * 当天轨迹
 */
angular.module('dleduWebApp')
	.controller('ElecFenceCurrentCtrl', function ($scope, $stateParams, AuthService, EduManService) {
		$scope.ElecFenceCurrentFn={
			//当天轨迹信息
			locusList: null,
			//轨迹坐标点
			orbits: [],
			isShow: false,
			//参数
			params:{
				id: $stateParams.id,
				date: $stateParams.date,
			},

			mapObjs: {
				markersOribit: [],
				markers: [],
				lineArr: [],
				map: null
			},

			// 获取当天轨迹
			getElecFenceCurrent: function () {
				var that = this;
				var params = {
					organId: AuthService.getUser().orgId
				};
				params.userId = that.params.id;
				params.time  = that.params.date;
				EduManService.getElecFenceCurrent(params).$promise
					.then(function (data) {
						that.locusList = data;
						that.orbits = that.getOrbits(data.useElectricFenceUserDaominList);
						that.orbit(that.orbits);
					})
					.catch(function (error) {

					})
			},

			/**
			 * 从返回的数据中获取轨迹列表
			 */
			getOrbits: function(data){
				var lonlats = [];
				angular.forEach(data, function(item){
					var data = item.lltude.split('-');
					var tempArr = [];
					tempArr.push(data[0], data[1]);
					lonlats.push(tempArr);
				})
				return  lonlats;
			},


			/**
			 * 查询轨迹点信息
			 * @param id
			 */
			getOrbitValue: function(marker){
				var id = marker.getExtData();
				this.showInfoDialogOribit(marker, $scope.orbitRecord[id])
			},

			//显示轨迹时用的弹出窗口
			showInfoDialogOribit: function (marker, data){
				var content = [];
				content.push("所在地：" + (data.address ? data.address : ''));
				content.push("时间：" + (data.noticeTime ? data.noticeTime : ''));

				var infoWindow = new AMap.InfoWindow({
					isCustom: true,  //使用自定义窗体
					content: createInfoWindow('当天轨迹', content.join("<br/>")),
					offset: new AMap.Pixel(10, -45)
				});
				infoWindow.open($scope.elecMapShow.map, marker.getPosition());
			},

			/**
			 * 根据坐标值绘制轨迹
			 * @param datas
			 */
			orbit: function (datas) {
				var that = this;
				var lineArr = [], polyline, passedPolyline;
				this.mapObjs.map.remove(that.mapObjs.markersOribit);
				this.mapObjs.map.remove(that.mapObjs.markers);
				this.mapObjs.map.remove(that.mapObjs.lineArr);
				if (datas.length == 0) {
					return;
				}
				//创建marker
				for (var j = 0; j < datas.length; j++) {
					var temp = datas[j];
					var lonlat = temp;
					lineArr.push([lonlat[1], lonlat[0]]);
					var imgSrc = "http://omh5h0gd2.bkt.clouddn.com/titles.jpg";
					var content = "<div class='elecmap-tip'><img src=" + imgSrc + " style='width:20px;height:20px;'></div> ";
					var marker = new AMap.Marker({
						map: this.mapObjs.map,
						position: [lonlat[1], lonlat[0]],
						extData: j,
						content: content,
						offset: new AMap.Pixel(-7, -10)
					});
					that.mapObjs.markersOribit.push(marker);

					//鼠标点击marker弹出自定义的信息窗体
					AMap.event.addListener(marker, 'click', function (obj) {
						//$scope.getOrbitValue(obj.target);
					});
				}

				this.mapObjs.map.setFitView();
				this.mapObjs.map.setCenter([lineArr[0][0], lineArr[0][1]]);

				// 绘制轨迹
				polyline = new AMap.Polyline({
					map: that.mapObjs.map,
					path: lineArr,
					strokeColor: "#369AFF",  //线颜色
					strokeOpacity: 0.9,     //线透明度
					strokeWeight: 6,      //线宽
					// strokeStyle: "solid"  //线样式
					showDir: true
				});
				that.mapObjs.lineArr.push(polyline);



				passedPolyline = new AMap.Polyline({
					map: that.mapObjs.map,
					// path: lineArr,
					strokeColor: "#F00",  //线颜色
					// strokeOpacity: 1,     //线透明度
					strokeWeight: 3,      //线宽
					// strokeStyle: "solid"  //线样式
				});
				/*marker.on('moving',function(e){
				 passedPolyline.setPath(e.passedPath);
				 })*/
				//marker.moveAlong(lineArr, 10000);
			},



			//地图
			mapobj: function(){
				this.mapObjs.map = new AMap.Map('elecmap', {
					resizeEnable: true,
					zoom:13
				});
			},

			init: function () {
				this.mapobj();
				this.getElecFenceCurrent();
			}
	
		};
		$scope.ElecFenceCurrentFn.init();
	})
	.directive('scrollTop', function($window){
		return {
			restrict: 'A',
			scope: false,   // 默认值
			link: function(scope, element, attrs) {
				scope.ElecFenceCurrentFn.isShow = false;
				angular.element(element).on('scroll', onScroll);
				function onScroll(){
					var offsetTop = element[0].scrollTop;
					if(offsetTop > 0){
						scope.$apply(function () {
							scope.ElecFenceCurrentFn.isShow = true;
						});
					}else{
						scope.$apply(function () {
							scope.ElecFenceCurrentFn.isShow = false;
						});
					}
				}
			}
		}
	});

