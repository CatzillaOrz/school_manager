/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
	.controller('instructorAttendCtrl', function ($scope, $state, AuthService, Select2LoadOptionsService, CollegeService,
												  ClassService, EduManService, tempStorageService, MajorService, $timeout, messageService, ngDialog) {
		//当天时间
		var today = new Date().Format("yyyy-MM-dd");
		$scope.insAttendFn = {
			currentEntity: {},
			collegeDropList: [],
			showMap: false,
			params: {
				orgId: AuthService.getUser().orgId,
				collegeId: null,
				nj: null,
				status: "1",
				startDate: today,
				endDate: today,
				managerId: AuthService.getUser().id
			},
			rollCallList: [],
			RollCallDetailsList: [],
			map: null,
			markers: [],
			infoWindow: {},
			//分页参数
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},
			testEntity: {
				map: this.map,
				position: [116.382122, 39.921176],
				data: {
					id: 1,
					name: "知新",
					number: 'sdsd'
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
			createMap: function (position) {
				var _this = this;
				if (!_this.map) {
					_this.map = new AMap.Map("mapContainer", {
						resizeEnable: true,
						center: [position.x, position.y],
						zoom: 13
					});
				}

			},
			//修改地图中心点
			setMapCenter: function (position) {
				var _this = this;
				_this.map.setCenter(position);
			},
			//创建标记
			createMaker: function (list) {
				var _this = this;
				_this.map.clearMap();
				_this.markers = [];
				angular.forEach(list, function (data) {
					if (data.lltudes) {
						var marker = new AMap.Marker({
							position: data.lltudes,
							map: _this.map,
							icon: "http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
						});
						marker.data = data;
						//给Marker绑定单击事件
						marker.on('click', _this.markerClick);
						_this.markers.push(marker);
					}
				})
			},
			//创建弹出框
			openInfoWindow: function (data) {
				var _this = this;
				//构建信息窗体中显示的内容
				if (data.lltudes) {
					var info = [];
					info.push("<div style=\"padding:0px 0px 0px 4px;\"><b>" + data.studentName + "</b>");
					info.push("学号 :" + data.studentNum);
					info.push("班级 :" + data.className);
					info.push("签到地点 :" + data.gpsDetail);
					info.push("签到时间 :" + data.signTime + "</div></div>");

					_this.infoWindow = new AMap.InfoWindow({
						content: info.join("<br>"), //使用默认信息窗体框样式，显示信息内容
						offset: new AMap.Pixel(0, -30)
					});
					_this.infoWindow.open(_this.map, data.lltudes);
					//图标更换
					angular.forEach(_this.markers, function (marker) {
						if (marker.data.id == data.id) {
							marker.setIcon("http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png");
						} else {
							marker.setIcon("http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png");
						}
					})
				}
			},
			//标记物点击事件
			markerClick: function (e) {
				var _this = $scope.insAttendFn;
				_this.openInfoWindow(e.target.data);
			},
			//获取导员点名列表
			getInsRollCallList: function () {
				var _this = this;
				_this.showMap = false;
				var params = _this.params;
				params.pageNumber = _this.page.pageNumber;
				params.pageSize = _this.page.pageSize;
				EduManService.getInsRollCallList(params).$promise
					.then(function (data) {
						_this.rollCallList = data.data;
						_this.page = data.page;
					})
					.catch(function (error) {

					})
			},

			s2ab: function (s) {
				var buf = new ArrayBuffer(s.length);
				var view = new Uint8Array(buf);
				for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
				return buf;
			},
			saveAs: function (data, fileName) {
				var that = this;
				var blob = new Blob([that.s2ab(data)], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'})
				var windowUrl = (window.URL || window.webkitURL)
				var downloadUrl = windowUrl.createObjectURL(blob);
				var anchor = document.createElement("a");
				anchor.href = downloadUrl;
				anchor.download = fileName + '.xlsx';
				document.body.appendChild(anchor);
				anchor.click();
				windowUrl.revokeObjectURL(blob);
			},

			//导出点名记录
			exportCallList: function () {
				var that = this;
				var params = this.params;
				params.pageNumber = 1;
				params.pageSize = 999999999;
				EduManService.exportRollCallInfo(params).success(function (data) {
					that.saveAs(data, '导员点名信息报表');
				}).catch(function (e) {

				});
			},

			//获取详细
			getClassRollCallDetails: function (rid, status, isRead) {
				var _this = this;
				var params = {
					rid: rid,
					status: status,
					haveRead: isRead,
					managerId: AuthService.getUser().id
				};

				EduManService.getClassRollCallDetails(params).$promise
					.then(function (data) {
						_this.RollCallDetailsList = data.data;
						//设置地图中心位置
						if (data.center.length != 0) {
							_this.setMapCenter(data.center);
							_this.showMap = true;
						} else {
							_this.showMap = false;
						}
						//设置标记
						if (_this.RollCallDetailsList) {
							_this.createMaker(_this.RollCallDetailsList);
						}

					})
					.catch(function (error) {

					})
			},
			openMap: function (entity) {
				var _this = this;
				_this.currentEntity = entity;
				_this.getClassRollCallDetails(entity.rid, null, null);
			},
			init: function () {
				var _this = this;
				_this.getInsRollCallList();
				var position = {
					x: 116.40,
					y: 39.91
				};
				_this.createMap(position);
			}
		};
		$scope.insAttendFn.init();
	});