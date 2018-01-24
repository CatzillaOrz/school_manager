'use strict';

angular.module('dleduWebService')
    .factory('RoleAuthService', function ($window, ngDialog, $http, $state, AuthService) {
        var config = {
            "items": [
                {
                    "url": "majorlist",
                    "roles":
                    {
                        "ROLE_ORG_ADMIN": "add,update,del,get,imp",
                        "ROLE_ORG_MANAGER": "add,update,del,get,imp",
                        "ROLE_COLLEGE_ADMIN": "add,update,del,get"
                    }
                },
                {
                    "url": "classlist",
                    "roles":
                    {
                        "ROLE_ORG_ADMIN": "add,update,del,get,imp,href",
                        "ROLE_ORG_MANAGER": "add,update,del,get,imp,href",
                        "ROLE_COLLEGE_ADMIN": "add,update,get,del"
                    }
                },
                {
                    "url": "teacherlist",
                    "roles":
                    {
                        "ROLE_ORG_ADMIN": "add,update,del,imp,reset",
                        "ROLE_ORG_MANAGER": "add,update,del,imp,reset",
                        "ROLE_COLLEGE_ADMIN": "add,update,del,reset"
                    }
                },
                {
                    "url": "studentlist",
                    "roles":
                    {
                        "ROLE_ORG_ADMIN": "add,update,del,get,imp,exp,reset,newstu",
                        "ROLE_ORG_MANAGER": "add,update,del,get,imp,exp,reset,newstu",
                        "ROLE_COLLEGE_ADMIN": "add,update,del,get,reset,newstu"
                    }
                },
                {
                    "url": "periodlist",
                    "roles":
                    {
                        "ROLE_ORG_ADMIN": "add,update,del,get,addtime,addweek",
                        "ROLE_ORG_MANAGER": "add,update,del,get,addtime,addweek",
                        "ROLE_COLLEGE_ADMIN": "get"
                    }
                },
                {
                    "url": "courselist",
                    "roles":
                    {
                        "ROLE_ORG_ADMIN": "add,update,del,get,imp",
                        "ROLE_ORG_MANAGER": "add,update,del,get,imp",
                        "ROLE_COLLEGE_ADMIN": "get"
                    }
                },
                {
                    "url": "teachclasslist",
                    "roles":
                    {
                        "ROLE_ORG_ADMIN": "batchadd,add,update,del,get,imp,exp,assign,info,href",
                        "ROLE_ORG_MANAGER": "batchadd,add,update,del,get,imp,exp,assign,info,href",
                        "ROLE_COLLEGE_ADMIN": "get"
                    }
                },
                {
                    "url": "attendlist",
                    "roles":
                    {
                        "ROLE_ORG_ADMIN": "get,imp,trend,classRate,modAttendance",
                        "ROLE_ORG_MANAGER": "get,imp,trend,classRate,modAttendance",
                        "ROLE_COLLEGE_ADMIN": "get,imp,trend,modAttendance",
                        "ROLE_ORG_EDUCATIONALMANAGER": "get,imp,trend,modAttendance",
                        "ROLE_ORG_DATAVIEW": "get",
                        "ROLE_COLLEG_EDUCATIONALMANAGER": "get,imp,trend,modAttendance",
                        "ROLE_COLLEG_DATAVIEW": "get"
                    }
                },
                {
                    "url": "coursescore",
                    "roles":
                    {
                        "ROLE_ORG_ADMIN": "batchadd,add,update,del,get,imp,exp",
                        "ROLE_ORG_MANAGER": "add,update,del,get,imp,exp",
                        "ROLE_COLLEGE_ADMIN": "get"
                    }
                },
                {
                    "url": "evaquestion",
                    "roles":
                    {
                        "ROLE_ORG_ADMIN": "dist,show,add,edit,static",
                        "ROLE_ORG_MANAGER": "dist,show,add,edit,static",
                        "ROLE_COLLEGE_ADMIN": "dist,show,add,edit,static",
                        "ROLE_ORG_EDUCATIONALMANAGER": "dist,show,add,edit,static",
                        "ROLE_ORG_DATAVIEW": "show,static",
                        "ROLE_COLLEG_EDUCATIONALMANAGER": "dist,show,add,edit,static",
                        "ROLE_COLLEG_DATAVIEW": "show,static"
                    }
                },
                {
                    "url": "distributelist",
                    "roles":
                    {
                        "ROLE_ORG_ADMIN": "dist,cancleDist",
                        "ROLE_ORG_MANAGER": "dist,cancleDist",
                        "ROLE_COLLEGE_ADMIN": "dist,cancleDist",
                        "ROLE_ORG_EDUCATIONALMANAGER": "dist,cancleDist",
                        "ROLE_ORG_DATAVIEW": "",
                        "ROLE_COLLEG_EDUCATIONALMANAGER": "dist,cancleDist",
                        "ROLE_COLLEG_DATAVIEW": ""
                    }
                },
                {
                    "url": "elecfence",
                    "roles":
                    {
                        "ROLE_ORG_ADMIN": "add,get,pushMessage",
                        "ROLE_ORG_MANAGER": "add,get,pushMessage",
                        "ROLE_COLLEGE_ADMIN": "get,pushMessage",
                        "ROLE_ORG_EDUCATIONALMANAGER": "get,pushMessage",
                        "ROLE_ORG_DATAVIEW": "get",
                        "ROLE_COLLEG_EDUCATIONALMANAGER": "get,pushMessage",
                        "ROLE_COLLEG_DATAVIEW": "get"
                    }
                },
                {
                    "url": "enttutorman",
                    "roles":
                    {
                        "ROLE_ORG_ADMIN": "batchadd,add,update,del,get,imp,exp",
                        "ROLE_ORG_MANAGER": "add,update,del,get,imp,exp",
                        "ROLE_COLLEGE_ADMIN": "get"
                    }
                },
                {
                    "url": "practicegroupman",
                    "roles":
                    {
                        "ROLE_ORG_ADMIN": "batchadd,add,update,del,get,imp,exp",
                        "ROLE_ORG_MANAGER": "add,update,del,get,imp,exp",
                        "ROLE_COLLEGE_ADMIN": "get"
                    }
                },
                {
                    "url": "distlist",
                    "roles":
                    {
                        "ROLE_ORG_ADMIN": "authority, school_sup, college_sup, school_data, school_edu, college_data, college_edu, finance_man, room_man",
                        "ROLE_ORG_MANAGER": "authority, college_sup, school_data, school_edu, college_data, college_edu, finance_man, room_man",
                        "ROLE_COLLEGE_ADMIN": "authority, college_data, college_edu",
                        "ROLE_ORG_EDUCATIONALMANAGER": "",
                        "ROLE_ORG_DATAVIEW": "",
                        "ROLE_COLLEG_EDUCATIONALMANAGER": "",
                        "ROLE_COLLEG_DATAVIEW": ""
                    }
                }
            ]
        };
        return {
            isUseAuthority: function (type) {
                var url = $state.current.name;
                if(type){
                    var roles = AuthService.getUser().roleNames.toString();
                    var datas = config.items;
                    for(var i = 0; i < datas.length; i++){
                        if(datas[i].url == url){
                            for(var property in datas[i].roles){
                                if(roles.indexOf(property) != -1){
                                    if(datas[i].roles[property].indexOf(type) == -1){
                                        return false;
                                    }
                                }
                            }
                        }
                    }
                }
                return true;
            }
        }
    });
