/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
	.controller('ElecFenceCtrl', function ($scope, $state, $timeout, AuthService, EduManService, Select2LoadOptionsService,
										   MajorService, CollegeService, ClassService, messageService, CommonService, RoleAuthService,
										   ngDialog, tempStorageService) {
		$scope.isShow = false;
		$scope.evaFenceFn = {
			//结果中离线的人数，
			allLeave: 0,
			//结果中当前离线的人数，
			currentLeave: 0,
			//问卷信息
			records: [],
			//学院下拉列表
			collegeDropList: [],
			//专业下拉列表
			majorDropList: [],
			//班级下拉列表
			classDropList: [],
			//学院id
			collegeId: 0,
			//专业id
			majorId: 0,
			//班级id
			classesId: 0,

			date: '',

			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			params: {
				isLeaveSchool: null,
				isActivation: null,
				isLoginId: null,
				isAtSchool: null,
				isOline: null,
				isLogin: '1',
				time: '',
				name: null,
				jobNumber: null,
				organId: AuthService.getUser().organId,
				collegeId: null,
				professionalId: null,
				classId: null
			},

			isLeaveSchools: [],//是否曾离校
			isActives: [],//是否激活
			isLogins: [],//是否登录当天
			locations: [],//当前位置
			isOnlines: [],//是否在线


			//当天轨迹信息
			locusList: null,
			//轨迹坐标点
			orbits: [],
			//参数
			paramsOribit:{
				id: 0,
				date: '',
			},

			directUrl:'https://s1.aizhixin.com/97a1683c-7566-4469-9438-63f5a06f12c6.png',
			isShowQueryDialog: false,
			mapObjs: {
				markersOribit: [],
				markers: [],
				lineArr: [],
				map: null
			},

			//控制按钮权限
			isUseAuth: function(type){
				return RoleAuthService.isUseAuthority(type);
			},

			//获取结果筛选条件
			getResultOption: function (type) {
				if (type == "isLeaveSchool") {
					this.isLeaveSchools = [{id: null, text: '请选择'}, {id: '1', text: '是'}, {id: '0', text: '否'}, {
						id: 2,
						text: '未知'
					}];
				} else if (type == "isActive") {
					this.isActives = [{id: null, text: '请选择'}, {id: '0', text: '是'}, {id: '1', text: '否'}];
				} else if (type == "isLogin") {
					this.isLogins = [{id: null, text: '请选择'}, {id: '1', text: '是'}, {id: '0', text: '否'}];
				} else if (type == "location") {
					this.locations = [{id: null, text: '请选择'}, {id: '1', text: '在校'}, {id: '0', text: '离校'}, {id: '2', text: '未知'}];
				} else if (type == "isOnline") {
					this.isOnlines = [{id: null, text: '请选择'}, {id: '1', text: '在线'}, {id: '0', text: '离线'}];
				}

				//return {minimumResultsForSearch: -1};
			},

			getNowDate: function() {
				var myDate,myDateStr;
				myDate = new Date();
				var yyyy = myDate.getFullYear();//取四位年份
				var MM= myDate.getMonth()+1;//取月份
				if(MM<10)
				{
					MM="0"+MM;
				}
				var dd= myDate.getDate();//取日
				if(dd<10)
				{
					dd="0"+dd;
				}
				myDateStr=yyyy+"-"+MM+"-"+dd;
				return myDateStr;
			},


			//学院下拉列表查询
			getCollegeDropList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: 500,
					managerId: AuthService.getUser().id
				}
				CollegeService.getCollegeDropList(params).$promise
					.then(function (data) {
						that.collegeDropList = data.data;
						that.collegeDropList.splice(0, 0, {id: null, name : "--请选择--"});
					})
					.catch(function (error) {
					})
			},
			//通过id查询学院
			getCollegeById: function (collegeId) {
				var that = this;
				var params = {
					id: collegeId
				};
				CollegeService.getCollegeById(params).$promise
					.then(function (data) {
						var temp = {
							id: data.id,
							name: data.name
						}
						that.collegeDropList.push(temp);
						that.collegeId = data.id;

					})
					.catch(function (error) {
					})
			},
			//专业下拉列表查询
			getMajorDropList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: 100
				}
				params.collegeId = that.params.collegeId;
				MajorService.getMajorDropList(params).$promise
					.then(function (data) {
						that.majorDropList = data.data;
						that.majorDropList.splice(0, 0, {id: null, name : "--请选择--"});
					})
					.catch(function (error) {
					})
			},
			//通过id查询专业
			getMajorById: function (majorId) {
				var that = this;
				var params = {
					id: majorId
				}
				MajorService.getMajorById(params).$promise
					.then(function (data) {
						var temp = {
							id: data.id,
							name: data.name
						}
						that.majorDropList.push(temp);
						that.majorId = data.id;
					})
					.catch(function (error) {
					})
			},
			//班级下拉类表查询
			getClassDropList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: 100
				}
				params.professionalId = that.params.professionalId;
				ClassService.getClassDropList(params).$promise
					.then(function (data) {
						that.classDropList = data.data;
						that.classDropList.splice(0, 0, {id: null, name : "--请选择--"});
					})
					.catch(function (error) {
					})
			},
			//通过id查询班级
			getClassById: function (classesId) {
				var that = this;
				var params = {
					id: classesId
				}
				ClassService.getClassById(params).$promise
					.then(function (data) {
						var temp = {
							id: data.id,
							name: data.name
						}
						that.classDropList.push(temp);
						that.classesId = data.id;
					})
					.catch(function (error) {
					})
			},


			// 获取电子围栏信息列表
			getElecFenceList: function () {
				var that = this;
				this.params.pageNumber = that.page.pageNumber;
				this.params.pageSize = that.page.pageSize;
				this.params.time = new Date(this.date).getTime();
				this.params.orgId = AuthService.getUser().orgId;
				var params = angular.copy(this.params);
				params.managerId = AuthService.getUser().id;
				CommonService.delEmptyProperty(params);
				EduManService.getElecFenceList(params).$promise
					.then(function (data) {
						that.allLeave = data.onceLeave;
						that.currentLeave = data.nowLeave;
						that.records= data.pagedata.data;
						that.page = data.pagedata.page;
						that.page.pageNumber++;
					})
					.catch(function (error) {

					})
			},

			//通知班主任
			notice: function (id) {
				EduManService.notice({organId: AuthService.getUser().orgId, userId: id}).$promise
					.then(function (data) {
						if (data.success) {
							messageService.openMsg("通知成功!");
						} else {
							messageService.openMsg("通知失败!");
						}
					})
					.catch(function (e) {

					})
			},

			//计算禁用按钮
			disableButton: function(index, type){
				var record = this.records[index];
				if(type == 'current'){
					if(record.remark=='未登录' && record.onlinStatus=='离线'){
						return false;
					}else if(record.remark=='未激活' && record.onlinStatus=='离线'){
						return false;
					}else{
						return true;
					}
				}
				if(type == 'history'){
					if(record.remark=='未激活' && record.onlinStatus=='离线'){
						return false;
					}else{
						return true;
					}
				}
			},

			//设置围栏
			setFence: function () {
				$state.go('elecfencecreate');
			},

			//点击隐藏div
			showListOribit: function(){
				if(!this.isShowQueryDialog){
					this.isShowQueryDialog = true;
					this.directUrl = 'https://s1.aizhixin.com/675e01b3-d38a-49ed-8929-df724d05bb81.png';
				}else{
					this.isShowQueryDialog = false;
					this.directUrl = 'https://s1.aizhixin.com/97a1683c-7566-4469-9438-63f5a06f12c6.png';
				}
			},

			//当天轨迹
			goCurrentOribit: function(index){
				var record = this.records[index];
				this.paramsOribit.id = record.id;
				this.paramsOribit.date = this.params.time;
				var that = this;
				var params = {
					template: 'oribitDialog',
					width: 1000,
					height: 600,
					scope: $scope,
					onOpenCallback: function(){
						that.initOribit();
					}
				};
				//初始化点击展开按钮
				this.isShowQueryDialog = false;
				this.directUrl = 'https://s1.aizhixin.com/97a1683c-7566-4469-9438-63f5a06f12c6.png';
				ngDialog.open(params);
			},

			// 获取当天轨迹
			getElecFenceCurrent: function () {
				var that = this;
				var params = {
					organId: AuthService.getUser().orgId
				};
				params.userId = that.paramsOribit.id;
				params.time  = that.paramsOribit.date;
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
					showDir: true
				});
				that.mapObjs.lineArr.push(polyline);
				passedPolyline = new AMap.Polyline({
					map: that.mapObjs.map,
					strokeColor: "#F00",  //线颜色
					strokeWeight: 3,      //线宽
				});
			},

			/**
			 * 加载地图设置信息
			 * @param options
			 */
			loadSetInfo: function(){
				var that = this;
				EduManService.getElecSetInfo({organId: AuthService.getUser().orgId}).$promise
					.then(function(data){
						if(typeof data.lltudes != 'undefined'){//第一次进入设置
							//绘制多边形
							var verNew = [], verNews = [];
							for(var i = 0, length = data.lltudes.length; i < length; i++){
								verNew = [];
								var temp = data.lltudes[i];
								for(var j = 0; j < temp.length; j++){
									var lonlat = temp[j];
									verNew.push({longitude: parseFloat(lonlat.longitude), latitude: parseFloat(lonlat.latitude)});
								}
								verNews.push(verNew);
							}
							that.drawPolygon(verNews);
						}
					})
					.catch(function(e){

					});
			},

			/**
			 * 显示多变形
			 * @type {Polygon|{type, shape, buildPath}|*}
			 */
			drawPolygon: function(polyVers){
				var ver = [];
				var polygons = polyVers;
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
					polygonObj.setMap(this.mapObjs.map);
				}
			},


			//地图
			createMapobj: function(){
				this.mapObjs.map = new AMap.Map('elecmap', {
					resizeEnable: true,
					zoom:13
				});
			},

			//初始化当前轨迹页面
			initOribit: function () {
				var that = $scope.evaFenceFn;
				that.createMapobj();
				that.getElecFenceCurrent();
				that.loadSetInfo();
			},



			init: function () {
				this.getCollegeDropList();
				this.date = this.getNowDate();
				this.getElecFenceList();
			}
		};
		//$scope.evaFenceFn.init();

		$timeout(function () {
			$scope.$watch('evaFenceFn.params.collegeId', function (newValue, oldValue) {
				/*if (newValue != oldValue) {
					if(newValue && newValue != ''){
						$scope.evaFenceFn.getMajorDropList();
					}
				}*/
				if(newValue && newValue != ''){
					$scope.evaFenceFn.getMajorDropList();
					$scope.evaFenceFn.classDropList = [];
				}
			});
		})
		$timeout(function () {
			$scope.$watch('evaFenceFn.params.professionalId', function (newValue, oldValue) {
				/*if (newValue != oldValue) {
					if(newValue && newValue != '') {
						$scope.evaFenceFn.getClassDropList();
					}
				}*/
				if(newValue && newValue != '') {
					$scope.evaFenceFn.getClassDropList();
				}
			});
		})
		$timeout(function () {
			$scope.$watch('evaFenceFn.params.isLeaveSchool', function (newValue, oldValue) {
				if (newValue != oldValue) {
					$scope.evaFenceFn.getElecFenceList();
				}
			});
		});
		$timeout(function () {
			$scope.$watch('evaFenceFn.params.isActivation', function (newValue, oldValue) {
				if (newValue != oldValue) {
					$scope.evaFenceFn.getElecFenceList();
				}
			});
		});
		$timeout(function () {
			$scope.$watch('evaFenceFn.params.isAtSchool', function (newValue, oldValue) {
				if (newValue != oldValue) {
					$scope.evaFenceFn.getElecFenceList();
				}
			});
		});
		$timeout(function () {
			$scope.$watch('evaFenceFn.params.isOline', function (newValue, oldValue) {
				if (newValue != oldValue) {
					$scope.evaFenceFn.getElecFenceList();
				}
			});

		});
		$timeout(function () {
			$scope.$watch('evaFenceFn.params.isLogin', function (newValue, oldValue) {
				if (newValue != oldValue) {
					$scope.evaFenceFn.getElecFenceList();
				}
			});

		});
		$timeout(function () {
			$scope.$watch('evaFenceFn.date', function (newValue, oldValue) {
				if (newValue != oldValue) {
					$scope.evaFenceFn.getElecFenceList();
				}
			});
		});

		//页面路由变时的处理
		$scope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
			if(toState.name == "elecfencehistory" && fromState.name == "elecfence"){
				var params = {params: $scope.evaFenceFn.params};
				var key = fromState.name + toState.name;
				tempStorageService.setObject(key, params);
			}
		});
		//页面路由变化成功时的处理
		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
			if(fromState.name == "elecfencehistory" && toState.name == "elecfence"){
				var key = toState.name + fromState.name;
				var params = tempStorageService.getObject(key);
				if(params){
					tempStorageService.removeObject(key);
					$scope.evaFenceFn.params = params.params;
				}
				$scope.evaFenceFn.init();
			}else{
				if(toState.name == "elecfence"){
					tempStorageService.removeObject("elecfence" + "elecfencehistory");
					$scope.evaFenceFn.init();
				}
			}
		});
	})
	.directive('scrollTop', function($window){
		return {
			restrict: 'A',
			scope: false,   // 默认值
			link: function(scope, element, attrs) {
				scope.isShow = false;
				angular.element(element).on('scroll', onScroll);
				function onScroll(){
					var offsetTop = element[0].scrollTop;
					if(offsetTop > 0){
						scope.$apply(function () {
							scope.isShow = true;
						});
					}else{
						scope.$apply(function () {
							scope.isShow = false;
						});
					}
				}
			}
		}
	});