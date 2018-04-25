/**
 * Created by Administrator on 2017/6/22.
 * 宿舍管理
 */
angular.module('dleduWebApp')
	.controller('DormManCtrl', function ($scope, $state, $timeout, DormManService, CommonService, messageService,
										 ngDialog, MajorService, AuthService, tempStorageService) {
		$scope.dormMan = {
			currentRecord: null,
			selectedRecord: null, //当前已经选择宿舍的记录
			builds: [],//宿舍楼数组
			currentBuildFloors: [], //保存当前楼层
			currentBuildUnit: [], //保存当前单元数
			checkedBuilds: [], //选择的宿舍楼
			checkedFloors: [],//选择的宿舍楼层数组
			checkedUnits: [],//选择的宿舍单元数组
			distedMajor: [], //已经分配的专业
			majorLists: [], //专业
			checkAllRecord: false, //是否全选
			selDistObj: [], //选择的对象
			isBatchDist: false, //是否批量分配宿舍
			showTip: false, //是否显示提示信息
			tableIndex:1,

			//宿舍统计参数
			params: {
				no: "",//宿舍名
				full: null, //是否满员
				open: null, //开发状态
				isAssignment: null, //是否分配
				profId: null, //已经分配专业
				floorIds: [], //所选宿舍
				unitNo: [], //单元
				floorNo: [], //楼层id
			},

			//已选学生参数
			statisticParams: {
				name: '',
				professionalId: 0,
				gender: '请选择'
			},

			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			isFullArr: [{value: null, name: '请选择'},{value: true, name: '是'},
				{value: false, name: '否'}],

			isOpenArr: [{value: null, name: '请选择'},{value: true, name: '已开放'},
				{value: false, name: '已关闭'}],

			//是否分配
			isAssignments: [{value: null, name: '请选择'},{value: true, name: '已分配'},
				{value: false, name: '未分配'}],

			sexs: [{name: '请选择'},{name: '男'}, {name: '女'}],

			dormAssign:{
				collegeId: 0,
				collegeName: "",
				profId: 0,
				profName: "",
				roomIds: [],
				sexType: 0
			},

			editDormAssign: {
			},
			//页签切换
			switchOneTab:function(index){
				this.tableIndex = index;
				if(this.tableIndex == 1){
					this.queryDorm();
				}else if(this.tableIndex == 2){
					this.statisticParams.professionalId = 0;
					this.statisticParams.gender = '请选择';
					this.querySelStudent();
				}else if(this.tableIndex == 3){
					this.statisticParams.professionalId = 0;
					this.querySelDormByMajor();
				}
			},

			//查询已经选择的学生
			querySelStudent:function(){
				this.page.pageNumber = 1;
				if(this.majorLists.length){
					var marjorFirst = this.majorLists[0];
					if(marjorFirst.name != '请选择专业' && marjorFirst.id != 0){
						this.majorLists.splice(0, 0, {name: "请选择专业", id: 0});
					}
				}
				this.getStusSelected();
			},

			/**
			 * 获取宿舍楼
			 */
			getStusSelected: function(){
				var that = this;
				var params = angular.copy(this.statisticParams);
				params.orgId = AuthService.getUser().orgId;
				params.pageNumber = this.page.pageNumber;
				params.pageSize = this.page.pageSize;
				if(params.gender == '请选择'){
					delete params.gender;
				}
				if(params.professionalId == 0){
					delete params.professionalId;
				}
				DormManService.getStusSelected(params).$promise
					.then(function (data) {
						that.selectedRecords = data.data.data;
						that.page = data.data.page;
						that.page.pageNumber++;
					})
					.catch(function (error) {

					})
			},

			//查询专业选宿舍统计
			querySelDormByMajor: function(){
				if(this.majorLists.length){
					var marjorFirst = this.majorLists[0];
					if(marjorFirst.name != '请选择专业' && marjorFirst.id != 0){
						this.majorLists.splice(0, 0, {name: "请选择专业", id: 0});
					}
				}
				this.statisticsSelDorm();
			},

			/**
			 * 获取宿舍楼
			 */
			statisticsSelDorm: function(){
				var that = this;
				var params = angular.copy(this.statisticParams);
				params.orgId = AuthService.getUser().orgId;
				delete params.name;
				delete params.gender;
				if(params.professionalId == 0){
					delete params.professionalId;
				}
				DormManService.statisticsSelDorm(params).$promise
					.then(function (data) {
						that.statisticRecords = data.data;
					})
					.catch(function (error) {

					})
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
						var result = [];
						for(var i = 0, len = data.data.length; i < len; i++){
							var temp = data.data[i];
							for(var j = 0, subLen = temp.pl.length; j < subLen; j++){
								var sub = temp.pl[j];
								sub.collegeId = temp.collegeId;
								sub.collegeName = temp.collegeName;
								result.push(sub);
							}
						}
						that.distedMajor = result;
						that.distedMajor.splice(0, 0, {profName: "请选择专业", profId: null});
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
						messageService.openMsg("获取宿舍列表异常！");
					})
			},

			queryDorm: function(){
				this.selDistObj = [];
				this.page.pageNumber = 1;
				this.getDorms();
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
						that.queryDorm();
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
						that.queryDorm();
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error,"关闭宿舍异常！"));
					})
			},

			//批量关闭
			batchClose: function(){
				if(!this.selDistObj.length){
					messageService.openMsg("请先选择宿舍!");
					return;
				}
				var that = this;
				var params = {};
				params.roomIds = this.getIds(this.selDistObj, "roomId");
				messageService.getMsg("您确定要关闭这些宿舍吗？", function(){
					var that = $scope.dormMan;
					that.closeDorm(params, "batch");
				});
			},

			//开放宿舍
			openDorms: function (entity) {
				var selectedDorm;
				if(entity){//单选
					selectedDorm = [entity];
				}else{//多选
					if(!this.selDistObj.length){
						messageService.openMsg("请先选择宿舍!");
						return;
					}
					selectedDorm = this.selDistObj;
				}
				var mess = this.selDistObj.length ? "批量开放宿舍成功!" : "开放宿舍成功!";
				var params = {};
				params.roomIds = this.getIds(selectedDorm, "roomId");
				messageService.getMsg("您确定要开放这些宿舍吗？", function(){
					var that = $scope.dormMan;
					DormManService.openDorms(params).$promise
						.then(function (data) {
							messageService.openMsg(mess);
							that.selDistObj = [];
							that.queryDorm();
						})
						.catch(function (error) {
							messageService.openMsg(CommonService.exceptionPrompt(error,"开放宿舍异常！"));
						})
				});
			},

			//判断是否包含已经分配宿舍
			isAssign: function(objs){
				for(var i = 0, len = objs.length; i < len; i++){
					var assign = objs[i].assgin;
					if(assign){
						return true;
					}
				}
				return false;
			},

			//批量分配
			distedDorms: function (entity) {
				var selectedDorm;
				if(entity){//单选
					selectedDorm = [entity];
					this.isBatchDist = false;
				}else{//多选
					if(!this.selDistObj.length){
						messageService.openMsg("请先选择宿舍!");
						return;
					}
					//判断选择的宿舍中是否包含已经分配的宿舍，若已经分配提示去掉已分配宿舍后进行批量分配
					if(this.isAssign(this.selDistObj)){
						messageService.openMsg("请选择未分配状态的宿舍!");
						return;
					}
					this.isBatchDist = true;
					selectedDorm = this.selDistObj;
				}
				if(this.majorLists.length){
					var marjorFirst = this.majorLists[0];
					if(marjorFirst.name != '请选择专业' && marjorFirst.id != 0){
						this.majorLists.splice(0, 0, {name: "请选择专业", id: 0});
					}
				}
				var roomIds = this.getIds(selectedDorm, "roomId");

				this.dormAssign.roomIds = roomIds;
				ngDialog.open({
					template: 'publishDialog',
					width: 700,
					scope: $scope,
					preCloseCallback: function(){
						$scope.dormMan.showTip = false;
					}
				})
			},

			//编辑分配
			openDistedDorm: function (entity) {
				ngDialog.open({
					template: 'editDialog',
					width: 700,
					scope: $scope,
					preCloseCallback: function(){
						$scope.dormMan.showTip = false;
					}
				})
				var that = this;
				if(this.majorLists.length){
					var marjorFirst = this.majorLists[0];
					if(marjorFirst.id == 0){
						this.majorLists.splice(0, 1);
					}
				}
				DormManService.getDormDistedInfo({roomId: entity.roomId}).$promise
					.then(function (data) {
						if(data.result){
							that.editDormAssign = data.data;
							data.data.roomId ? that.editDormAssign = data.data : that.editDormAssign.roomId = entity.roomId;
							var ids = [];
							for(var i = 0; i < data.data.radl.length; i++){
								ids.push(data.data.radl[i].profId);
							}
							that.editDormAssign.profId = ids;
						}else{
							messageService.openMsg("获取已分配信息异常!");
						}
					})
					.catch(function (error) {

					})
			},

			//移除床位
			delBed: function () {
				var that = $scope.dormMan;
				var params = {
					bedId: that.selectedRecord.bedId
				};
				DormManService.delBedStu(params).$promise
					.then(function (data) {
						messageService.openMsg("移出宿舍成功！");
						that.querySelStudent();
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error,"移出宿舍失败！"));
					})
			},

			//移除宿舍
			deleteBedPrompt: function (entity) {
				var that = this;
				that.selectedRecord = entity;
				messageService.getMsg("您确定要把该学生移出宿舍吗？", that.delBed);
			},



			//通过选择的专业id，获取专业列表里面的对应专业
			getMajorById: function(id){
				for(var i = 0, len = this.majorLists.length; i < len; i++ ){
					var major = this.majorLists[i];
					if(id == major.id){
						return major;
					}
				}
			},

			//通过选择的专业id，获取选择的对象
			getObjById: function(id){
				for(var i = 0, len = this.majorLists.length; i < len; i++ ){
					var temp = this.majorLists[i], obj = {};
					if(id == temp.id){
						obj.collegeId = temp.collegeId;
						obj.collegeName = temp.collegeName;
						obj.profId = temp.id;
						obj.profName = temp.name;
						return obj;
					}
				}
			},

			//分配宿舍
			updateDistedDorm: function(){
				var that = this;
				var selectIds = this.editDormAssign.profId;//多选的专业id
				//获取选择的id的选项
				var selArr = [];
				for(var i = 0, len = selectIds.length; i < len; i++ ){
					var id = selectIds[i], obj = {};
					obj = this.getObjById(id);
					selArr.push(obj);
				}
				this.editDormAssign.radl = selArr;
				this.showTip = true;
				if(!this.editDormAssign.profId.length || !this.editDormAssign.sexType)
					return;
				DormManService.updateDistedInfo(this.editDormAssign).$promise
					.then(function (data) {
						if(data.result){
							messageService.openMsg("编辑分配专业成功！");
							that.queryDorm();
							that.getDistedMajors();
						}else{
							messageService.openMsg("编辑分配专业失败！");
						}
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error,"编辑分配专业异常！"));
					})
			},


			//分配宿舍
			distDorm: function(){
				var that = this;
				var majors = this.majorLists, major, profId = this.dormAssign.profId;
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
				this.showTip = true;
				if(!this.dormAssign.profId || !this.dormAssign.sexType)
					return;
				//获取有效分配宿舍的数量
				if(this.isBatchDist){
					var validSel = [], ids = [];
					for(var i = 0, len = this.selDistObj.length; i < len; i++){
						var record = this.selDistObj[i];
						if(record.beds==record.emBeds){//空宿舍
							validSel.push(record);
							ids.push(record.roomId);
						}
					}
					this.dormAssign.roomIds = ids;
				}
				if(!validSel.length){
					messageService.openMsg("请选择没有住人的宿舍进行编辑分配！");
					return;
				}
				var mess = this.isBatchDist ? (validSel.length + "个宿舍批量分配成功!") : "分配宿舍成功!";
				DormManService.assignDorms(params).$promise
					.then(function (data) {
						if(data.result){
							messageService.openMsg(mess, 3000);
							that.selDistObj = [];
							that.queryDorm();
							that.getDistedMajors();
						}else{
							messageService.openMsg("分配宿舍失败！");
						}
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error,"分配宿舍异常！"));
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
					this.queryDorm();
				}
				this.currentBuildUnit = [];
				this.currentBuildFloors = [];
				this.checkedFloors = [];
				this.checkedUnits = [];
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
					this.queryDorm();
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
				if(!this.checkedBuilds.length){
					this.checkedFloors = [];
					this.checkedUnits = [];
				}
				this.queryDorm();
				if(this.checkedBuilds.length == 1){//只选择一栋楼时处理单元和楼层方便显示
					var checkedBuild = this.checkedBuilds[0]
					if(checkedBuild.floorType == 20){
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
						this.queryDorm();
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


			init: function () {
				//this.getDorms();
				this.getBulids();
				this.getDistedMajors();
				this.getMajors();
			},
		};

		$scope.dormMan.init();
		$timeout(function () {
			$scope.$watch('dormMan.editDormAssign.profId', function (newValue, oldValue) {
				if (newValue != oldValue) {
					if($scope.dormMan.editDormAssign.profId.length != 0){
						$timeout(function(){
							$("input.ui-select-search").attr("placeholder", "点击选择专业");
						},1000);
					}
				}
			});
		});

		$scope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
			if(toState.name == "dormstuinfo" && fromState.name == "dormman"){
				var params = {params:$scope.dormMan.params};
				params.checkedBuilds = $scope.dormMan.checkedBuilds;
				params.checkedFloors = $scope.dormMan.checkedFloors;
				params.checkedUnits = $scope.dormMan.checkedUnits;

				params.builds = $scope.dormMan.builds;
				params.currentBuildFloors = $scope.dormMan.currentBuildFloors;
				params.currentBuildUnit = $scope.dormMan.currentBuildUnit;
				var key = fromState.name + toState.name;
				tempStorageService.setObject(key, params);
			}
		});
		$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
			if(fromState.name == "dormstuinfo" && toState.name == "dormman"){
				var key = toState.name + fromState.name;
				var params = tempStorageService.getObject(key);
				if(params){
					tempStorageService.removeObject(key);
					$scope.dormMan.checkedBuilds = params.checkedBuilds;
					$scope.dormMan.checkedFloors = params.checkedFloors;
					$scope.dormMan.checkedUnits = params.checkedUnits;

					$scope.dormMan.builds = params.builds;
					$scope.dormMan.currentBuildFloors = params.currentBuildFloors;
					$scope.dormMan.currentBuildUnit = params.currentBuildUnit;
					$scope.dormMan.params = params.params;
				}
				$scope.dormMan.getDorms();
			}else{
				if(toState.name == "dormman"){
					tempStorageService.removeObject("dormman" + "dormstuinfo");
					$scope.dormMan.getDorms();
				}
			}
		});
	})
	.directive('modPlaceholder', function($window, $timeout){
	return {
		restrict: 'A',
		scope: false,   // 默认值
		link: function(scope, element, attrs) {
			$timeout(function(){
				$("input.ui-select-search").attr("placeholder", "点击选择专业");
			},1000);
		}
	}
});