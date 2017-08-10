/**
 * Created by Administrator on 2017/6/23.
 * 新增、编辑企业导师
 */
angular.module('dleduWebApp')
	.controller('EidtEntTutorCtrl', function ($scope, $state, AuthService, EduManService, messageService, $filter,
											  PracticeManService) {
		$scope.handleFn = {
			isEditOrAdd: 'add', //true是编辑 false是新增
			//企业导师信息
			record: null,
			prompt: '填写以下信息以建立企业导师',
			title: '企业导师信息创建',
			id: $state.params.id,
			params: {
				name: '',// 姓名
				enterpriseName: '', //企业名称
				position: '', //职务
				department: '', //部门
				mailbox: '', //邮箱
				phone: '', //邮箱
			},

			// 查询导师信息
			getEntTutorInfo: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					id: that.id
				};
				PracticeManService.getEntTutorInfo(params).$promise
					.then(function (data) {
						that.params = data;
					})
					.catch(function (error) {

					})
			},

			//保存导师
			save: function(){
				if(this.isEditOrAdd == 'edit'){
					PracticeManService.updateEntTutor(this.params).$promise
						.then(function (data) {
							if(data.success){
								messageService.openMsg("修改成功!");
								$state.go("enttutorman");
							}else{
								messageService.openMsg(data.message);
							}
						})
						.catch(function (error) {

						})
				}else{
					PracticeManService.addEntTutor(this.params).$promise
						.then(function (data) {
							if(data.success){
								messageService.openMsg("新增成功!");
								$state.go("enttutorman");
							}else{
								messageService.openMsg(data.message);
							}
						})
						.catch(function (error) {

						})
				}
			},

			//提交
			submit: function(){
				this.save();
			},

			init: function () {
				if($state.params.id && $state.params.id != ''){
					this.isEditOrAdd = 'edit';
					this.title = "企业导师信息修改";
					this.getEntTutorInfo($state.params.id);
				}
			}
		};
		$scope.handleFn.init();
	});