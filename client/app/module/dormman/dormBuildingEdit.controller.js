/**
 * Created by Administrator on 2017/6/22.
 * 编辑宿舍楼
 */
angular.module('dleduWebApp')
	.controller('DormBuildingEditCtrl', function ($scope, $state, messageService, DormManService, UploadService, CommonService) {
		$scope.handleFn = {
			title: '新建宿舍楼',
			//宿舍楼对象
			building: {
				name: '',
				floorType: '', //楼栋类型 10:普通型，20：套间型
				floorDesc: '', //备注
				floorNum: '',//楼层数
				unitNum: '', //单元数
				floorImage: '' //图片url
			},

			//获取宿舍楼信息
			getDormBuildingInfo: function (id) {
				var that = this;
				var params = {id: id};
				DormManService.getDormBuildingInfo(params).$promise
					.then(function (data) {
						that.building = data.data;
					})
					.catch(function (error) {

					})
			},

			//提交
			submit: function () {
				var that = this;
				var params = this.building;
				if(params.floorType == ''){
					messageService.openMsg("请选择宿舍楼类型!");
					return;
				}
				if(this.imgFile){//如果图片上传时
					this.uploadImage(params);
				}else{
					if(this.title == "编辑宿舍楼"){
						this.updateDormBuilding(params);
					}else{
						this.addDormBuilding(params);
					}
				}
			},

			/**
			 * 新增
			 */
			addDormBuilding: function(params){
				DormManService.addDormBuilding(params).$promise
					.then(function (data) {
						if(data.result){
							messageService.openMsg("新增成功!");
							$state.go("dormbuildingman");
						}else{
							messageService.openMsg(data.message);
						}
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error,"新增异常！"));
					})
			},

			/**
			 * 编辑
			 */
			updateDormBuilding: function(params){
				DormManService.updateDormBuilding(params).$promise
					.then(function (data) {
						if(data.result){
							messageService.openMsg("修改成功!");
							$state.go("dormbuildingman");
						}else{
							messageService.openMsg(data.message);
						}
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error,"修改异常！"));
					})
			},

			selectFile: function ($file) {
				var _this = this;
				_this.imgFile = $file;
			},

			//上传图片
			uploadImage: function (params) {
				var that = this;
				UploadService.blobUploadToQiNiu(that.imgFile)
					.then(function (resp) {
						var url = resp.data.url;
						params.floorImage = url;
						if(that.title == "编辑宿舍楼"){
							that.updateDormBuilding(params);
						}else{
							that.addDormBuilding(params);
						}
					}, function (resp) {
						CommonService.msgDialog('图片上传失败！！', 2);
					}, function (evt) {
						var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					})
			},

			init: function () {
				var that = this;
				var id = $state.params.id;
				if(id){//存在id时是编辑否则新增
					this.title = "编辑宿舍楼";
					this.getDormBuildingInfo(id);
				}
			}
		};
		$scope.handleFn.init();
	});