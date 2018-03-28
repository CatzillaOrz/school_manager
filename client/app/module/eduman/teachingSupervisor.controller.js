/**
 * Created by Administrator on 2017/6/21.
 * 教学督导
 */
angular.module('dleduWebApp')
	.controller('teachingSupervisorCtrl', function ($scope, $timeout, $state, AuthService, EduManService, RoleAuthService, ngDialog) {
		var TabBlock = {
			s: {
				animLen: 200
			},

			init: function () {
				TabBlock.bindUIActions();
				TabBlock.hideInactive();
			},

			bindUIActions: function () {
				$('.tabBlock-tabs').on('click', '.tabBlock-tab', function () {
					TabBlock.switchTowTab($(this));
				});
			},

			hideInactive: function () {
				var $tabBlocks = $('.tabBlock');

				$tabBlocks.each(function (i) {
					var
						$tabBlock = $($tabBlocks[i]),
						$panes = $tabBlock.find('.tab-pane'),
						$activeTab = $tabBlock.find('.tabBlock-tab.active');

					$panes.hide();
					$($panes[$activeTab.index()]).show();
				});
			},

			switchTowTab: function ($tab) {
				var $context = $tab.closest('.tabBlock');

				if (!$tab.hasClass('active')) {
					$tab.siblings().removeClass('active');
					$tab.addClass('active');

					TabBlock.showPane($tab.index(), $context);
				}
			},

			showPane: function (i, $context) {
				var $panes = $context.find('.tab-pane');

				// Normally I'd frown at using jQuery over CSS animations, but we can't transition between unspecified variable heights, right? If you know a better way, I'd love a read it in the comments or on Twitter @johndjameson
				$panes.slideUp(TabBlock.s.animLen);
				$($panes[i]).slideDown(TabBlock.s.animLen);
			}
		};

		$scope.teachingSuperFn={
			//信息员反馈列表
			records: [],
			record: null,
			tab: 'info', // info 信息员反馈  superInfo督导反馈 template模板
			//当前操作的class
			currentRecord: {},
			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			params: {
				teacherName: '',
				stuName: '',
				courseName: '',
				supName: '', //督导姓名
			},

			//控制按钮权限
			isUseAuth: function(type){
				return RoleAuthService.isUseAuthority(type);
			},

			/**
			 * 切换tab
			 */
			switchTab: function(type){
				this.tab = type;
				if(type == 'template'){
					return;
				}
				this.query();
			},

			// 获取反馈信息列表
			getFeedbackList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize,
					teacherName: that.params.teacherName,
					courseName: that.params.courseName,
					supName: that.params.supName,
					stuName: that.params.stuName,
					type: this.tab
				};
				EduManService.getTeachingSupervisorList(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},
			//根据名称查询
			query: function () {
				this.page.pageNumber = 1;
				this.getFeedbackList();
			},

			//导出
			exportData: function(){
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: 1,
					pageSize: 900000,
					teacherName: that.params.pageSize,
					feedbackName: that.params.feedbackName,
					courseName: that.params.courseName,
				};
				EduManService.exportFeedInfo(params).success(function(data) {
					that.saveAs(data, '反馈列表');
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
				this.getFeedbackList();
				var type = $state.params.tab;
				if(type){
					this.tab = type;
				}
				$timeout(function(){
					TabBlock.init();
				});

			}
		};
		$scope.teachingSuperFn.init();

	});