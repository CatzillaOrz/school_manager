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
			exportTea: function(type){
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					teacherName: that.params.teacherName,
					courseName: that.params.courseName,
					supName: that.params.supName,
				};
				params.pageNumber = type == 'part' ? that.page.pageNumber : 1;
				params.pageSize = type == 'part' ? that.page.pageSize : 999999999;

				EduManService.exportTea(params).success(function(data) {
					if(data.success){
						window.location.href = data.message+'?attname=督导反馈.xlsx';
					}else{
						messageService.openMsg("导出失败！");
					}
				}).catch(function (e) {
					messageService.openMsg(CommonService.exceptionPrompt(error, "导出失败！"));
				});
			},

			//导出
			exportStu: function(type){
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					teacherName: that.params.teacherName,
					courseName: that.params.courseName,
					stuName: that.params.stuName,
				};
				params.pageNumber = type == 'part' ? that.page.pageNumber : 1;
				params.pageSize = type == 'part' ? that.page.pageSize : 999999999;

				EduManService.exportStu(params).success(function(data) {
					if(data.success){
						window.location.href = data.message+'?attname=信息员反馈.xlsx';
					}else{
						messageService.openMsg("导出失败！");
					}
				}).catch(function (e) {
					messageService.openMsg(CommonService.exceptionPrompt(error, "导出失败！"));
				});
			},



			init: function () {
				var type = $state.params.tab;
				if(type){
					this.tab = type;
				}
				if($state.current.name == "teachingSupervisortj"){
					$scope.isReport = true;//是否是统计报表
				}
				this.getFeedbackList();
				$timeout(function(){
					TabBlock.init();
				});

			}
		};
		$scope.teachingSuperFn.init();

	});