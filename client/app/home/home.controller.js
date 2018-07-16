'use strict';

angular.module('dleduWebApp')
    .controller('HomeCtrl', function ($scope, $state, $http, $timeout, AuthService, SchoolService, ngDialog) {
        $scope.homeFn={
            year:"",
            month:"",
            day:"",
            week:"",
            imgs: ['https://s1.aizhixin.com/977b5de4-fec1-4762-8bcd-ce78fab31e47.jpg','https://s1.aizhixin.com/c54e9e93-3ba6-4c33-bc23-6679ebed4c8a.png',
                'https://s1.aizhixin.com/02804385-bc4a-4b9a-bf18-43a83cde8a4d.png'],
            swiper: function(){
                $timeout(function () {
                    var swiper = new Swiper('.swiper-container', {
                        autoplay: 2000,
                        autoplayDisableOnInteraction: false,
                        speed: 1000,
                        loop: true,
                        //direction: 'vertical',
                        // 如果需要分页器
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        //监听，自动更新
                        observer: true,
                        observeParents: true,
                        // 如果需要前进后退按钮
                        nextButton: '.swiper-home-button-prv',
                        prevButton: '.swiper-home-button-next'
                    },100);
                })
            },
            bg: ['background:linear-gradient(-135deg,rgba(84,186,119,1),rgba(104,203,137,1))',
                'background:linear-gradient(133.7deg,rgba(233,159,132,1),rgba(232,136,101,1))',
                'background:linear-gradient(133.7deg,rgba(127,185,234,1),rgba(96,166,224,1))',
                'background:linear-gradient(133.7deg,rgba(129,142,230,1),rgba(110,123,210,1))',
                'background:linear-gradient(133.7deg,rgba(245,210,112,1),rgba(246,193,87,1))'],

            //对于没有背景颜色的随机添加背景颜色
            getBgColor: function(bg){
                if(!bg){
                    return this.bg[Math.floor(Math.random()*5)];
                }
               return bg;
            },

            //根据权限重新生成新的菜单数据
            getMenusByAuth: function(datas){
                for(var i = 0, len = datas.length; i < len; i++){
                    var tempItems = [], data = datas[i], subItems = data.items;
                    data.button = '管理';
                    for(var j = 0, subLen = subItems.length; j < subLen; j++){
                        if(this.isUseAuthority(subItems[j])){
                            /*if(!subItems[j].bg){
                                subItems[j].bg = this.bg[Math.floor(Math.random()*5)];
                            }*/
                            tempItems.push(subItems[j]);
                        }
                    }
                    data.items = tempItems;
                }
            },

            //判断角色是否应当授予权限
            isUseAuthority: function(auth){
                if(typeof auth.role == 'undefined'){
                    return true;
                }
                var user = AuthService.getUser();
                var roleNames = user.roleNames;
                for(var i = 0, length = roleNames.length; i < length; i++){
                    var roleName = roleNames[i];
                    if(roleName && roleName != '' && auth.role.indexOf(roleName) != -1){
                        return true;
                        break;
                    }
                }
                return false;
            },

            //操作功能菜单 index 操作菜单类型
            operatMenu: function(index){
                var buttonName = this.datas[index].button;
                //点击操作时显示操作图标
                var datas = this.datas[index].items;
                if(buttonName == '管理'){
                    this.datas[index].button = '取消';
                    for(var i = 0, len = datas.length; i < len; i++){
                        datas[i].isShow = true;
                        datas[i].selImg = 'https://s1.aizhixin.com/34aaa08d-010c-4943-af66-6b5b76bb02f3.png';
                        datas[i].isSel = true;
                    }
                }else{
                    this.datas[index].button = '管理';
                    for(var i = 0, len = datas.length; i < len; i++){
                        datas[i].isShow = false;
                        datas[i].isSel = false;
                    }
                }
            },

            //删除功能选择功能
            delMenu: function(parent, sub){
                var that = this, datas = angular.copy(this.datas);
                datas[parent].items.splice(sub, 1);
                var items = datas[parent].items;
                for(var i = 0, len = items.length; i < len; i++){
                    delete items[i].isShow;
                    delete items[i].selImg;
                    delete items[i].isSel;
                }
                var params = {menus: JSON.stringify(datas[parent].items)};
                SchoolService.saveDefMenu(params).$promise
                    .then(function (data) {
                        if(data.success){
                            that.openDialogNew('移除快捷入口成功！');
                        }else{
                            that.openDialogNew('移除快捷入口失败！');
                        }
                        that.getQuickMenu();
                    })
                    .catch(function (error) {

                    })
            },

            openDialogNew: function(msg,timer){
                var template = '<div class="new-dialog">'+
                    '<img src="https://s1.aizhixin.com/aac16d20-7db2-47fd-a398-b213f571b93b.png" class="img-success"/>' +
                    '<div class="tip">' + msg + '</div>' +
                    '</div>';
                ngDialog.open({
                    template: template,
                    plain: true,
                    width: 400
                });
                if(timer =="" || timer ==undefined || timer == null){
                    timer = 2000;
                }
                setTimeout(function () {
                    ngDialog.closeAll();
                }, timer);
            },


            //获取快捷菜单
            getQuickMenu: function(){
                var that = this;
                SchoolService.getDefMenu().$promise
                    .then(function (data) {
                        if(!data.menus){
                            that.datas = [{items: []}];
                        }else{
                            that.datas = [{items:JSON.parse(data.menus)}];
                            that.getMenusByAuth(that.datas);
                        }
                    })
                    .catch(function (error) {

                    })
            },

            init:function () {
                this.swiper();
                this.getQuickMenu();
            },

        },
        $scope.homeFn.init();
    });
