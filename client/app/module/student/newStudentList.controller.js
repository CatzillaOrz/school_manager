'use strict';

angular.module('dleduWebApp')
	.controller('NewStudentCtrl', function ($scope, $state, CollegeService, MajorService, AuthService, StudentService, messageService, CommonService,
											ngDialog, Upload, ImpBatchService, AccountService, Select2LoadOptionsService,
											$timeout, RoleAuthService) {
		$scope.newStudentListFn = {
			//学生列表
			studentList: [],
			//当前操作的student
			currentStudent: {},
			myFile: null, //选择的文件对象
			errorInfos: null, //返回的错误信息
			//学院下拉列表
			collegeDropList: [],
			//专业下拉列表
			majorDropList: [],
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 2
			},
			params: {
				name: "",
				collegeId: "",
				professionalId: "",
			},

			//控制按钮权限
			isUseAuth: function (type) {
				return RoleAuthService.isUseAuthority(type);
			},

			//select2动态关键字查询列表配置
			selectCollege2Options: function () {
				var _this = this;
				return {

					ajax: Select2LoadOptionsService.getLoadOptions("api/college/getCollegeDropList", {
						orgId: AuthService.getUser().orgId,
						pageNumber: 1,
						pageSize: 100,
						managerId: AuthService.getUser().id
					}, "name"),

					templateResult: function (data) {

						if (data.id === '') { // adjust for custom placeholder values
							_this.collegeDropList = [];
							return '按班级筛选';
						}
						_this.collegeDropList.push(data);
						return data.name;
					},
					placeholder: {
						id: -1, // the value of the option
						text: '全部'
					},
					allowClear: true
				}
			},
			//专业下拉列表配置
			select2MajorOptions: function () {
				var that = this;
				return {
					placeholder: {
						id: -1, // the value of the option
						text: '全部'
					},
					allowClear: true,
					ajax: {
						url: "api/major/getMajorDropList",
						dataType: 'json',
						//delay: 250,
						data: function (query) {
							var params = {
								orgId: AuthService.getUser().orgId,
								pageNumber: 1,
								pageSize: 100,
								collegeId: that.params.collegeId,

							};
							params.name = query.term;
							return params;
						},
						processResults: function (data, params) {
							params.page = params.page || 1;
							return {
								results: data.data ? data.data : [],
								pagination: {
									more: (params.page * 30) < data.total_count
								}
							};
						},
						cache: false
					},

					templateResult: function (data) {
						if (data.id === '') { // adjust for custom placeholder values
							that.majorDropList = [];
						}
						that.majorDropList.push(data);
						return data.name;
					}
				}
			},
			getCollegeDropList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: 0,
					pageSize: 1000,
					managerId: AuthService.getUser().id
				}
				CollegeService.getCollegeDropList(params).$promise
					.then(function (data) {
						that.collegeDropList = data.data;
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
				if (params.collegeId == "") {
					params.collegeId = -1;
				}
				MajorService.getMajorDropList(params).$promise
					.then(function (data) {
						that.majorDropList = data.data;
						if (!that.isInit && $state.current.name == "studentEdit") {
							that.getMajorById(that.majorId);
						}

					})
					.catch(function (error) {
					})
			},
			// 获取学生列表
			getStudentList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					managerId: AuthService.getUser().id
				};
				params.collegeId = that.params.collegeId;
				params.professionalId = that.params.professionalId;
				params.name = that.params.name;
				StudentService.getNewStudent(params).$promise
					.then(function (data) {
						that.studentList = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},
			//根据名称查询
			findStudentByPage: function () {
				this.page.pageNumber = 1;
				this.getStudentList();
			},

			/**
			 * 弹出批量导入弹出框
			 */
			openImpBatch: function (type) {
				var that = this;
				var params = {
					template: 'importDialog',
					width: 600,
					scope: $scope,
				};
				if (type == 'reset') {
					ngDialog.close();
					ImpBatchService.openImpBatch(params);
					return;
				}
				CommonService.addLoading(true, 'all');
				StudentService.getNewImpResult({
					orgId: AuthService.getUser().orgId,
					userId: AuthService.getUser().id
				}).$promise
					.then(function (data) {
						CommonService.addLoading(false, 'all');
						if (typeof data.state == 'undefined') {
							ImpBatchService.openImpBatch(params);
						} else {
							if (data.state == 10) {//数据正在处理请稍候查看
								messageService.openMsg("数据正在处理，请稍候导入数据！");
							} else if (data.state == 20) {
								that.findStudentByPage();
								ImpBatchService.openImpBatch(params);
							} else if (data.state == 30) { //出错时
								that.errorInfos = data
								ngDialog.close();
								var dialogParams = {
									template: 'importResultDialog',
									width: 600,
									scope: $scope
								};
								ngDialog.open(dialogParams);
							}
						}
					})
					.catch(function (error) {

					})
			},

			/**
			 * 弹出批量导入弹出框
			 */
			importantBatch: function (file) {
				var params = {
					file: file,
					orgId: AuthService.getUser().orgId,
					userId: AuthService.getUser().id,
					uploadType: 'newStudent'
				};
				var dialogParams = {
					template: 'importResultDialog',
					width: 600,
					scope: $scope
				};
				ImpBatchService.importantBatch(params, this, dialogParams);
			},

			//选择文件事件
			selected: function ($newFiles) {
				ImpBatchService.selected($newFiles);
			},

			/**
			 * 下载模板
			 */
			downLoad: function () {
				ImpBatchService.downLoad('newStudent');
			},


			init: function () {
				this.params.collegeId = $state.params.collegeId;
				this.params.professionalId = $state.params.professionalId;
				this.getCollegeDropList();
				this.getMajorDropList();
				this.getStudentList();
			}
		};
		$scope.newStudentListFn.init();
		$timeout(function () {
			$scope.$watch('newStudentListFn.params.collegeId', function (newValue, oldValue) {
				if (!newValue) {
					$scope.newStudentListFn.params.majorId = null;
				}
				if (newValue != oldValue) {
					$scope.newStudentListFn.majorDropList = [];
				}
			});
		});
	});
