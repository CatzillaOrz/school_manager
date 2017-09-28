/**
 * Created by Administrator on 2017/6/22.
 * 实践统计
 */
angular.module('dleduWebApp')
	.controller('PracticeManStatsCtrl', function ($scope, $state, AuthService, messageService, PracticeManService,
												  CommonService, Select2LoadOptionsService) {
		$scope.practiceStats = {
			tabType: "people",//people 人数统计 task任务统计
			//记录
			records: [],
			//当前操作的class
			currentRecord: {},
			collegeDropList:[],
			majorDropList:[],
			companyList: [],
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			//实践人数查询条件
			peopleOption: {
				name: '',
				collegeId: '0',
				professionalId: '0'
			},

			//实践任务查询条件
			taskOption: {
				name: '',
				enterpriseName: '0',
			},

			//切换标签页
			switchType: function(type){
				this.tabType = type;
				this.records = [];
				this.peopleOption.collegeId = '0';
				this.peopleOption.professionalId = '0';
				this.taskOption.enterpriseName = '0';
				if(type == "people"){
					this.getPeopleStats();
				}else{
					this.getTaskStats();
				}
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
							return '按学院筛选';
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
								collegeId: that.peopleOption.collegeId,
							};
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

			//select2动态关键字查询列表配置
			selectCompany2Options: function () {
				var i = 0;
				var _this = this;
				return {
					ajax: Select2LoadOptionsService.getLoadOptions("api/practiceman/getCompanyName", {
						orgId: AuthService.getUser().orgId,
						pageNumber: 1,
						pageSize: 100,
						managerId: AuthService.getUser().id
					}, "name"),

					templateResult: function (data) {

						if (data.id === '') { // adjust for custom placeholder values
							_this.companyList = [];
							return '按企业名筛选';
						}
						_this.companyList.push(data);
						return data.name;
					},
					placeholder: {
						id: -1, // the value of the option
						text: '全部'
					},
					allowClear: true
				}
			},

			// 获取实践人数统计
			getPeopleStats: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					name: that.peopleOption.name,
					collegeId: that.peopleOption.collegeId,
					professionalId: that.peopleOption.professionalId,
				};
				//CommonService.delEmptyProperty(params);
				PracticeManService.getPeopleStats(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},

			// 获取实践任务统计
			getTaskStats: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					name: that.taskOption.name,
				};
				params.enterpriseName = this.getCompanyName(that.taskOption.enterpriseName);
				//CommonService.delEmptyProperty(params);
				PracticeManService.getTaskStats(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},

			//通过id获取公司名称
			getCompanyName: function(id){
				var name;
				for(var i = 0, length = this.companyList.length; i < length; i++){
					var temp = this.companyList[i];
					if(id == temp.id){
						name = temp.name;
						return name;
					}
				}
			},

			//导出实践人数
			exportPeopleStats: function(){
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: 1,
					pageSize: 9999999,
					name: that.peopleOption.name,
					collegeId: that.peopleOption.collegeId,
					professionalId: that.peopleOption.professionalId,
				};
				PracticeManService.exportPeopleStats(params).success(function(data) {
					that.saveAs(data, '实践人数统计');
				}).catch(function (e) {

				});;
			},

			//导出实践任务
			exportTaskStats: function(){
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: 1,
					pageSize: 9999999,
					name: that.taskOption.name,
					enterpriseName: that.taskOption.enterpriseName
				};
				PracticeManService.exportTaskStats(params).success(function(data) {
					that.saveAs(data, '实践任务统计');
				}).catch(function (e) {

				});;
			},

			s2ab: function(s) {
				var buf = new ArrayBuffer(s.length);
				var view = new Uint8Array(buf);
				for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
				return buf;
			},
			saveAs: function(data, fileName) {
				var that = this;
				var blob = new Blob([that.s2ab(data)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
				var windowUrl = (window.URL || window.webkitURL)
				var downloadUrl = windowUrl.createObjectURL(blob);
				var anchor = document.createElement("a");
				anchor.href = downloadUrl;
				anchor.download = fileName + '.xlsx';
				document.body.appendChild(anchor);
				anchor.click();
				windowUrl.revokeObjectURL(blob);
			},


			init: function () {
				this.getPeopleStats();
			}
		};
		$scope.practiceStats.init();
	});