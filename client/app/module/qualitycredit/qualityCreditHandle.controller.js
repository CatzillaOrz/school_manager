/**
 * Created by Administrator on 2017/6/21.
 * 模板编辑
 */
angular.module('dleduWebApp')
	.controller('qualityCreditHandleCtrl', function ($scope, $state, AuthService, EduManService, RoleAuthService,
	                                                   ngDialog, messageService, QualityCreditService) {
		$scope.qualityCreditHandle={
			isEditOrAdd: false, //true是编辑 false是新增
			//问卷信息
			record: null,

			page: {
				totalElements: 0,
				totalPages: 0,
				pageNumber: 1,
				pageSize: 10
			},

			id: $state.params.id,
			params: {
				id: 0,
				name: '',
				totalScore: 0,
				orgId: AuthService.getUser().orgId,
				quesList: [], //问题
			},

			quesLists: [],//临时保存题目

			// 根据id查询
			getTemplateById: function (id) {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					templetId: id
				};
				QualityCreditService.getTemplateById(params).$promise
					.then(function (data) {
						that.params = data;
						that.quesLists = that.params.quesList;
					})
					.catch(function (error) {

					})
			},

			//点击加号
			addQues: function(){
				this.quesLists.push({
					content: '',//题目
					id: 0,
					minScore: 0, //是否多选 true单选
					maxScore: 0//选择题
				});
			},

			//点击删除
			delQues: function($index){
				this.quesLists.splice($index, 1);
				var temp = angular.copy(this.quesLists);
				this.quesLists = [];
				this.quesLists = temp;
				this.calcAllTotal(this.quesLists);
			},

			//保存题目
			saveQues: function(){
				var questions = this.quesLists;
				this.params.quesList = questions;
				var params = this.params;
				if(this.params.quesList.length == 0){
					messageService.openMsg("请添加题目!");
					return;
				}
				var tips = this.showScoreTip(questions);
				if(tips.length > 0){
					messageService.openMsg("第" + tips.join(',') + "题最小分值不能大于最大分值！");
					return;
				}

				var cloneParams = angular.copy(params);
				QualityCreditService.addTemplate(cloneParams).$promise
					.then(function (data) {
						if(data.success){
							messageService.openMsg("修改成功!");
							$state.go("qualitycreditlist",{type:'template'});
						}else{
							messageService.openMsg(data.message);
						}
					})
					.catch(function (error) {

					})
			},


			//保存文件
			submit: function(){
				this.saveQues();
			},

			/**
			 * 提示选项分值最小值不能超过最大值
			 */
			showScoreTip: function(objs){
				var noOptionArr = [];//记录没有选择的选择题号
				for(var i = 0, len = objs.length; i < len; i++){
					var maxScore = objs[i].maxScore, minScore = objs[i].minScore;
					if(parseFloat(maxScore) < parseFloat(minScore)){
						noOptionArr.push(i + 1);
					}
				}
				return noOptionArr;
			},

			/**
			 * 将数字转换成对象字母
			 * @param num
			 * @returns {string}
			 */
			convertToLetter: function(num){
				return num <= 26 ?
					String.fromCharCode(num + 64) : convert(~~((num - 1) / 26)) + convert(num % 26 || 26);
			},

			/**
			 * 计算总分
			 */
			calcAllTotal: function(arr){
				var total = 0;
				//计算总分
				for(var i = 0, len = arr.length; i < len; i++){
					var ques = arr[i];
					if(!isNaN(parseFloat(ques.maxScore))){
						total += parseFloat(ques.maxScore);
					}

				}
				this.params.totalScore = total;
			},


			init: function () {
				if($state.params.id){
					this.isEditOrAdd = true;
					this.getTemplateById($state.params.id);
				}else{
					this.quesLists.push({
						content: '',//题目
						id: 0,
						minScore: 0, //是否多选 true单选
						maxScore: 0//选择题
					});
				}
			}
		};
		$scope.qualityCreditHandle.init();
	});