'use strict';

angular.module('dleduWebApp')
    .controller('templet1Ctrl', function ($scope, $rootScope, AuthService, CollegeService, $state, messageService, $timeout, SchoolService, CommonService, $location) {
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
            traX =  -x + 10;
            traY = -y + 10;
            var translate1 = 'translate(' + x + 'px, ' + y + 'px)';
            var translate2 = 'translate(' + traX + 'px, ' + traY + 'px)';
            // $(".solid-conatier1").animate({"webkitAnimationDuration":"5s","-webkit-animation-duration":"5s"});
            // $(".solid-conatier2").animate({"webkitAnimationDuration":"10s","-webkit-animation-duration":"10s"});
            $('.solid-conatier1').css({
                '-webit-transform': translate1,
                '-moz-transform': translate1,
                'transform': translate1
            });
            $('.solid-conatier2').css({
                '-webit-transform': translate2,
                '-moz-transform': translate2,
                'transform': translate2,
                '-webkit-animation': delay
            });

            window.requestAnimationFrame(moveBackground);
        }
        $(window).on('mouseover', function (e) {
            var lMouseX = $(window).width() / 2 - e.clientX;
            var lMouseY = $(window).height() / 2 - e.clientY;
            lFollowX = (10 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
            lFollowY = (10 * lMouseY) / 100;
        });
        moveBackground()
        $scope.template1Fn={
            product:CommonService.product,
            //logo
            schoolInfo:{},
            params:{orgId:215},
            badgeWhiteLogo:null,
            badgeAndFontWhiteLogo:null,
            getLogoList:function () {
                var _this=this;
                var params={
                    orgId:_this.params.orgId
                };
                SchoolService.getLogoList(params).$promise
                    .then(function (data) {
                        console.log(data);
                        angular.forEach(data.data,function (temp) {
                            if(temp.logoSort==3){
                                _this.badgeWhiteLogo=temp;
                            }
                            if(temp.logoSort==4){
                                _this.badgeAndFontWhiteLogo=temp;
                            }
                        })
                        $("#logo").attr('src', _this.badgeAndFontWhiteLogo.logoUrl);
                        $("#badge").attr('src', _this.badgeWhiteLogo.logoUrl);
                        $(".logo").css("display","inline-block")
                        $("#badge").css("display","inline-block")
                    })
                    .catch(function (error) {

                    })
            },
            getSchoolInfo:function () {
                var _this=this;
                var domain = $location.host();
                var code = domain.split('.')[0];
                var params = {
                    domainname: code
                };
                if(AuthService.getUser()){
                    params.domainname=AuthService.getUser().orgDomainName;
                }
                SchoolService.getSchoolByDomain(params).$promise
                    .then(function (data) {
                        _this.schoolInfo=data;
                        _this.params.orgId=data.id;
                        _this.getLogoList();
                    })
                    .catch(function (error) {

                    })
            },
            init:function () {
                var _this=this;
                _this.schoolInfo=  CommonService.getSchool();
                console.log(_this.schoolInfo);
                if(_this.schoolInfo){
                    _this.params.orgId=_this.schoolInfo.id;
                    _this.getLogoList();
                }else {
                    _this.getSchoolInfo();
                }
            }
        }
        $scope.template1Fn.init();
    });