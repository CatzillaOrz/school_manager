/**
 * Created by Administrator on 2017/6/22.
 * 宿舍管理
 */
angular.module('dleduWebApp')
	.controller('DormEditCtrl', function ($scope, $state, $timeout, DormManService, CommonService, messageService) {
		$scope.handleFn = {
			title: '新建宿舍',
			id: '',
			isEdit: false,//宿舍楼对象
			dorm: {
				bedList: [
				],
				floorId: 0,//宿舍楼id
				floorNo: 0, //楼层号
				no: "", //宿舍号
				roomDesc: "",//宿舍描述
				unitNo: 0//单元号
			},

			builds: [], //宿舍楼
			units: [], //单元
			floors: [], //楼层
			isEmpty: 0,
			validateObj:{
				isExistDormName: true, //校验宿舍名是否重复
			},

			bedTypes: [{bedType: 0, name: '请选择床位类型'},{bedType: 10, name: '上铺'},
				{bedType: 20, name: '下铺'}],

			//获取宿舍楼信息
			getDormInfo: function (id) {
				var that = this;
				var params = {id: id};
				DormManService.getDormInfo(params).$promise
					.then(function (data) {
						that.dorm = data.data;
						that.dorm.floorNo != "" ? that.dorm.floorNo = (parseInt(that.dorm.floorNo)) : that.dorm.unitNo = 0;
						that.dorm.unitNo != "" ? that.dorm.unitNo = (parseInt(that.dorm.unitNo)) : that.dorm.unitNo = 0;
					})
					.catch(function (error) {

					})
			},

			//判断哪个床位是空
			isEmptyBed: function(beds){
				this.isEmpty = 0;
				var count = 0;
				for(var i = 0; i < beds.length; i++){
					var bed = beds[i];
					if(bed.name == '' && bed.bedType){
						return "请填写" + (i + 1) + "号床位名称";
					}
					if(bed.name != '' && !bed.bedType){
						return "请选择" + (i + 1) + "号床位类型";
					}
					if(bed.name == '' && !bed.bedType){
						count++;
					}
				}
				this.isEmpty = count;
				return null;
			},

			//提交
			submit: function () {
				var that = this;
				var params = this.dorm;
				if(!params.floorId){
					messageService.openMsg("请选择楼栋！");
					return;
				}
				if(params.floorId){
					if(this.building.floorType == 10){
						if(!params.floorNo){
							messageService.openMsg("请选择楼层！");
							return;
						}
					}else{
						if(!params.unitNo){
							messageService.openMsg("请选择单元！");
							return;
						}else{
							if(!params.floorNo){
								messageService.openMsg("请选择楼层！");
								return;
							}
						}
					}
				}
				var mess = this.isEmptyBed(params.bedList);
				if(this.isEmpty == params.bedList.length){
					messageService.openMsg("请至少添加一个床位！");
					return;
				}else{
					if(mess){
						messageService.openMsg(mess);
						return;
					}
				}
				if(!this.validateObj.isExistDormName){
					return;
				}
				this.dorm.floorNo == 0 ? this.dorm.floorNo = "" : this.dorm.floorNo;
				this.dorm.unitNo == 0 ? this.dorm.unitNo = "" : this.dorm.unitNo ;
				var bedlists = [];
				for(var i = 0; i < this.dorm.bedList.length; i++){
					var bed = this.dorm.bedList[i];
					if(bed.name == '' && !bed.bedType){
						continue;
					}
					bedlists.push(bed);
				}
				params.bedList = bedlists;
				if(this.title == "编辑宿舍"){
					this.updateDorm(params);
				}else{
					this.addDorm(params);
				}
			},

			/**
			 * 新增
			 */
			addDorm: function(params){
				DormManService.addDorm(params).$promise
					.then(function (data) {
						if(data.result){
							messageService.openMsg("新增成功!");
							$state.go("dormman");
						}else{
							messageService.openMsg(data.message);
						}
					})
					.catch(function (error) {
						messageService.openMsg("新增异常!");
					})
			},

			/**
			 * 编辑
			 */
			updateDorm: function(params){
				DormManService.updateDorm(params).$promise
					.then(function (data) {
						if(data.result){
							messageService.openMsg("修改成功!");
							$state.go("dormman");
						}else{
							messageService.openMsg(data.message);
						}
					})
					.catch(function (error) {
						messageService.openMsg("修改异常!");
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
						that.builds.splice(0, 0, {name: "请选择楼栋", id: 0});
						if(that.title == "编辑宿舍"){
							that.getDormInfo(that.id);
						}
					})
					.catch(function (error) {

					})
			},

			/**
			 * 根据整数循环产生数组
			 */
			productArr: function(num, type){
				var arr = [];
				for(var i = 0; i < num; i++){
					arr.push({id: i + 1, name: type =='floor'? (i+1)+"层"  : (i+1)+"单元"});
				}
				return arr;
			},

			/**
			 * 根据选择的楼栋类型生成楼层和单元信息
			 */
			productFloorUnit: function(){
				this.units = [], this.floors = [];
				var id = this.dorm.floorId, builds = this.builds, build;
				if(id){
					angular.forEach(builds, function(item){
						if(id == item.id){
							build = item;
							return;
						}
					});
					this.building = build;
					if(build.floorType == 20){
						this.units = this.productArr(build.unitNum, 'unit');
						this.units.splice(0, 0, {name: "请选择单元", id: 0});
					}
					this.floors = this.productArr(build.floorNum, 'floor');
					this.floors.splice(0, 0, {name: "请选择楼层", id: 0});
				}
			},

			//增加床位
			addItem: function(){
				this.dorm.bedList.push({
					bedType: 0,//床铺类型 10上铺 20 下铺
					name: "" //床位名称
				});
			},

			//删除床位
			deleteItem: function($index){
				this.dorm.bedList.splice($index, 1);
			},

			/**
			 * 是否存在该宿舍名
			 * @param name
			 */
			isExistName: function(name){
				//编辑时不校验
				if(this.isEdit){
					return;
				}
				var params = {no: name}, that = this;
				if(name == ''){
					return;
				}
				if(!this.dorm.floorId || !this.dorm.floorNo){
					return;
				}
				if(this.building && this.building.floorType == 20){
					if(!this.dorm.unitNo){
						return;
					}
					params.unitNo = this.dorm.unitNo;
				}
				params.floorId = this.dorm.floorId;
				params.floorNo = this.dorm.floorNo;

				DormManService.validationDorm(params).$promise
					.then(function (data) {
						that.validateObj.isExistDormName = data.validation;
					})
					.catch(function (error) {

					})
			},

			init: function () {
				var that = this;
				this.id = $state.params.id;
				this.getBulids();
				if(this.id){//存在id时是编辑否则新增
					this.title = "编辑宿舍";
					this.isEdit = true;
				}else{
					//新增时初始化床位信息
					for(var i = 0 ; i < 6; i++){
						this.dorm.bedList.push({
							bedType: 0,//床铺类型 10上铺 20 下铺
							name: "" //床位名称
						});
					}
				}
			}
		};
		$scope.handleFn.init();

		$timeout(function () {
			$scope.$watch('handleFn.dorm.floorId', function (newValue, oldValue) {
				if (newValue != oldValue) {
					if($scope.handleFn.dorm.floorNo == null){
						$scope.handleFn.dorm.floorNo = 0;
					}
					if($scope.handleFn.dorm.unitNo == null){
						$scope.handleFn.dorm.unitNo = 0;
					}
					$scope.handleFn.productFloorUnit();
					$scope.handleFn.isExistName($scope.handleFn.dorm.no);
				}
			});
		});
	});