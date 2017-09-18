/**
 * Created by Administrator on 2017/6/21.
 */
angular.module('dleduWebApp')
	.controller('ElecFenceCtrl', function ($scope, $state, $timeout, AuthService, EduManService, Select2LoadOptionsService,
										   MajorService, CollegeService, ClassService, messageService, CommonService, RoleAuthService) {
		$scope.evaFenceFn = {
			//结果中离线的人数，
			allLeave: 0,
			//结果中当前离线的人数，
			currentLeave: 0,
			//问卷信息
			records: [],
			//学院下拉列表
			collegeDropList: [],
			//专业下拉列表
			majorDropList: [],
			//班级下拉列表
			classDropList: [],
			//学院id
			collegeId: 0,
			//专业id
			majorId: 0,
			//班级id
			classesId: 0,

			date: '',

			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			params: {
				isLeaveSchool: null,
				isActivation: null,
				isLoginId: null,
				isAtSchool: null,
				isOline: null,
				isLogin: null,
				time: '',
				name: null,
				jobNumber: null,
				organId: AuthService.getUser().organId,
				collegeId: null,
				professionalId: null,
				classId: null
			},

			isLeaveSchools: [],//是否曾离校
			isActives: [],//是否激活
			isLogins: [],//是否登录当天
			locations: [],//当前位置
			isOnlines: [],//是否在线


			//控制按钮权限
			isUseAuth: function(type){
				return RoleAuthService.isUseAuthority(type);
			},

			//获取结果筛选条件
			getResultOption: function (type) {
				if (type == "isLeaveSchool") {
					this.isLeaveSchools = [{id: null, text: '是否曾离校'}, {id: 1, text: '是'}, {id: 0, text: '否'}, {
						id: 2,
						text: '未知'
					}];
				} else if (type == "isActive") {
					this.isActives = [{id: null, text: '是否未激活'}, {id: 0, text: '是'}, {id: 1, text: '否'}];
				} else if (type == "isLogin") {
					this.isLogins = [{id: null, text: '当天是否登录'}, {id: 1, text: '是'}, {id: 0, text: '否'}];
				} else if (type == "location") {
					this.locations = [{id: null, text: '当前位置'}, {id: 1, text: '在校'}, {id: 0, text: '离校'}, {id: 2, text: '未知'}];
				} else if (type == "isOnline") {
					this.isOnlines = [{id: null, text: '在线状态'}, {id: 1, text: '在线'}, {id: 0, text: '离线'}];
				}

				//return {minimumResultsForSearch: -1};
			},

			getNowDate: function() {
				var myDate,myDateStr;
				myDate = new Date();
				var yyyy = myDate.getFullYear();//取四位年份
				var MM= myDate.getMonth()+1;//取月份
				if(MM<10)
				{
					MM="0"+MM;
				}
				var dd= myDate.getDate();//取日
				if(dd<10)
				{
					dd="0"+dd;
				}
				myDateStr=yyyy+"-"+MM+"-"+dd;
				return myDateStr;
			},


			//学院下拉列表查询
			getCollegeDropList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: 500,
					managerId: AuthService.getUser().id
				}
				CollegeService.getCollegeDropList(params).$promise
					.then(function (data) {
						that.collegeDropList = data.data;
						that.collegeDropList.splice(0, 0, {id: null, name : "--请选择--"});
					})
					.catch(function (error) {
					})
			},
			//通过id查询学院
			getCollegeById: function (collegeId) {
				var that = this;
				var params = {
					id: collegeId
				};
				CollegeService.getCollegeById(params).$promise
					.then(function (data) {
						var temp = {
							id: data.id,
							name: data.name
						}
						that.collegeDropList.push(temp);
						that.collegeId = data.id;

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
				MajorService.getMajorDropList(params).$promise
					.then(function (data) {
						that.majorDropList = data.data;
						that.majorDropList.splice(0, 0, {id: null, name : "--请选择--"});
						if (!that.isInit && $state.current.name == "studentEdit") {
							that.getMajorById(that.majorId);
						}

					})
					.catch(function (error) {
					})
			},
			//通过id查询专业
			getMajorById: function (majorId) {
				var that = this;
				var params = {
					id: majorId
				}
				MajorService.getMajorById(params).$promise
					.then(function (data) {
						var temp = {
							id: data.id,
							name: data.name
						}
						that.majorDropList.push(temp);
						that.majorId = data.id;
					})
					.catch(function (error) {
					})
			},
			//班级下拉类表查询
			getClassDropList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: 100
				}
				params.professionalId = that.params.professionalId;
				ClassService.getClassDropList(params).$promise
					.then(function (data) {
						that.classDropList = data.data;
						that.classDropList.splice(0, 0, {id: null, name : "--请选择--"});
						if (!that.isInit && $state.current.name == "studentEdit") {
							that.getClassById(that.classesId);
							that.isInit = true;
						}

					})
					.catch(function (error) {
					})
			},
			//通过id查询班级
			getClassById: function (classesId) {
				var that = this;
				var params = {
					id: classesId
				}
				ClassService.getClassById(params).$promise
					.then(function (data) {
						var temp = {
							id: data.id,
							name: data.name
						}
						that.classDropList.push(temp);
						that.classesId = data.id;
					})
					.catch(function (error) {
					})
			},


			// 获取电子围栏信息列表
			getElecFenceList: function () {
				var that = this;
				this.params.pageNumber = that.page.pageNumber;
				this.params.pageSize = that.page.pageSize;
				this.params.time = new Date(this.date).getTime();
				this.params.organId = AuthService.getUser().orgId;
				var params = angular.copy(this.params);
				params.managerId = AuthService.getUser().id;
				CommonService.delEmptyProperty(params);
				EduManService.getElecFenceList(params).$promise
					.then(function (data) {
						that.allLeave = data.onceLeave;
						that.currentLeave = data.nowLeave;
						that.records = data.pagedata.data;
						that.page = data.pagedata.page;
						that.page.pageNumber++;
					})
					.catch(function (error) {

					})
			},

			//通知班主任
			notice: function (id) {
				EduManService.notice({organId: AuthService.getUser().orgId, userId: id}).$promise
					.then(function (data) {
						if (data.success) {
							messageService.openMsg("通知成功!");
						} else {
							messageService.openMsg("通知失败!");
						}
					})
					.catch(function (e) {

					})
			},

			//计算禁用按钮
			disableButton: function(index, type){
				var record = this.records[index];
				if(type == 'current'){
					if(record.remark=='未登录' && record.onlinStatus=='离线'){
						return false;
					}else if(record.remark=='未激活' && record.onlinStatus=='离线'){
						return false;
					}else{
						return true;
					}
				}
				if(type == 'history'){
					if(record.remark=='未激活' && record.onlinStatus=='离线'){
						return false;
					}else{
						return true;
					}
				}
			},

			//设置围栏
			setFence: function () {
				$state.go('elecfencecreate');
			},

			init: function () {
				this.getCollegeDropList();
				this.date = this.getNowDate();
				this.getElecFenceList();
			}
		};
		$scope.evaFenceFn.init();

		$timeout(function () {
			$scope.$watch('evaFenceFn.params.collegeId', function (newValue, oldValue) {
				if (newValue != oldValue) {
					if(newValue && newValue != ''){
						$scope.evaFenceFn.getMajorDropList();
					}
				}
			});
		})
		$timeout(function () {
			$scope.$watch('evaFenceFn.params.professionalId', function (newValue, oldValue) {
				if (newValue != oldValue) {
					if(newValue && newValue != '') {
						$scope.evaFenceFn.getClassDropList();
					}
				}
			});
		})
		$timeout(function () {
			$scope.$watch('evaFenceFn.params.isLeaveSchool', function (newValue, oldValue) {
				if (newValue != oldValue) {
					$scope.evaFenceFn.getElecFenceList();
				}
			});
		});
		$timeout(function () {
			$scope.$watch('evaFenceFn.params.isActivation', function (newValue, oldValue) {
				if (newValue != oldValue) {
					$scope.evaFenceFn.getElecFenceList();
				}
			});
		});
		$timeout(function () {
			$scope.$watch('evaFenceFn.params.isAtSchool', function (newValue, oldValue) {
				if (newValue != oldValue) {
					$scope.evaFenceFn.getElecFenceList();
				}
			});
		});
		$timeout(function () {
			$scope.$watch('evaFenceFn.params.isOline', function (newValue, oldValue) {
				if (newValue != oldValue) {
					$scope.evaFenceFn.getElecFenceList();
				}
			});

		});
		$timeout(function () {
			$scope.$watch('evaFenceFn.params.isLogin', function (newValue, oldValue) {
				if (newValue != oldValue) {
					$scope.evaFenceFn.getElecFenceList();
				}
			});

		});
		$timeout(function () {
			$scope.$watch('evaFenceFn.date', function (newValue, oldValue) {
				if (newValue != oldValue) {
					$scope.evaFenceFn.getElecFenceList();
				}
			});
		});
	});
