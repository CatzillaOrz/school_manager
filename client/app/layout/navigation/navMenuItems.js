(function(){
    "use strict";

    angular.module('dleduWebApp').directive('smartMenuItems', function ($http, $rootScope, $compile, AuthService) {
    return {
        restrict: 'A',
        compile: function (element, attrs) {


            function createItem(item, parent, level){
                var li = $('<li />' ,{'data-menu-active': item.active || ''});
                var a = $('<a />');
                var i = $('<i />');

                li.append(a);
                if(item.sref)
                    a.attr('ui-sref', item.sref);
                if(item.target){
                    a.attr('target', item.target);
                }
                if(item.href)
                    a.attr('href', item.href);
                if(item.icon){
                    i.attr('class', 'fa fa-lg fa-fw fa-'+item.icon);
                    a.append(i);
                }
                if(item.title){
                    a.attr('title', item.title);
                    if(level == 1){
                        a.append(' <span class="menu-item-parent">' + item.title + '</span>');
                    } else {
                        a.append(' ' + item.title);

                    }
                }

                if(item.items){
                    var ul = $('<ul />');
                    li.append(ul);
                    li.attr('data-menu-collapse', '');
                    _.forEach(item.items, function(child) {
                        if(isUseAuthority(child)){
                            createItem(child, ul, level+1);
                        }
                    })
                }

                parent.append(li);
            }


            $http.get(attrs.smartMenuItems).then(function(res){
                var ul = $('<ul />', {
                    'smart-menu': ''
                });
                _.forEach(res.data.items, function(item) {
                    if(isUseAuthority(item)){
                        createItem(item, ul, 1);
                    }
                });

                var $scope = $rootScope.$new();
                var html = $('<div>').append(ul).html();
                var linkingFunction = $compile(html);

                var _element = linkingFunction($scope);

                element.replaceWith(_element);
            })

            //判断角色是否应当授予权限
            function isUseAuthority(auth){
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
            }
        }
    }
});
})();