'use strict';

angular.module('dleduWebApp')

    .controller('IndexCtrl', function ($scope, $http, CommonService,$sce,AuthService) {

        if(CommonService.browser.versions.trident){
            $scope.slides = [
                {
                    "background": "http://oli56k5b0.bkt.clouddn.com/images/index/banner_bg.jpg",
                    "image": "http://oli56k5b0.bkt.clouddn.com/images/index/banner_inner.png",
                    "url": null,
                    "id": 0
                },
                {
                    "background": "http://oli56k5b0.bkt.clouddn.com/images/index/banner02_bg.jpg",
                    "image": "http://oli56k5b0.bkt.clouddn.com/images/index/banner02_inner.png",
                    "url": "http://pt.aizhixin.com/race",
                    "id": 1
                }
            ];
        }else{
            $http({
                method:  'GET' ,
                url:  'http://oli56k5b0.bkt.clouddn.com/api/azx.json'
            }).success(function (res) {
                $scope.slides = res;
            });
        }
        /*$http({
            method: 'GET',
            url: 'http://oli56k5b0.bkt.clouddn.com/api/azx.json',
            dataType:"jsonp",
            headers: { 'Content-Type' :  'application/x-www-form-urlencoded; charset=UTF-8' },
            success:function(){
                console.log('------------------');
                console.log(res);
                $scope.slides = res.data;
            }
        });*/
        /*$scope.slides = [
            {
                "background": "http://oli56k5b0.bkt.clouddn.com/images/index/banner_bg.jpg",
                "image": "http://oli56k5b0.bkt.clouddn.com/images/index/banner_inner.png",
                "url": null,
                "id": 0
            },
            {
                "background": "http://oli56k5b0.bkt.clouddn.com/images/index/banner02_bg.jpg",
                "image": "http://oli56k5b0.bkt.clouddn.com/images/index/banner02_inner.png",
                "url": "http://pt.aizhixin.com/race",
                "id": 1
            }
        ];*/
        /*$http.get('http://oli56k5b0.bkt.clouddn.com/api/azx.json?' + new Date().getTime()).then(function (res) {
            $scope.slides = res.data;
        });*/
        $scope.indexFn = {
            subnav:CommonService.subnav,
            product:CommonService.product,
            edulogos:[
                {
                    name: '四川长江职业学院',
                    logo: '../assets/images/index/logo_01.png'
                },
                {
                    name: '湖北师范大学',
                    logo: '../assets/images/index/logo_02.png'
                },
                {
                    name: '吉林工程职业学校',
                    logo: '../assets/images/index/logo_03.png'
                },
                {
                    name: '西南石油大学',
                    logo: '../assets/images/index/logo_04.png'
                },
                {
                    name: '陕西职业技术学院',
                    logo: '../assets/images/index/logo_05.png'
                },
                {
                    name: '四川科技职业学院',
                    logo: '../assets/images/index/logo_06.png'
                },
                {
                    name: '吉林农业科技学院',
                    logo: '../assets/images/index/logo_07.png'
                },
                {
                    name: '东北师范大学人文学院',
                    logo: '../assets/images/index/logo_08.png'
                },
                {
                    name: '山东服装职业学院',
                    logo: '../assets/images/index/logo_09.png'
                },
                {
                    name: '山东凯文科技职业学院',
                    logo: '../assets/images/index/logo_10.png'
                }
            ],
            getUrl:function(host,path){
                AuthService.navigation(host,path)
            },
            mouseenter: 'mouseenter',
            qrWeixin: $sce.trustAsHtml('<div class="barcode"><img src="http://oli56k5b0.bkt.clouddn.com/QRcode_weixin.jpg"/></div>'),
            qrQQ: $sce.trustAsHtml('<div class="barcode"><img src="http://oli56k5b0.bkt.clouddn.com/QRcode_qq.png"/></div>'),
        };
    });
