/**
 * Created by Administrator on 2017/6/21.
 * 教学督导模板设置
 */
angular.module('dleduWebApp')
	.controller('teachingSuperTemplateCtrl', function ($scope, $state, AuthService, EduManService, RoleAuthService,
	                                                   ngDialog, messageService) {
		$scope.teachingSuperTemplateFn = {
			//保存查询出来的模板对象
			record: null,
			//type 区分跳转过来的链接
			type: -1,

			params: {
				orgId: AuthService.getUser().orgId,
				totalScore: 0, //总分
				quesList: [], //问题
				quesType: '', //题目类型 10打分、20选项、30简答，
				styleQuesList: [], //学风评教列表
				teacherQuesList: [] //教师评价列表
			},

			//初始化数据
			initData: function(){
				if(this.type == 1){//教学督导
					this.params.styleQuesList.push({ //学风
						content: '',//题目
						score: 0,//分数
						subject: '', //针对督导项目字段
						optionList: []//选择题
					});
					this.params.teacherQuesList.push({  //教师评价
						content: '',//题目
						score: 0,//分数
						subject: '', //针对督导项目字段
						optionList: []//选择题
					});
				}else{//学生反馈
					this.params.quesType = '30';
					this.params.quesList.push({
						content: '',//题目
						score: 0,//分数
						subject: '', //针对督导项目字段
						optionList: []//选择题
					});
				}

			},

			// 获取详情
			getTchingSuperTemplateInfo: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					tempType: this.type ? 1 : 0 //区分查询模板类型 1 督导 0学生
				};
				EduManService.getTeachingSupervisorTem(params).$promise
					.then(function (data) {
						that.record = data;
						if(that.type == 1){ //督导
							if(!that.record.teacherQuesList && !that.record.styleQuesList){
								that.initData();
							}
						}else{
							if(!that.record.quesList){
								that.initData();
							}
						}
					})
					.catch(function (error) {

					})
			},

			//点击加号
			addQues: function(type){
				var item;
				if(type == 'classing'){
					item = this.params.styleQuesList;
				}else if(type == 'teaching'){
					item = this.params.teacherQuesList;
				}else {
					item = this.params.quesList;
				}
				item.push({
					content: '',//题目
					score: 0,//分数
					subject: '', //针对督导项目字段
					optionList: []//选择题
				});
			},

			//点击删除
			delQues: function($index, type){
				var item;
				if(type == 'classing'){
					item = this.params.styleQuesList;
				}else if(type == 'teaching'){
					item = this.params.teacherQuesList;
				}else {
					item = this.params.quesList;
				}
				item.splice($index, 1);
			},

			//增加题目选项
			addQuesOption: function($index){
				var parent = this.params.quesList[$index];
				var obj = {content:''};
				parent.optionList.push(obj);
			},

			//删除题目选项
			delQuesOption: function($parentIndex, $childeIndex){
				var parent = this.params.quesList[$parentIndex];
				parent.optionList.splice($childeIndex, 1);
			},

			//保存题目
			saveQues: function(){
				var params = this.params;
				if(this.type == 0){
					if(params.quesList.length == 0){
						messageService.openMsg("请添加题目!");
						return;
					}
				}else{
					if(params.styleQuesList.length == 0 && params.teacherQuesList.length == 0){
						messageService.openMsg("请添加题目!");
						return;
					}
				}

				if(this.type == 0){
					var tips = this.showNoOptionTip(params.quesList);
					if(this.params.quesType == 20){
						if(tips.length > 0){
							messageService.openMsg("请给第" + tips.join(',') + "题目添加选项！");
							return;
						}
					}
				}

				if($state.params.id){
					var cloneParams = angular.copy(params);
					EduManService.updateEvaQues(cloneParams).$promise
						.then(function (data) {
							if(data.trueMSG){
								messageService.openMsg("修改成功!");
								$state.go("teachingsupervisor");
							}else{
								messageService.openMsg(data.message);
							}
						})
						.catch(function (error) {

						})
				}else{
					var cloneParams = angular.copy(params);
					EduManService.addEvaQues(cloneParams).$promise
						.then(function (data) {
							if(data.trueMSG){
								messageService.openMsg("新增成功!");
								$state.go("teachingsupervisor");
							}else{
								messageService.openMsg(data.message);
							}
						})
						.catch(function (error) {

						})
				}
			},

			//保存文件
			submit: function(){
				this.saveQues();
			},

			/**
			 * 提示选项题没有增加选项
			 */
			showNoOptionTip: function(objs){
				var noOptionArr = [];//记录没有选择的选择题号
				for(var i = 0, len = objs.length; i < len; i++){
					var options = objs[i].optionList;
					if(options.length == 0){
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
					if(!isNaN(parseInt(ques.score))){
						total += parseInt(ques.score);
					}

				}
				this.params.totalScore = total;
			},

			/**
			 * 计算选项分数
			 */
			calcOptionScore: function(record, isManyOption){
				var total = 0;
				//计算总分
				for(var i = 0, len = record.optionList.length; i < len; i++){
					var option = record.optionList[i], score = option.score;
					if(!isNaN(parseInt(score))){
						if(isManyOption){//多选时
							total += parseInt(score);
						}else{//单选找出最大分数
							if(parseInt(score) > total){
								total = parseInt(score);
							}
						}
					}
				}
				record.score = total;
				this.calcAllTotal(this.quesList);
			},

			/**
			 * 切换时清空选项的分值
			 */
			emptyDataScore: function(arr){
				for(var i = 0, len = arr.length; i < len; i++){
					var ques = arr[i];
					ques.score = 0;
					for(var j = 0, lenChoice = ques.optionList.length; j < lenChoice; j++){
						var option = ques.optionList[j];
						option.score = 0;
					}
				}
			},

			/**
			 * 监控量化选择选项变化
			 */
			monitorOptionChange: function(){
				this.emptyDataScore(this.params.quesList);//清空选择分数
				this.params.totalScore = 0; //清空总分
			},

			init: function () {
				this.type = $state.params.type;
				this.getTchingSuperTemplateInfo();
			}
		};

		$scope.teachingSuperTemplateFn.init();
	});