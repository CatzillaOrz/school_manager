"use strict";

(function ($) {

    $.fn.smartCollapseToggle = function () {

        return this.each(function () {
            var appConfig = {
                menu_speed :200
            };
            var $body = $('body');
            var $this = $(this);

            // only if not  'menu-on-top'
            if ($body.hasClass('menu-on-top')) {


            } else {

                $body.hasClass('mobile-view-activated');

                // toggle open
                $this.toggleClass('open');


                // for minified menu collapse only second level
                if ($body.hasClass('minified')) {
                    if ($this.closest('nav ul ul').length) {
                        $this.find('>a .collapse-sign .fa').toggleClass('fa-plus-square-o fa-minus-square-o');
                        $this.find('ul:first').slideToggle(appConfig.menu_speed || 200);
                    }
                } else {
                    // toggle expand item
                    $this.find('>a .collapse-sign .fa').toggleClass('fa-plus-square-o fa-minus-square-o');
                    $this.find('ul:first').slideToggle(appConfig.menu_speed || 200);
                }
            }
        });
    };
})(jQuery);

angular.module('dleduWebApp').directive('smartMenu', function ($state, $rootScope) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var $body = $('body');

            var $collapsible = element.find('li[data-menu-collapse]');
            var bindEvents = function(){
                var collapLen = $collapsible.length;
                $collapsible.each(function (idx, li) {
                    var $li = $(li);
                    $li
                        .on('click', '>a', function (e) {

                            // collapse all open siblings
                            $li.siblings('.open').smartCollapseToggle();

                            // toggle element
                            $li.smartCollapseToggle();

                            // add active marker to collapsed element if it has active childs
                            /*if (!$li.hasClass('open') && $li.find('li.active').length > 0) {
                                $li.addClass('active');
                            }*/

                            e.preventDefault();
                        })
                        .find('>a').append('<b class="collapse-sign"><em class="fa fa-plus-square-o"></em></b>');
                        $li.siblings('.open').smartCollapseToggle();
                        if(collapLen != idx + 1){
                            $li.smartCollapseToggle();
                        }else{
                            $li.smartCollapseToggle();
                            $li.smartCollapseToggle();
                        }
                    // initialization toggle
                    if ($li.find('li.active').length) {
                        $li.smartCollapseToggle();
                        // $li.find('li.active').parents('li').addClass('active');
                    }
                });
            };
            var activeMenu = function(tostate){
                tostate = tostate || $state.current;
                var onstate = '';
                if(tostate.parent != 'base'){
                    // onstate = onstate;
                    onstate = tostate.parent;
                }else{
                    onstate = tostate.name;
                }
                var active = element.find('li[data-menu-active]');
                angular.forEach(active,function(li){
                    var state = li.getAttribute("data-menu-active");
                    if(state == onstate){
                        $(li).addClass('active');
                    }else{
                        $(li).removeClass('active');
                    }
                });
            };
            bindEvents();
            activeMenu();
            $rootScope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
                // console.log(toState);
                activeMenu(toState);
                scope.url = toState.ncyBreadcrumbStateRef;
                console.log(toState.ncyBreadcrumbStateRef);
            });

            // click on route link
            element.on('click', 'a[data-ui-sref]', function (e) {
                // collapse all siblings to element parents and remove active markers
                $(this)
                    .parents('li').addClass('active')
                    .each(function () {
                        $(this).siblings('li.open').smartCollapseToggle();
                        $(this).siblings('li').removeClass('active')
                    });

                if ($body.hasClass('mobile-view-activated')) {
                    $rootScope.$broadcast('requestToggleMenu');
                }
            });


            scope.$on('$smartLayoutMenuOnTop', function (event, menuOnTop) {
                if (menuOnTop) {
                    $collapsible.filter('.open').smartCollapseToggle();
                }
            });
        }
    }
});