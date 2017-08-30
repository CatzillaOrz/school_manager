/**
 * Created by Administrator on 2017/6/21.
 * 当天轨迹
 */
angular.module('dleduWebApp')
	.controller('ElecFenceCreateCtrl', function ($scope, $timeout, $state, AuthService, EduManService, amapService, SchoolYearService,
												 messageService) {
		$timeout(function () {
			$scope.$watch("elecFenceCreateFn.elecSet.termSelectedId", function(newValue, oldValue){
				if(!newValue){
					$scope.elecFenceCreateFn.elecSet.termSelectedId = oldValue;
					return;
				}
				if(newValue != oldValue){
					$scope.elecFenceCreateFn.loadDatePickerByOption(newValue);
				}
			});
			$scope.$watch("elecFenceCreateFn.isOpenElec", function(newValue, oldValue){
				if($scope.elecFenceCreateFn.isEnd){
					$scope.elecFenceCreateFn.isEnd = false;
					return;
				}
				if(newValue != oldValue){
					if($scope.elecFenceCreateFn.isGetInitValue){
						$scope.elecFenceCreateFn.isGetInitValue = false;
						return;
					}
					$scope.elecFenceCreateFn.switchElec(oldValue);
				}
			});
		});
		$scope.elecFenceCreateFn={
			isOpenElec: '0',//是否打开电子围栏。默认不打开
			isEnd: false,
			//学期列表
			semeterLists: [],
			//学期列表clone
			semeterListsCopy: [],
			//保存当前学期信息
			currentSemeter: null,
			fromType: null,//是否从创建多边形页面过来。1是，0否
			map: null,//地图对象
			polyVer: [],//多边形顶点
			//设置信息对象
			elecSet: {
				termSelectedId: '0',
				selectTime: [],//监控日期
				unSelectTime: [], //非监控日期
				timeSections: []
			},
			currentDate: null,//当天时间
			record: null,
			operation: '去修改',
			location: null,
			isGetInitValue: false, //是否是从接口获取的初始化围栏开启值

			//获取当前日期
			getNowDate: function(){
				var date = new Date();
				var month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
				this.currentDate = date.getFullYear() + "-" + (month + "-") + (date.getDate());
			},

			//获取学期列表
			select2SemesterOptions: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: 1,
					pageSize: 10000,
				}
				SchoolYearService.getSemesterList(params).$promise
					.then(function(dataList){
						that.semeterLists = dataList.data;
						dataList.data.splice(0, 0, {name: "--请选择--", id: '0'});
						that.elecSet.termSelectedId = that.record.semesterId + '';
						//that.loadSetInfo();
					})
					.catch(function(e){

					});
			},


			//获取周末和周日时间
			getWeekAndWeekend: function(termStart, termEnd, isExist){
				var termStartLong = new Date(termStart), termEndLong = termEnd;
				//获取日期内所有的周末和周内
				var unSelectTime = [], selectTime = [];
				if(isExist){//没有选择学期时
					while(termStartLong.valueOf() <= termEndLong) {
						if(termStartLong.getDay() == 0 || termStartLong.getDay() == 6){
							unSelectTime.push(termStartLong.valueOf());
						}else{
							selectTime.push(termStartLong.valueOf());
						}
						termStartLong.setDate(termStartLong.getDate() + 1);
					}
				}else{//选择学期时
					/*for(var i = 0, nomonitorLen = this.record.nomonitorDate.length; i < nomonitorLen; i++ ){
						var temp = this.record.nomonitorDate[i];
						if(temp >=termStart  && temp <= termEnd){
							unSelectTime.push(temp);
						}
					}
					for(var j = 0, monitorLen = this.record.monitorDate.length; j < monitorLen; j++ ){
						var temp = this.record.monitorDate[j];
						if(temp >= termStart  && temp <= termEnd){
							selectTime.push(temp);
						}
					}*/
					selectTime = this.record.monitorDate;
					unSelectTime = this.record.nomonitorDate
				}
				return {startTime: termStart, endTime: termEnd, unSelectTime: unSelectTime, selectTime: selectTime};
			},

			//根据学期id，获得学期对象
			getSemeterById: function(id){
				var that = this;
				angular.forEach(this.semeterLists, function(data){
					if(data.id == id){
						that.currentSemeter = data;
					}
				});
				return that.currentSemeter;
			},

			//加载日期插件
			loadDatepicker: function(options){
				$('#starttime').data('datepicker', null);
				var dateObj = $('#starttime').datepickermy(options);
			},

			//根据选择的学期加载日历
			loadDatePickerByOption: function(newVal){
				if(!newVal){
					return;
				}
				var options = {}, params = {};
				var semeter = this.getSemeterById(newVal);
				if(this.record){
					if(this.record.semesterId == newVal){
						params = this.getWeekAndWeekend(new Date(semeter.startDate + ' 00:00:00'), new Date(semeter.endDate + ' 00:00:00'), false);
					}else {
						params = this.getWeekAndWeekend(new Date(semeter.startDate + ' 00:00:00'), new Date(semeter.endDate + ' 00:00:00'), true);
					}
				}else{
					params = this.getWeekAndWeekend(new Date(semeter.startDate + ' 00:00:00'), new Date(semeter.endDate + ' 00:00:00'), true);
				}
				//去除修改日期后不在范围内的
				options = {
					weekStart: 1, top: -10, left: 84, zIndexOffset: 9999, startTime: params.startTime .getTime(),
					endTime: params.endTime.getTime(),
					unSelectTime: params.unSelectTime, selectTime: params.selectTime, currentDate: (new Date(this.currentDate + ' 00:00:00').getTime() + 86400000)
				};
				this.loadDatepicker(options);
			},



			/**
			 * 保存设置
			 */
			saveSet: function(){
				if(this.elecSet.termSelectedId){
					var data = $('#starttime').data('datepicker');
					this.elecSet.selectTime = data.selectTime;
					this.elecSet.unSelectTime = data.unSelectTime;
				}
				//获取经纬度
				if(this.polyVer.length == 0){
					messageService.openMsg("请先设置多边形!");
					return;
				}

				var paramsObj = {lltudes: this.polyVer, monitorDate: this.elecSet.selectTime, nomonitorDate: this.elecSet.unSelectTime,
					 semesterId: this.elecSet.termSelectedId, organId: AuthService.getUser().orgId};
				EduManService.setElecFenceInfo(paramsObj).$promise
					.then(function(data){
						if(data.trueMSG){
							messageService.openMsg("设置成功!");
							$state.go('elecfence');
						}else{
							messageService.openMsg("设置失败!");
						}
					})
					.catch(function(e){

					})
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
					polygonObj.setMap(this.map);
				}
			},

			/**
			 * 加载地图设置信息
			 * @param options
			 */
			loadSetInfo: function(){
				var that = this;
				EduManService.getElecSetInfo({organId: AuthService.getUser().orgId}).$promise
					.then(function(data){
						if(typeof data.lltudes == 'undefined'){//第一次进入设置
							that.operation = '去设置';
						}else{//初始化选择的数据
							that.record = data;
							that.elecSet.timeSections = data.monitorTime;
							var verNew = [], verNews = [];
							that.map.setCenter([parseFloat(data.lltudes[0][0].longitude), parseFloat(data.lltudes[0][1].latitude)]);
							for(var i = 0, length = data.lltudes.length; i < length; i++){
								verNew = [];
								var temp = data.lltudes[i];
								for(var j = 0; j < temp.length; j++){
									var lonlat = temp[j];
									verNew.push({longitude: parseFloat(lonlat.longitude), latitude: parseFloat(lonlat.latitude)});
								}
								verNews.push(verNew);
							}
							that.polyVer = verNews;
						}
						that.select2SemesterOptions();
						//判断是否存在开启围栏的属性
						if(that.record && that.record.setupOrClose){
							if(that.record.setupOrClose == 10){//开启
								that.isOpenElec = '1';
							}else if(that.record.setupOrClose == 20){
								that.isOpenElec = '0';
							}
							that.isGetInitValue = true;
						}
						//绘制多边形
						that.drawPolygon(that.polyVer);
					})
					.catch(function(e){

					});
			},

			//开启或者关闭围栏
			switchElec: function(oldValue){
				var isOpen = parseInt(this.isOpenElec);
				var that = this;
				if(!that.record){
					messageService.openMsg('请先设置围栏!');
					that.isOpenElec = oldValue;
					that.isEnd = true;
					return;
				}
				EduManService.switchElec({organId: AuthService.getUser().orgId, flag: isOpen}).$promise
					.then(function(data){
						if(data.success){
							messageService.openMsg(data.message);
						}else{
							messageService.openMsg(data.message);
							that.isOpenElec = oldValue;
							that.isEnd = true;
						}
					})
					.catch(function(e){
					})
			},

			init: function () {
				//初始化地图
				this.map = amapService.getMapObj("elecmap", {
					resizeEnable: true,
					zoom:13
				});
				this.getNowDate();
				this.loadSetInfo();

			}
		};
		$scope.elecFenceCreateFn.init();
	});
