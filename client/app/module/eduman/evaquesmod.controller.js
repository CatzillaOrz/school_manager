/**
 * Created by Administrator on 2017/6/23.
 * 评教问卷新增，修改页面
 */
angular.module('dleduWebApp')
	.controller('EvaQuesModCtrl', function ($scope, $state, AuthService, EduManService, messageService, $filter) {
		$scope.evaQuesModFn={
			isEditOrAdd: false, //true是编辑 false是新增
			//问卷信息
			record: null,
			id: $state.params.id,
			params: {
				name: '',
				totalScore: 0,
				endDate: '',
				questions: [], //问题
				quantification: false, //是否量化
				choiceQuestion: false, //选项型
			},

			quesLists: [],//临时保存题目

			// 获取评教问卷信息
			getEvaQuesInfo: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					id: that.id
				};
				EduManService.getEvaQuesInfo(params).$promise
					.then(function (data) {
						that.params = data;
						that.params.endDate = that.params.endDate.substring(0, 10);
						that.quesLists = that.params.questions;
					})
					.catch(function (error) {

					})
			},

			//点击加号
			addQues: function(){
				this.quesLists.push({
					name: '',//题目
					score: 0,//分数
					no: 0,
					radio: false, //是否多选 true多选
					questionChioce: []//选择题
				});
			},

			//点击删除
			delQues: function($index){
				this.quesLists.splice($index, 1);
			},

			//增加题目选项
			addQuesOption: function($index){
				var parent = this.quesLists[$index];
				var obj = {content:'', score:0};
				parent.questionChioce.push(obj);
			},

			//删除题目选项
			delQuesOption: function($parentIndex, $childeIndex){
				var parent = this.quesLists[$parentIndex];
				parent.questionChioce.splice($childeIndex, 1);
			},

			//保存题目
			saveQues: function(){
				var questions = this.quesLists;
				this.params.questions = questions;
				var params = this.params;
				if(this.params.questions.length == 0){
					messageService.openMsg("请添加题目!");
					return;
				}
				var dateTimeStamp = new Date(params.endDate).getTime();
				var currentTime = $filter('date')(new Date().getTime(), 'yyyy-MM-dd')
				if(dateTimeStamp < new Date(currentTime + ' 00:00:00').getTime()){
					messageService.openMsg("截止日期不能小于今天!");
					return;
				}
				var tips = this.showNoOptionTip(questions);
				if(this.params.choiceQuestion){
					if(tips.length > 0){
						messageService.openMsg("请给第" + tips.join(',') + "题目添加选项！");
						return;
					}
				}

				if($state.params.id){
					var cloneParams = angular.copy(params);
					cloneParams.endDate = cloneParams.endDate + ' 23:59:59';
					EduManService.updateEvaQues(cloneParams).$promise
						.then(function (data) {
							if(data.trueMSG){
								messageService.openMsg("修改成功!");
								$state.go("evaquestion");
							}else{
								messageService.openMsg(data.message);
							}
						})
						.catch(function (error) {

						})
				}else{
					var cloneParams = angular.copy(params);
					cloneParams.endDate = cloneParams.endDate + ' 23:59:59';
					EduManService.addEvaQues(cloneParams).$promise
						.then(function (data) {
							if(data.trueMSG){
								messageService.openMsg("新增成功!");
								$state.go("evaquestion");
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
					var options = objs[i].questionChioce;
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
				for(var i = 0, len = record.questionChioce.length; i < len; i++){
					var option = record.questionChioce[i], score = option.score;
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
				this.calcAllTotal(this.quesLists);
			},


			init: function () {
				if($state.params.id){
					this.isEditOrAdd = true;
					this.getEvaQuesInfo($state.params.id);
				}else{
					this.quesLists.push({
						name: '',//题目
						score: 0,//分数
						no: 0,
						radio: false, //是否多选 true多选
						questionChioce: []//选择题
					});
				}
			}
		};
		$scope.evaQuesModFn.init();
	});