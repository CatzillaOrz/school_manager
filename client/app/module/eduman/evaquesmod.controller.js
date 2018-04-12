/**
 * Created by Administrator on 2017/6/23.
 * 评教问卷新增，修改页面
 */
angular.module('dleduWebApp')
	.controller('EvaQuesModCtrl', function ($scope, $state, $timeout, AuthService, EduManService, messageService,
	                                        $filter, ngDialog) {
		$scope.evaQuesModFn={
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
				name: '',
				totalScore: 0,
				endDate: '',
				questions: [], //问题
				quantification: false, //是否量化
				choiceQuestion: false, //选项型
				choiceType: 'score', //选择类型用来和之前题目类型转换 score 打分题，choice选择题
				qcomment: false, //是否评论
			},

			quesLists: [],//临时保存题目

			// 获取评教问卷信息
			getEvaQuesInfo: function (id, type) {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					id: id
				};
				EduManService.getEvaQuesInfo(params).$promise
					.then(function (data) {
						if(!that.isEditOrAdd){ //新增
							that.record = data;
							that.record.name = '';
							that.record.endDate = '';
						}else{
							that.params = data;
							that.params.endDate = that.params.endDate.substring(0, 10);
							that.convertRadio(that.params);
							that.quesLists = that.params.questions;
						}

						if(type){
							that.params = that.record;
							that.convertRadio(that.params);
							that.quesLists = that.params.questions;
						}
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
				var temp = angular.copy(this.quesLists);
				this.quesLists = [];
				this.quesLists = temp;
				this.calcAllTotal(this.quesLists);
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
				var temp = angular.copy(parent.questionChioce);
				parent.questionChioce = [];
				parent.questionChioce = temp;
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
					this.convertRadio(cloneParams);
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
					this.convertRadio(cloneParams);
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

			/**
			 * 置换里面的是否多选值
			 */
			convertRadio: function(params){
				//转换题目类型
				if(params.quantification == true){
					this.params.choiceType = 'score';
				}else if(params.choiceQuestion == true){
					this.params.choiceType = 'choice'
				}
				var questions = params.questions;
				if(!this.isEditOrAdd){
					delete params.id;
					delete params.createDate;
					delete params.status;
					delete params.isEnd;
					delete params.teachingNum;
				}
				for(var i = 0, len = questions.length; i < len; i++){
					var temp = questions[i];
					if(temp.radio){
						temp.radio = false;
					}else{
						temp.radio = true;
					}
					//清空选项id值
					if(!this.isEditOrAdd){
						temp.id = 0;
						var choice = temp.questionChioce;
						for(var j = 0, choiceLen = choice.length; j < choiceLen; j++){
							choice[j].id = 0;
							delete  choice[j].questionId;
						}
					}
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

			/**
			 * 切换时清空选项的分值
			 */
			emptyDataScore: function(arr){
				for(var i = 0, len = arr.length; i < len; i++){
					var ques = arr[i];
					ques.score = 0;
					for(var j = 0, lenChoice = ques.questionChioce.length; j < lenChoice; j++){
						var option = ques.questionChioce[j];
						option.score = 0;
					}
				}
			},

			/**
			 * 监控量化选择选项变化
			 */
			monitorOptionChange: function(){
				//转换题目类型保持和之前类型一致
				if(this.params.choiceType == 'score'){
					this.params.quantification = true;
					this.params.choiceQuestion = false;
				}else if(this.params.choiceType == 'choice'){
					this.params.choiceQuestion = true;
					this.params.quantification = false;
				}
				this.emptyDataScore(this.quesLists);//清空选择分数
				this.params.totalScore = 0; //清空总分
			},

			// 获取评教问卷列表
			getEvaQuesList: function () {
				var that = this;
				var params = {
					orgId: AuthService.getUser().orgId,
					pageNumber: that.page.pageNumber,
					pageSize: that.page.pageSize
				};
				EduManService.getEvaQuesList(params).$promise
					.then(function (data) {
						that.records = data.data;
						that.page = data.page;
					})
					.catch(function (error) {

					})
			},


			//导入问卷内容
			importTemplate: function(){
				this.page.pageNumber = 1;
				if(!this.records){
					this.getEvaQuesList();
				}
				ngDialog.open({
					template: 'quelistDialog',
					width: 700,
					scope: $scope
				})
			},

			/**
			 * 预览问卷
			 */
			preViewQue: function($index){
				var id = this.records[$index].id;
				this.getEvaQuesInfo(id);
				ngDialog.open({
					template: 'queInfoDialog',
					width: 700,
					scope: $scope
				})
			},

			//点击导入数据
			impData: function($index){
				var id = this.records[$index].id;
				this.getEvaQuesInfo(id, 'imp');
			},

			init: function () {
				if($state.params.id){
					this.isEditOrAdd = true;
					this.getEvaQuesInfo($state.params.id);
				}else{
					if(this.params.choiceType == 'score'){
						this.params.quantification = true;
						this.params.choiceQuestion = false;
					}else if(this.params.choiceType == 'choice'){
						this.params.choiceQuestion = true;
						this.params.quantification = false;
					}
					this.quesLists.push({
						name: '',//题目
						score: 0,//分数
						no: 0,
						radio: false, //是否多选 true单选
						questionChioce: []//选择题
					});
				}
			}
		};
		$scope.evaQuesModFn.init();
	});