/**
 * Created by Administrator on 2017/6/22.
 * 宿舍学生明细
 */
angular.module('dleduWebApp')
	.controller('DormStuInfoCtrl', function ($scope, $state, $timeout, DormManService, CommonService, messageService,
											 ngDialog) {
		$scope.dormStuInfo = {
			roomId: 0,
			currentRecord: null,
			stuId: null,
			students: [],
			//获取宿舍学生明细
			getDormStus: function () {
				var that = this;
				var params = {};
				params.roomId  = $state.params.id;
				DormManService.getDormStus(params).$promise
					.then(function (data) {
						if(data.result){
							that.records = data.data;
						}else{
							messageService.openMsg("查询失败！");
						}
					})
					.catch(function (error) {
						messageService.openMsg("查询异常！");
					})
			},

			//课程下拉搜索
			select2StuOptions:function(){
				var that=this;
				return {
					ajax: {
						url: "api/dormman/getStusByMajor",
						dataType: 'json',
						//delay: 250,
						data: function (query) {
							var params={
								roomId: that.roomId
							}
							params.name=query.term;
							console.log(params);
							return params;
						},
						processResults: function (data, params) {
							params.page = params.page || 1;
							return {
								results: data.data,
								pagination: {
									more: (params.page * 30) < data.total_count
								}
							};
						},
						cache: true
					},
					templateResult: function (data) {
						if (data.stuId === '') { // adjust for custom placeholder values
							return 'Custom styled placeholder text';
						}
						that.students.push(data);
						return data.name;
					}}
			},

			/**
			 * 获取分配专业学生列表
			 */
			getStusByMajor: function () {
				var that = this;
				var params = {roomId: that.roomId};
				DormManService.getStusByMajor(params).$promise
					.then(function (data) {
						if(data.result){
							that.students = data.data;
						}else{
							messageService.openMsg("查询学生列表失败！");
						}
					})
					.catch(function (error) {
						messageService.openMsg("查询学生列表异常！");
					})
			},

			/**
			 * 打开弹出框
			 */
			openBed: function(record){
				this.currentRecord = record;
				ngDialog.open({
					template: 'distBedDialog',
					width: 700,
					scope: $scope,
					preCloseCallback: function(){
					}
				})
			},

			/**
			 * 分配床位
			 */
			distBed: function(){
				var id = this.stuId, that = this;
				var params = {stuId: id, bedId: that.currentRecord.bedId};
				DormManService.distedBed(params).$promise
					.then(function (data) {
						if(data.result){
							messageService.openMsg("分配床位成功！");
							that.getDormStus();
							that.getStusByMajor();
							that.stuId = 0;
						}else{
							messageService.openMsg("分配床位失败！");
						}
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error,"分配床位异常！"));
					})
			},

			//移除床位
			delBed: function () {
				var that = $scope.dormStuInfo;
				var params = {
					bedId: that.currentRecord.bedId
				};
				DormManService.delBedStu(params).$promise
					.then(function (data) {
						messageService.openMsg("移出宿舍成功！");
						that.getDormStus();
						that.getStusByMajor();
					})
					.catch(function (error) {
						messageService.openMsg(CommonService.exceptionPrompt(error,"移出宿舍失败！"));
					})
			},

			//移除提示
			deletePrompt: function (entity) {
				var that = this;
				that.currentRecord = entity;
				messageService.getMsg("您确定要把该学生移出宿舍吗？", that.delBed);
			},


			init: function () {
				this.roomId = $state.params.id;
				this.getDormStus(this.roomId);
				this.getStusByMajor();
			}
		};
		$scope.dormStuInfo.init();
	});