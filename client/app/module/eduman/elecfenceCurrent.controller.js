/**
 * Created by Administrator on 2017/6/21.
 * 当天轨迹
 */
angular.module('dleduWebApp')
	.controller('ElecFenceCurrentCtrl', function ($scope, AuthService, EduManService) {
		$scope.ElecFenceCurrentFn={
			//问卷信息
			records: [],

			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			map: null,
			mapObjs: {
				markersOribit: [],
				markers: [],
				lineArr: []
			},

			// 获取当天轨迹
			getElecFenceCurrent: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId
				};
				EduManService.getElecFenceHistory(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
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
			orbit: function (datas){
				var that = this;
				var marker1, marker3,lineArr = [], polyline, passedPolyline;
				that.map.remove(that.mapObjs.markersOribit);
				that.map.remove(that.mapObjs.markers);
				that.map.remove(that.mapObjs.lineArr);
				//drawPolygon($scope.vers);

				if(datas.length == 0){
					return;
				}
				//创建marker
				for(var j = 0; j < datas.length; j++){
					var temp = datas[j];
					var lonlat = temp.lltude.split('-');
					lineArr.push([lonlat[1], lonlat[0]]);
					var imgSrc = "http://omh5h0gd2.bkt.clouddn.com/titles.jpg";

					if(!temp.lltude){
						continue;
					}
					var lonlat = temp.lltude.split('-');
					var content = "<div class='elecmap-tip'><img src=" + imgSrc + " style='width:20px;height:20px;'></div> ";
					var marker = new AMap.Marker({
						map: that.map,
						position: [lonlat[1], lonlat[0]],
						extData: j,
						content: content,
						offset: new AMap.Pixel(-7, -10)
					});
					that.mapObjs.markersOribit.push(marker);

					//鼠标点击marker弹出自定义的信息窗体
					AMap.event.addListener(marker, 'click', function(obj) {
						$scope.getOrbitValue(obj.target);
					});
				}

				that.map.setFitView();
				that.map.setCenter([lineArr[0][0], lineArr[0][1]]);

				// 绘制轨迹
				polyline = new AMap.Polyline({
					map: that.map,
					path: lineArr,
					strokeColor: "#0000ff",  //线颜色
					strokeOpacity: 0.5,     //线透明度
					strokeWeight: 5,      //线宽
					// strokeStyle: "solid"  //线样式
				});
				$scope.lineArr.push(polyline);
				passedPolyline = new AMap.Polyline({
					map: that.map,
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


			init: function () {
				this.map = new AMap.Map('elecmap', {
					resizeEnable: true,
					zoom:13
				});
				this.getElecFenceCurrent();
			}
		};
		$scope.ElecFenceCurrentFn.init();
	});