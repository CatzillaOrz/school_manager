/**
 * Created by Administrator on 2017/6/21.
 * 当天轨迹
 */
angular.module('dleduWebApp')
	.controller('ElecFenceCreateCtrl', function ($scope, AuthService, EduManService, amapService, SchoolYearService) {

		$scope.ElecFenceCreateFn={
			//学期列表
			semeterLists: [],
			semeterListsCopy: [],
			currentSemeter: null,
			fromType: null,
			map: null,
			elecSet: {
				termSelectedId: null,
				terms: [],
				selectTime: [],
				unSelectTime: [],
				timeSections: [],
				startTimeSection: {},//选择的开始时间段
				endTimeSection: {}//选择的结束时间段
			},
			currentDate: null,
			record: null,
			polygonVertexs: null,
			operation: '去修改',
			location: null,

			//获取当前日期
			getNowDate: function(){
				var date = new Date();
				var month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1);
				this.currentDate = date.getFullYear() + "-" + (month + "-") + (date.getDate());
			},

			select2SemesterOptions: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: 1,
					pageSize: 10000,
				}
				SchoolYearService.getSemesterList(params).$promise
					.then(function(dataList){
						angular.forEach(dataList.data, function (data) {
							data.text = data.name;
						})
						that.semeterLists = dataList.data;
					})
					.catch(function(e){

					});
				/*var _this = this;
				return {
					placeholder: {
						id: '-1', // the value of the option
						text: '按学期筛选'
					},
					ajax: {
						//url: "api/schoolyear/getSchoolYearDropList",
						url: "api/schoolyear/getSemesterList",
						//delay: 250,
						data: function (query) {
							var params = {
								orgId: AuthService.getUser().orgId,
								pageNumber: 1,
								pageSize: 100,
							}
							params.name = query.term;
							return params;
						},
						processResults: function (data, params) {
							params.page = params.page || 1;
							_this.semeterListsCopy = angular.copy(data.data);
							_this.semeterLists = _this.select2GroupFormat(data.data);
							return {
								results: _this.semeterLists,
								pagination: {
									more: (params.page * 30) < data.total_count
								}
							};
						},
						cache: false
					},

				}*/
			},

			//学期下拉列表分组数据格式化
			select2GroupFormat: function (dataList) {
				var result = []
				angular.forEach(dataList, function (data) {
					var obj = {
						text: data.name,
						id: data.id
					};
					result.push(obj);
				})
				return result;
			},

			/**
			 * 加载地图设置信息
			 * @param options
			 */
			loadSetInfo: function(){
				var that = this;
				EduManService.getElecSetInfo()
					.success(function(data){
						if(!data){//第一次进入设置
							that.operation = '去设置';
						}else{//初始化选择的数据
							that.record = data;
							that.elecSet.timeSections = data.monitorTime;
							that.verifyObj.isExistTimeSection = true;
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
						that.drawPolygon(that.polyVer);
					})
					.error(function(e){

					});
			},

			/**
			 * 显示多变形
			 * @type {Polygon|{type, shape, buildPath}|*}
			 */
			drawPolygon: function(){
				var ver = [];
				var polygons = $scope.polyVer;
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
					polygonObj.setMap($scope.elecSet.map);
				}
			},

			//获取周末和周日时间
			getWeekAndWeekend: function(termStart, termEnd, isExist){
				var termStartLong = new Date(termStart + ' 00:00:00'), termEndLong = new Date(termEnd+ ' 00:00:00');
				//获取日期内所有的周末和周内
				var unSelectTime = [], selectTime = [];
				if(isExist){
					while(termStartLong.valueOf() <= termEndLong) {
						if(termStartLong.getDay() == 0 || termStartLong.getDay() == 6){
							unSelectTime.push(termStartLong.valueOf());
						}else{
							selectTime.push(termStartLong.valueOf());
						}
						termStartLong.setDate(termStartLong.getDate() + 1);
					}
				}else{
					for(var i = 0, nomonitorLen = $scope.record.nomonitorDate.length; i < nomonitorLen; i++ ){
						var temp = $scope.record.nomonitorDate[i];
						if(temp >=termStart  && temp <= termEnd){
							unSelectTime.push(temp);
						}
					}
					for(var j = 0, monitorLen = $scope.record.monitorDate.length; j < monitorLen; j++ ){
						var temp = $scope.record.monitorDate[j];
						if(temp >= termStart  && temp <= termEnd){
							selectTime.push(temp);
						}
					}
				}
				return {startTime: termStart, endTime: termEnd, unSelectTime: unSelectTime, selectTime: selectTime};
			},

			//根据学期id，获得学期对象
			getSemeterById: function(id){
				var that = this;
				angular.forEach(this.semeterLists, function(data){
					if(data.id = id){
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

			//根据条件加载日历
			loadDatePickerByOption: function(newVal){
				if(!newVal){
					return;
				}
				//localStorage.setItem('termObj', angular.toJson(newVal));
				if(newVal && newVal.name == '--请选择--'){
					return;
				}
				var options = {}, params = {};
				//$scope.verifyObj.isSelTerm = true;
				var semeter = this.getSemeterById(newVal);
				if(this.record){
					if(this.record.semesterId == newVal){
						params = this.getWeekAndWeekend(semeter.startDate, semeter.endDate, false);
					}else {
						params = this.getWeekAndWeekend(semeter.startDate, semeter.endDate, true);
					}
				}else{
					params = this.getWeekAndWeekend(semeter.startDate, semeter.endDate, true);
				}
				//去除修改日期后不在范围内的
				options = {
					weekStart: 1, top: -10, left: 84, zIndexOffset: 9999, startTime: new Date(params.startTime + ' 00:00:00'), endTime: new Date(params.endTime + ' 00:00:00'),
					unSelectTime: params.unSelectTime, selectTime: params.selectTime, currentDate: (new Date(this.currentDate + ' 00:00:00').getTime() + 86400000)
				};
				this.loadDatepicker(options);
			},



			/**
			 * 保存设置
			 */
			saveSet: function(){
				var params = this.elecSet;
				return;
				if(this.elecSet.termSelected && this.elecSet.termSelected.name != '--请选择--'){
					var data = $('#starttime').data('datepicker');
					$scope.elecSet.selectTime = data.selectTime;
					$scope.elecSet.unSelectTime = data.unSelectTime;
				}
				//获取经纬度
				var latLon = this.polyVer;
				if(latLon.length > 0){
					this.verifyObj.isExistPoly = true;
				}else{
					this.verifyObj.isExistPoly = false;
				}

				var paramsObj = {lltudes: latLon, monitorDate: this.elecSet.selectTime, nomonitorDate: this.elecSet.unSelectTime,
					monitorTime: this.elecSet.timeSections, semesterId: this.elecSet.termSelected.id};
				EduManService.setElecFenceInfo(paramsObj).$promise
					.then(function(data){
						if(data.trueMSG){
							messageService.openMsg("设置成功!");
						}else{
							messageService.openMsg("设置失败!");
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
				amapService.getLocation(this.map);
				var center = amapService.getCenter();
				if(center.lon && center.lat){
					this.map.setCenter([center.lon, center.lat]);
				}

				this.getNowDate();
			}
		};
		$scope.ElecFenceCreateFn.init();

		$scope.$watch("ElecFenceCreateFn.elecSet.termSelectedId", function(newVal){
			$scope.ElecFenceCreateFn.loadDatePickerByOption(newVal);
		});
	});
