'use strict';

angular.module('dleduWebApp')
    .controller('templet1Ctrl', function ($scope, $rootScope, AuthService, CollegeService, $state, messageService, $timeout, SchoolService, CommonService, $location) {
        $timeout(function () {
            $("#logo").attr('src', "http://oli56k5b0.bkt.clouddn.com/school/templet1-logo1.png");
        });
        var lFollowX = 0;
        var lFollowY = 0;
        var x = 0;
        var y = 0;
        var friction = 1 / 10;
        var delay = '0.5s';
        var traX = 0;
        var traY = 0;

        function moveBackground() {
            x += (lFollowX - x) * friction;
            y += (lFollowY - y) * friction;
            traX = x == 0 ? -x : (-x + 10);
            traY = y == 0 ? -y : (-y + 10);
            var translate1 = 'translate(' + x + 'px, ' + y + 'px)';
            var translate2 = 'translate(' + traX + 'px, ' + traY + 'px)';
            $('.solid-conatier1').css({
                '-webit-transform': translate1,
                '-moz-transform': translate1,
                'transform': translate1
            });
            $('.solid-conatier2').css({
                '-webit-transform': translate2,
                '-moz-transform': translate2,
                'transform': translate2,
                'animation-duration': delay
            });


            window.requestAnimationFrame(moveBackground);
        }

        $(window).on('mousemove click', function (e) {
            var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
            var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
            lFollowX = (10 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
            lFollowY = (10 * lMouseY) / 100;
        });
        moveBackground()
        $scope.template1Fn={
            product:CommonService.product
        }
    });