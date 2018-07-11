'use strict';

angular.module('dleduWebApp')
    .controller('SubIndexCtrl', function ($scope, $state, $http, $timeout, AuthService, SchoolService, ngDialog) {
        $scope.subIndexFn={
            type: $state.params.type,
            datas: [],
            mapDatas: {},
            imgs: ['https://s1.aizhixin.com/c54e9e93-3ba6-4c33-bc23-6679ebed4c8a.png','https://s1.aizhixin.com/02804385-bc4a-4b9a-bf18-43a83cde8a4d.png'],

            //baseinfo 学校信息管理， organ学校组织机构， attend教务考勤管理，qc教学质量管理， pt实践教学，welcome迎新管理，role权限管理
            dataSource: ['app/layout/navigation/menu-items-baseinfo.json',
                'app/layout/navigation/menu-items-organ.json','app/layout/navigation/menu-items-attend.json',
                'app/layout/navigation/menu-items-qc.json','app/layout/navigation/menu-items-ptcalc.json',
                'app/layout/navigation/menu-items-welcome.json', 'app/layout/navigation/menu-items-role.json'], //菜单数据json
            quickMenu: [],

            swiper: function(){
                $timeout(function () {
                    var swiper = new Swiper('.swiper-container', {
                        autoplay: 2000,
                        autoplayDisableOnInteraction: false,
                        speed: 2000,
                        loop: true,
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

            getMenu: function(type){
                var that = this;
                var jsonData = that.dataSource[type];
                /*if(that.mapDatas['data' + type]){
                    that.datas = mapDatas['data' + type];
                    return;
                }*/
                $http.get(jsonData).then(function(res){
                    //that.mapDatas['data' + type] = res.data.items;
                    that.getMenusByAuth(res.data.items);
                    that.datas = res.data.items;
                })

            },

            //根据权限重新生成新的菜单数据
            getMenusByAuth: function(datas){
                for(var i = 0, len = datas.length; i < len; i++){
                    var tempItems = [], data = datas[i], subItems = data.items;
                    data.button = '管理';
                    for(var j = 0, subLen = subItems.length; j < subLen; j++){
                        if(this.isUseAuthority(subItems[j])){
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
                var that = this;
                var buttonName = this.datas[index].button;
                //点击操作时显示操作图标
                var datas = this.datas[index].items;
                if(buttonName == '管理'){
                    this.datas[index].button = '完成';
                    for(var i = 0, len = datas.length; i < len; i++){
                        datas[i].isShow = true;
                        datas[i].selImg = 'https://s1.aizhixin.com/03f6d93a-5f9f-478f-932c-a90778510d69.png';
                        datas[i].isSel = false;
                    }
                }else{//点击完成时保存选择的菜单
                    var menus = that.handleMenu(angular.copy(datas), that.quickMenu);
                    if(!menus.length){
                        that.datas[index].button = '管理';
                        for(var i = 0, len = datas.length; i < len; i++){
                            datas[i].isShow = false;
                            datas[i].isSel = false;
                        }
                        return;
                    }
                    var params = {menus: JSON.stringify(menus)};
                    SchoolService.saveDefMenu(params).$promise
                        .then(function (data) {
                            if(data.success){
                               that.openDialogNew('添加快捷入口成功！');
                            }else{
                                that.openDialogNew('添加快捷入口失败！');
                            }
                            that.datas[index].button = '管理';
                            for(var i = 0, len = datas.length; i < len; i++){
                                datas[i].isShow = false;
                                datas[i].isSel = false;
                            }
                        })
                        .catch(function (error) {

                        })
                }
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

            //处理选择的菜单和之前已经选择的对比
            handleMenu: function(menus, quickMenus){
                var menusResult = "", selMenus = [];
                //获取所有选择的菜单
                for(var i = 0, len = menus.length; i < len; i++){
                    if(menus[i].isSel){
                        delete menus[i].isSel;
                        delete menus[i].selImg;
                        delete menus[i].isShow;
                        selMenus.push(menus[i]);
                    }
                }
                if(typeof quickMenus.menus == "undefined" || (quickMenus.menus == "''")){//没有快捷入口时，直接保存选中的目录
                    if(selMenus.length){
                        menusResult = selMenus;
                    }
                }else{//循环删除之前已经保存的菜单
                    var menusObj = JSON.parse(quickMenus.menus);
                    for(var j = 0, selLen = selMenus.length; j < selLen; j++){
                        var selMenu = selMenus[j], isHave = false;
                        for(var k = 0, quickLen = menusObj.length; k < quickLen; k++){
                            var quickMenu = menusObj[k];
                            if(selMenu.sref == quickMenu.sref){
                                isHave = true;
                            }
                        }
                        if(!isHave){
                            menusObj.splice(0, 0, selMenu);
                        }
                    }
                    menusResult = menusObj;
                }

                return menusResult;
            },

            //选择功能
            selMenu: function(parent, sub, event){
                var item = this.datas[parent].items[sub];
                if(!item.isSel){
                    item.selImg = 'https://s1.aizhixin.com/1b817db3-fc27-4173-8a6f-2dff73c5c22d.png';
                    item.isSel = true;
                }else{
                    item.isSel = false;
                    item.selImg = 'https://s1.aizhixin.com/03f6d93a-5f9f-478f-932c-a90778510d69.png';
                }

            },

            //获取所有的快捷menu
            getDefMenu: function(){
                var that = this;
                SchoolService.getDefMenu().$promise
                    .then(function (data) {
                        that.quickMenu = data;
                    })
                    .catch(function (error) {

                    })
            },

            init:function () {
                this.swiper();
                this.getMenu(this.type);
                this.getDefMenu();
            }
        },
        $scope.subIndexFn.init();
    });
