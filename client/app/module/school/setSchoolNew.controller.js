'use strict';
/**
*校园动态app设置
*/

angular.module('dleduWebApp')
    .controller('SetSchoolNewCtrl', function ($scope, $rootScope, $state, AuthService, messageService, ImageService, UploadService,
                                              CommonService,SchoolService, ngDialog) {
        $scope.setSchollNews = {
            id: 0,
            myFile1: null,
            myFile2: null,
            myFile3: null,
            dataMobel:{
                title: '',
                content: '',
                organIDs: AuthService.getUser().orgId,
                publishDate: ''
            },

            questionsFn:{
                editor: {},
                currentQuestion: {},
                editorid: 'questionContext',
                analysiseditor: 'analysis',
                subjectiveeditor: 'subjectiveeditor',
                selectedTag: [],
                subjectiveexerciseChoice: "",
                questionType: 10,
                degreeOfDifficulty: 10,
                exerciseAnalyze: "",
                exerciseContent: $rootScope.newsData? $rootScope.newsData.content : '',
                answerCount: 4,
                questionVersion: 1,
                answer: '',
                editorConf: {
                    toolbars: [
                        ['undo', 'redo', '|',
                            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
                            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
                            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
                            'directionalityltr', 'directionalityrtl', 'indent', '|',
                            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
                            'link', 'unlink', 'anchor', '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
                            'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music', 'attachment', 'map', 'gmap', 'insertframe','insertcode', 'webapp', 'pagebreak', 'template', 'background', '|',
                            'horizontal', 'date', 'time', 'spechars', 'snapscreen', 'wordimage', '|',
                            'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', 'splittocells', 'splittorows', 'splittocols', 'charts', '|',
                            'print', 'preview', 'searchreplace', 'help', 'drafts']
                    ],

                    autoHeight: false,
                    autoHeightEnabled: false,
                    autoFloatEnabled: false,
                    initialFrameWidth: '100%',
                    initialFrameHeight: '200'
                },
                selectList: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"],
                exerciseChoice: [],
                setting: {},
                zNodes: [],
                tagList: {},
            },
            selected: function($newFiles,$invalidFiles){
                if($newFiles){
                    var type = $newFiles[0].type.split('/')[0];
                    if (type !== 'image') {
                        messageService.openMsg("请上传图片文件！");
                        return;
                    }else{
                        if($newFiles[0].$error){
                            messageService.openMsg('请上jpg、jpeg、png格式图片文件！');
                            return;
                        }
                    }
                }
                if ($invalidFiles[0]) {
                    messageService.openMsg('图片大小不能超过1MB,请压缩图片后再上传!');
                    return;
                }
            },

            imgChange: function(img){
                img.style.marginTop = (198 - img.offsetHeight)/2 + 'px';
            },

            uploadFile: function(file,id){
                var that = this;
                if (file) {
                    UploadService.fileUploadToQiNiu(file).then(function(res) {
                        if (res.status === 200) {
                            messageService.openMsg('上传成功!');
                            if(id == 1){
                                that.dataMobel.picUrl = res.data.url
                            }else if(id == 2){
                                that.dataMobel.picUr2 = res.data.url
                            }else{
                                that.dataMobel.picUr3 = res.data.url;
                            }
                        } else {
                            messageService.openMsg('上传失败!');
                        }
                    })
                }
            },

            addNews: function(){
                var that = this;
                var params = this.dataMobel;
                params.content = that.questionsFn.exerciseContent ? that.questionsFn.exerciseContent: that.dataMobel.content
                SchoolService.addNews(params).$promise
                    .then(function (data) {
                        messageService.openMsg("新增成功！");
                        $state.go('schoolnewlist');
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"新增失败！"));
                    })
            },

            updateNews: function(){
				var that = this;
                var params = this.dataMobel;
                SchoolService.updateNews(params).$promise
                    .then(function (data) {
                        messageService.openMsg("编辑成功！");
                        $state.go('schoolnewlist');
                    })
                    .catch(function (error) {
                        messageService.openMsg(CommonService.exceptionPrompt(error,"编辑失败！"));
                    })
            },

            submit: function(id){
                if(_.isEmpty(this.questionsFn.exerciseContent)&&_.isEmpty(this.dataMobel.content)){
                    messageService.openMsg('请输入内容！');
                    return ;
                }
                if(id == 1){
                    this.previewArticle();
                }else{
                    if(this.id){
                        this.updateNews();
                    }else{
                        this.addNews();
                    }
                }
            },

            /**
             * 预览
             */
            previewArticle: function($index){
                this.setFontSize();
                var that = this;
                var newsPreviewData = {
                    "content": that.questionsFn.exerciseContent ? that.questionsFn.exerciseContent: that.dataMobel.content,
                    "organIDs": that.dataMobel.organIDs,
                    "picUr2": that.dataMobel.picUr2,
                    "picUr3": that.dataMobel.picUr3,
                    "picUrl": that.dataMobel.picUrl,
                    "publishDate": that.dataMobel.publishDate,
                    "title": that.dataMobel.title
                }
                this.newsPreviewData = newsPreviewData;
                ngDialog.open({
                    template: 'prewNews',
                    width: 700,
                    scope: $scope
                })
            },

            returnArticleMag: function(){
                $state.go('schoolnewlist');
            },

            setFontSize: function(){
                var html = document.getElementById('html');
                if (html.clientWidth < 540) {
                    html.style.fontSize = (html.clientWidth / 10) + 'px'
                } else {
                    html.style.fontSize = 54 + 'px'
                }
            },

            getDetail: function(){
                var that = this;
                var params = {articleId: that.id};
                SchoolService.getDetailById(params).$promise
                    .then(function (data) {
                        that.revertData(data.news)
                    })
                    .catch(function (error) {

                    })
            },

            revertData: function(news){
                var that = this;
                var result = angular.copy(news);
                that.dataMobel = result;
                that.dataMobel.organIDs = AuthService.getUser().orgId;
                that.dataMobel.publishDate = result.createdDate;
                that.questionsFn.exerciseContent = result.content;
                if(result.picUrl1){
                    that.dataMobel.picUrl = result.picUrl1;
                }
                if(result.picUrl2){
                    that.dataMobel.picUr2 = result.picUrl2;
                }
                if(result.picUrl3){
                    that.dataMobel.picUr3 = result.picUrl3;
                }
            },

            init: function(){
                this.id = $state.params.id
                if(this.id){
                    this.getDetail();
                }
            }
        };

        $scope.setSchollNews.init();
    });