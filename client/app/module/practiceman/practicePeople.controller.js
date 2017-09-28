/**
 * Created by Administrator on 2017/6/22.
 * 实践小组管理
 */
angular.module('dleduWebApp')
	.controller('PracticePeopleCtrl', function ($scope, $state, AuthService, EduManService, messageService, CommonService,
												  PracticeManService) {
		$scope.practicePeople = {
			//问卷列表
			records: [],
			//当前操作的class
			currentRecord: {},
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			//查询条件
			queryOption: {
				stuName: '',
				classId: ''
			},

			// 获取评教问卷已分配列表
			getPeopleDetail: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					stuName: that.queryOption.stuName,
					classId: that.queryOption.classId
				};
				PracticeManService.getPeopleDetail(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},

			//导出
			exportData: function(){
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: 1,
					pageSize: 10000,
					stuName: that.queryOption.stuName,
					classId: that.queryOption.classId
				};
				/*PracticeManService.exportPeople(params).$promise
					.then(function (data) {
						that.saveAs(data, 'aa');
					})
					.catch(function (error) {

					})*/
				PracticeManService.exportPeople(params).success(function(data) {
					that.saveAs(data, '实践学生信息');
				}).catch(function (e) {

				});
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
				this.queryOption.classId = $state.params.id;
				this.getPeopleDetail();
			}
		};
		$scope.practicePeople.init();
	});