/**
 * Created by Administrator on 2017/6/22.
 * 创建实践小组
 */
angular.module('dleduWebApp')
	.controller('CreatePracticeGroupCtrl', function ($scope, $state, $timeout, AuthService, messageService, PracticeManService,
													 CommonService, TeacherService, StudentService, TeachClassService, Select2LoadOptionsService) {
		$scope.handleFn = {
			//提示title
			title: "新建实践小组",
			//提示
			prompt: "填写以下信息以建立实践小组",
			//操作标识
			handle: "create",
			//添加步骤
			steps: [
				{title: '选择教师'},
				{title: '选择学生'},
				{title: '创建实践小组'}
			],
			//当前步骤
			step: 1,
			//参数
			params: {
				classOrStudents: 0,
				classesIds: [],
				studentIds: [],
				studentsCount: 0,
				teacherIds: [],
				teacherNames: "",
				code: "",
				userId: AuthService.getUser().id,
				id: 0,
				name: ""
			},
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},
			//学院下拉列表数据
			collegeDropList: [],
			//班级下拉列表数据
			classDropList: [],
			//学院下拉搜索参数 查老师
			searchParams: {
				orgId: AuthService.getUser().orgId,
				name: "",
				collegeId: ""
			},
			//班级下拉搜素参数 查学生
			searchStudentParams: {
				orgId: AuthService.getUser().orgId,
				name: "",
				classesId: ""
			},
			//教师列表
			teacherList: [],
			//选择老师数据
			selectTeacherList: [],
			//学生列表
			studentList: [],
			//选择的学生
			selectStudentList: [],
			//选择的班级列表
			selectClassesList: [],
			//选择的班级id
			selectClassesId: "",

			//学院下拉搜素
			selectCollege2Options: function () {
				var _this = this;
				return {
					placeholder: {
						id: '-1', // the value of the option
						text: '按班级筛选'
					},
					allowClear: true,
					ajax: Select2LoadOptionsService.getLoadOptions("api/college/getCollegeDropList", {
						orgId: AuthService.getUser().orgId,
						pageNumber: 1,
						pageSize: 100
					}, "name"),

					templateResult: function (data) {

						if (data.id === '') { // adjust for custom placeholder values
							_this.collegeDropList = [];
							return '按班级筛选';
						}
						_this.collegeDropList.push(data);
						return data.name;
					}

				}
			},
			//班级下拉列表配置
			select2ClassOptions: function () {
				var that = this;
				return {
					ajax: {
						url: "api/class/getClassDropListOrg",
						dataType: 'json',
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
							return {
								results: data.data,
								pagination: {
									more: (params.page * 30) < data.total_count
								}
							};
						},
						cache: true
					},
					allowClear: true,
					placeholder: {
						id: '-1', // the value of the option
						text: '按班级筛选'
					},
					templateResult: function (data) {
						if (data.id === '') { // adjust for custom placeholder values
							return 'Custom styled placeholder text';
							that.classDropList = [];
						}
						that.classDropList.push(data);
						return data.name;
					}
				}
			},

			complete: false,
			//获取老师
			getSimpleTeachers: function () {
				var _this = this;
				var params = _this.searchParams;
				PracticeManService.getEntTutorList(params).$promise
					.then(function (data) {
						//_this.teacherList = data.data;
						_this.teacherList = data.content;
					})
					.catch(function (error) {

					})
			},
			//获取学生
			getSimpleStudents: function () {
				var _this = this;
				var params = _this.searchStudentParams;
				StudentService.getSimpleStudents(params).$promise
					.then(function (data) {
						_this.studentList = data.data;

					})
					.catch(function (error) {

					})
			},
			//下一步
			nextStep: function () {
				this.step = this.step + 1;
			},
			//上一步
			preStep: function () {
				var _this = this;
				if (_this.step3Tooggle != "select") {
					_this.step3Tooggle = "select";

					return;
				}
				this.step = this.step - 1;
			},
			//选择的老师
			selectTeacher: function (entity) {
				var _this = this;
				var temp = _.filter(_this.selectTeacherList, function (value) {
					if (entity.id == value.id) {
						return value;
					}
				});
				if (temp.length == 0) {
					_this.selectTeacherList.splice(0, 0, entity);
				}
			},
			//移除老师
			removeSelectedTeacher: function (entity) {
				var _this = this;
				_this.selectTeacherList = _.filter(_this.selectTeacherList, function (value) {
					if (entity.id != value.id) {
						return value;
					}
				});
			},
			//选择学生
			selectStudent: function (entity) {
				var _this = this;
				var temp = _.filter(_this.selectStudentList, function (value) {
					if (entity.id == value.id) {
						return value;
					}
				});
				if (temp.length == 0) {
					_this.selectStudentList.splice(0, 0, entity);
				}
			},
			//移除学生
			removeSelectedStudent: function (entity) {
				var _this = this;
				_this.selectStudentList = _.filter(_this.selectStudentList, function (value) {
					if (entity.id != value.id) {
						return value;
					}
				});
			},
			//第三步 中的两种选择的切换
			step3Select: function (str) {
				var _this = this;
				if (str == "class") {
					_this.params.classesIds.push("0.default");
					_this.selectStudentList = [];
				} else if (str == "students") {

					_this.params.classesIds = [];
				}
				this.step3Tooggle = str;
			},
			//获取选择的选择的老师id
			getSelectTeacherIdList: function () {
				var result = [];
				angular.forEach(this.selectTeacherList, function (data) {
					result.push(data.id)
				})
				return result;

			},
			//获取选择的学生id
			getSelectStudentIdList: function () {
				var result = [];
				angular.forEach(this.selectStudentList, function (data) {
					result.push(data.id)
				})
				return result;

			},
			//保存教学班
			addTeachClass: function () {
				var _this = this;
				var params = _this.params;
				if (params.classesIds.length != 0) {
					params.classOrStudents = 10;
				} else {
					params.classOrStudents = 20;
					params.studentIds = _this.getSelectStudentIdList();
				}
				params.teacherIds = _this.getSelectTeacherIdList();

				TeachClassService.addTeachClass(params).$promise
					.then(function (data) {
						$state.go("teachclasslist");

					})
					.catch(function (error) {
						var re = /[^\u4e00-\u9fa5]/;
						if (re.test(error.data)) {
							messageService.openMsg("添加教学班失败！");

						} else {
							messageService.openMsg(error.data);

						}
					})
			},
			//第三步的表单验证
			validateStep3: function () {
				var _this = this;
				if (_this.selectStudentList.length == 0) {
					if (_this.params.classesIds[0] && _this.params.classesIds[0] == '0.default') {
						return false
					} else if (!_this.params.classesIds[0]) {
						return false
					} else if (_this.params.classesIds[0] && _this.params.classesIds[0] != '0.default') {
						return true;
					}
				} else {
					return true;
				}
			},

			//提交
			submit: function () {
				var that = this;
				that.addTeachClass();
			},

			init: function () {
				var that = this;
				that.handle = $state.current.ncyBreadcrumbLabel;
				that.title = that.handle;
				that.prompt = $state.current.data.prompt;
				that.completeMSG = $state.current.data.completeMSG;
				that.getSimpleTeachers();
				that.getSimpleStudents();
			}
		};
		$scope.handleFn.init();

		$timeout(function () {
			//$scope.handleFn.init();
			//班级变动 自动查询学生
			$scope.$watch('handleFn.searchStudentParams.classesId', function(newValue, oldValue) {
				if (newValue!=oldValue){
					$scope.handleFn.getSimpleStudents();
				}
			});
		})
	});