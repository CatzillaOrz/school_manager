/**
 * Created by Administrator on 2017/6/22.
 * 宿舍管理
 */
angular.module('dleduWebApp')
	.controller('DormEditCtrl', function ($scope, $state, $timeout, DormManService, CommonService, messageService) {
		$scope.handleFn = {
			title: '新建宿舍',
			//宿舍楼对象
			dorm: {
				bedList: [
				],
				floorId: 0,//宿舍楼id
				floorNo: "", //楼层号
				no: "", //宿舍号
				roomDesc: "",//宿舍描述
				unitNo: ""//单元号
			},

			builds: [], //宿舍楼
			units: [], //单元
			floors: [], //楼层

			bedTypes: [{bedType: 0, name: '请选择床位类型'},{bedType: 10, name: '上铺'},
				{bedType: 20, name: '下铺'}],

			//获取宿舍楼信息
			getDormInfo: function (id) {
				var that = this;
				var params = {id: id};
				DormManService.getDormInfo(params).$promise
					.then(function (data) {
						that.dorm = data.data;
					})
					.catch(function (error) {

					})
			},

			//提交
			submit: function () {
				var that = this;
				var params = this.dorm;
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
				var id = this.dorm.floorId, builds = this.builds, build;
				if(id){
					angular.forEach(builds, function(item){
						if(id == item.id){
							build = item;
							return;
						}
					});
					if(build.floorType == 20){
						this.units = this.productArr(build.unitNum, 'unit');
					}
					this.floors = this.productArr(build.floorNum, 'floor');
				}
			},

			init: function () {
				var that = this;
				var id = $state.params.id;
				this.getBulids();
				if(id){//存在id时是编辑否则新增
					this.title = "编辑宿舍";
					this.getDormInfo(id);
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
	});