/**
 * Created by Administrator on 2017/6/22.
 * 宿舍管理
 */
angular.module('dleduWebApp')
	.controller('DormManCtrl', function ($scope, $state, $timeout, DormManService, CommonService, messageService,
										 ngDialog, MajorService, AuthService ) {
		$scope.dormMan = {
			currentRecord: null,
			builds: [],//宿舍楼数组
			checkedBuilds: [], //选择的宿舍楼
			currentBuildFloors: [], //保存当前楼层
			currentBuildUnit: [], //保存当前单元数
			checkedFloors: [],//选择的宿舍楼层数组
			checkedUnits: [],//选择的宿舍单元数组
			distedMajor: [], //已经分配的专业

			checkAllRecord: false, //是否全选
			selDistObj: [], //选择的对象

			//参数
			params: {
				no: "",//宿舍名
				full: null, //是否满员
				open: null, //开发状态
				profId: null, //已经分配专业
				floorIds: [], //所选宿舍
				unitNo: [], //单元
				floorNo: [], //楼层id
			},
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			isFullArr: [{value: null, name: '请选择'},{value: true, name: '是'},
				{value: false, name: '否'}],

			isOpenArr: [{value: null, name: '请选择'},{value: true, name: '开放'},
				{value: false, name: '关闭'}],

			dormAssign:{
				collegeId: 0,
				collegeName: "",
				profId: 0,
				profName: "",
				roomIds: [],
				sexType: 0
			},

			/**
			 * 获取宿舍楼
			 */
			getBulids: function(){
				var that = this;
				var params = {pageSize:9999999, pageNumber: 1};
				DormManService.getDormBuildings(params).$promise
					.then(function (data) {
						that.builds = data.data;
					})
					.catch(function (error) {

					})
			},

			/**
			 * 已经分配的专业
			 */
			getDistedMajors: function(){
				var that = this;
				DormManService.getDistedMajors().$promise
					.then(function (data) {
						that.distedMajor = data;
						//that.distedMajor.splice(0, 0, {profName: "请选择专业", profId: null});
						that.select2MajorOptions();
					})
					.catch(function (error) {

					})
			},


			//获取宿舍列表
			getDorms: function () {
				var that = this;
				var params = this.params;
				params.floorIds = this.getIds(this.checkedBuilds, "id");
				params.unitNo = this.checkedUnits;
				params.floorNo = this.checkedFloors;
				params.pageNumber = this.page.pageNumber;
				params.pageSize = this.page.pageSize;
				DormManService.getDorms(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.addCheckProperty(that.records);
						that.checkAllRecord = false;
						that.showSelDistList(data.data);
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},

			//删除
			delDorm: function () {
				var that = $scope.dormMan;
				var params = {
					id: that.currentRecord.roomId
				};
				DormManService.delDorm(params).$promise
					.then(function (data) {
						messageService.openMsg("删除成功！");
						that.getDorms();
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error,"删除失败！"));
					})
			},

			//删除提示
			deletePrompt: function (entity) {
				var that = this;
				that.currentRecord = entity;
				messageService.getMsg("您确定要删除此条记录吗？", that.delDorm);
			},

			//关闭宿舍
			closeDormPrompt: function (entity) {
				var that = this;
				that.currentRecord = entity;
				messageService.getMsg("您确定要关闭该宿舍吗？", function(){
					var that = $scope.dormMan;
					var params = {};
					params.roomIds = [that.currentRecord.roomId];
					that.closeDorm(params);
				});
			},

			/**
			 *关闭宿舍
			 * @param entity
			 */
			closeDorm: function (params, type) {
				var that = this;
				DormManService.closeDorms(params).$promise
					.then(function (data) {
						var mess = type == 'batch' ? "批量关闭宿舍成功!" : "关闭宿舍成功!";
						messageService.openMsg(mess);
						that.selDistObj = [];
						that.getDorms();
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error,"关闭宿舍异常！"));
					})
			},

			//批量关闭
			batchClose: function(){
				var that = this;
				var params = {};
				params.roomIds = this.getIds(this.selDistObj, "roomId");
				messageService.getMsg("您确定要关闭这些宿舍吗？", function(){
					var that = $scope.dormMan;
					that.closeDorm(params, "batch");
				});
			},

			//开启宿舍
			openDorm: function (entity) {
				var selectedDorm;
				if(entity){//单选
					selectedDorm = entity;
				}else{//多选
					selectedDorm = this.selDistObj;
				}
				var roomIds = this.getIds(selectedDorm, "roomId");
				this.dormAssign.roomIds = roomIds;
				ngDialog.open({
					template: 'publishDialog',
					width: 700,
					scope: $scope
				})
			},

			//分配宿舍
			distDorm: function(){
				var that = this;
				var majors = this.majorLists, major, profId = this.dormAssign.profId;
				var mess = this.dormAssign.roomIds.length >1 ? "批量开放宿舍成功!" : "开放宿舍成功!";
				angular.forEach(majors, function(item){
					if(item.id == profId){
						major = item;
						return;
					}
				});
				var params = this.dormAssign;
				params.collegeId = major.collegeId;
				params.collegeName = major.collegeName;
				params.profName = major.name;
				DormManService.assignDorms(params).$promise
					.then(function (data) {
						if(data.result){
							messageService.openMsg(mess);
							that.selDistObj = [];
							that.getDorms();
						}else{
							messageService.openMsg("开放宿舍失败！");
						}
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error,"关闭宿舍异常！"));
					})
			},

			/**
			 * 根据整数循环产生数组
			 */
			productArr: function(num){
				var arr = [];
				for(var i = 0; i < num; i++){
					arr.push(i + 1);
				}
				return arr;
			},

			/**
			 * 选中宿舍楼
			 */
			checkBuild: function(building){
				var flag = false;
				for(var i = 0, len = this.checkedBuilds.length; i < len; i++){
					var build = this.checkedBuilds[i];
					if(building.id == build.id){
						flag = true;
						break;
					}
				}
				if(!flag){
					this.checkedBuilds.push(building);
				}
				if(this.checkedBuilds.length == 1){//只选择一栋楼时处理单元和楼层方便显示
					var checkedBuild = this.checkedBuilds[0]
					if(checkedBuild.floorType == 20){
						this.currentBuildUnit = this.productArr(checkedBuild.unitNum);
					}
					this.currentBuildFloors = this.productArr(checkedBuild.floorNum);
				}
				this.isContain(building);
			},
			/**
			 * 选中宿舍楼层或者单元
			 */
			checkFloorUnit: function(value, type){
				var flag = false;
				var arr = type == 'floor' ? this.checkedFloors : this.checkedUnits;
				for(var i = 0, len = arr.length; i < len; i++){
					var temp = arr[i];
					if(value == temp){
						flag = true;
						break;
					}
				}
				if(!flag){
					arr.push(value);
				}
				this.isFloorUnit(value, type);
			},

			/**
			 * 判断哪些已经选中
			 */
			isFloorUnit: function(value, type){
				var flag = false;
				var arr = type == 'floor' ? this.checkedFloors : this.checkedUnits;
				for(var i = 0, len = arr.length; i < len; i++){
					var temp = arr[i];
					if(value == temp){
						flag = true;
						break;
					}
				}
				return flag;
			},

			/**
			 * 判断哪些已经选中
			 */
			isContain: function(building){
				var flag = false;
				for(var i = 0, len = this.checkedBuilds.length; i < len; i++){
					var build = this.checkedBuilds[i];
					if(building.id == build.id){
						flag = true;
						break;
					}
				}
				return flag;
			},


			/**
			 * 删除选中的宿舍楼
			 */
			removeSelectBuild: function(building, $event){
				$event.stopPropagation();
				for(var i = 0, len = this.checkedBuilds.length; i < len; i++){
					var build = this.checkedBuilds[i];
					if(building.id == build.id){
						this.checkedBuilds.splice(i, 1);
						break;
					}
				}
				if(this.checkedBuilds.length == 1){//只选择一栋楼时处理单元和楼层方便显示
					var checkedBuild = this.checkedBuilds[0]
					if(checkedBuild.floorType == 10){
						this.currentBuildUnit = this.productArr(checkedBuild.unitNum);
					}
					this.currentBuildFloors = this.productArr(checkedBuild.floorNum);
				}
			},

			/**
			 * 删除选中的单元和楼层
			 */
			removeFloorUnit: function(value, type, $event){
				$event.stopPropagation();
				var arr = type == 'floor' ? this.checkedFloors : this.checkedUnits;
				for(var i = 0, len = arr.length; i < len; i++){
					var temp = arr[i];
					if(value == temp){
						arr.splice(i, 1);
						break;
					}
				}
			},

			/**
			 * 获取id
			 */
			getIds: function(objs, idProperty){
				var ids = [];
				for (var k = 0, length = objs.length; k < length; k++) {
					var temp = objs[k];
					ids.push(temp[idProperty]);
				}
				return ids;
			},

			selDist: function ($index) {
				var selObj = this.records[$index];
				if (selObj.check) {
					var flag = false, index, selId = selObj.roomId;
					for (var j = 0; j < this.selDistObj.length; j++) {
						var id = this.selDistObj[j].roomId;
						if (selId == id) {
							flag = true;
							index = j;
						}
					}
					if (!flag) {
						this.selDistObj.push(selObj);
					}
				} else {
					var flag = false, index, selId = selObj.roomId;
					for (var k = 0; k < this.selDistObj.length; k++) {
						var id = this.selDistObj[k].roomId;
						if (selId == id) {
							this.selDistObj.splice(k, 1);
							break;
						}
					}
				}
				this.checkAllRecord = false;
				this.showSelDistList(this.records);
			},

			//全选
			checkAll: function () {
			//选择当前页所有记录
				if (this.checkAllRecord) {
					for (var k = 0, lenRecord = this.records.length; k < lenRecord; k++) {
						var record = this.records[k];
						var flag = false, selId = record.roomId;
						//判断元素在之前元素里面是否已经存在，如果存在不添加
						for (var j = 0, selLen = this.selDistObj.length; j < selLen; j++) {
							var id = this.selDistObj[j].roomId;
							if (selId == id) {
								flag = true;
							}
						}
						if (!flag) {
							this.selDistObj.push(record);
							record.check = true;
						}
					}

				} else {//反选时当前页所有元素都被删除
					for (var k = 0, lenRecord = this.records.length; k < lenRecord; k++) {
						var record = this.records[k];
						var selId = record.roomId;
						//判断元素在之前元素里面是否已经存在，如果存在则删除此元素
						for (var j = 0; j < this.selDistObj.length; j++) {
							var id = this.selDistObj[j].roomId;
							if (selId == id) {
								this.selDistObj.splice(j, 1);
								record.check = false;
								break;
							}
						}
					}
				}
			},

			/**
			 * 对象数据添加check属性
			 * @param records
			 */
			addCheckProperty: function (records) {
				for (var i = 0, recordLen = records.length; i < recordLen; i++) {
					var record = records[i];
					record.check = false;
				}
			},

			//还原之前选中的分配课程，在选择分配列表中的显示出来
			showSelDistList: function (records) {
				var calcCount = 0;//统计包含的元素值和当前页面记录数是否一样
				for (var k = 0, lenRecord = records.length; k < lenRecord; k++) {
					var record = records[k], selId = record.roomId;
					//判断元素在之前元素里面是否已经存在，如果存在不添加
					for (var j = 0, selLen = this.selDistObj.length; j < selLen; j++) {
						var id = this.selDistObj[j].roomId;
						if (selId == id) {
							record.check = true;
							calcCount++;
							break;
						}
					}
				}
				if (calcCount == lenRecord && calcCount) {
					this.checkAllRecord = true;
				}
			},

			/**
			 * 获取专业
			 */
			getMajors: function(){
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					managerId: AuthService.getUser().id,
					pageNumber: 1,
					pageSize: 99999999
				};
				MajorService.getMajorList(params).$promise
					.then(function (data) {
						that.majorLists = data.data;
					})
					.catch(function (error) {

					})
			},

			select2MajorOptions: function () {
				var _this = this;
				return {
					placeholder: {
						id: -1, // the value of the option
						text: '按学期筛选'
					},
					allowClear: true,
				}
			},

			//学期下拉列表分组数据格式化
			select2GroupFormat: function (dataList) {
				var result = [];

				/*angular.forEach(dataList, function (data) {
					var obj = {
						text: data.name,
						children: []
					};
					angular.forEach(data.semesterIdNameList, function (sememster) {
						var objChild = {
							id: sememster.id,
							text: sememster.name
						};
						obj.children.push(objChild);
					})
					result.push(obj);
				})*/
				return result;
			},

			/*getCurrentSemester: function () {
				var _this = this;
				var params = {
					orgId: AuthService.getUser().orgId
				};
				EduManService.getCurrentSemester(params).$promise
					.then(function (data) {
						var obj = {
							text: data.yearName,
							children: [
								{
									id:data.id,
									text:data.name
								}
							]
						};
						_this.entity.semesterId = data.id;
						_this.schoolYearDropList=[obj];


					})
					.catch(function (error) {

					})
			},*/

			init: function () {
				this.getDorms();
				this.getBulids();
				//this.getDistedMajors();
				this.getMajors();
			}
		};
		$scope.dormMan.init();
	});