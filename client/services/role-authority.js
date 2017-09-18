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
                        "ROLE_ORG_ADMIN": "add,update,del,get,imp",
                        "ROLE_ORG_MANAGER": "add,update,del,get,imp",
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
                        "ROLE_ORG_ADMIN": "add,update,del,get,imp,exp,reset",
                        "ROLE_ORG_MANAGER": "add,update,del,get,imp,exp,reset",
                        "ROLE_COLLEGE_ADMIN": "add,update,del,get,reset"
                    }
                },
                {
                    "url": "periodlist",
                    "roles":
                    {
                        "ROLE_ORG_ADMIN": "add,update,del,get",
                        "ROLE_ORG_MANAGER": "add,update,del,get",
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
                        "ROLE_ORG_ADMIN": "batchadd,add,update,del,get,imp,exp,assign,info",
                        "ROLE_ORG_MANAGER": "batchadd,add,update,del,get,imp,exp,assign,info",
                        "ROLE_COLLEGE_ADMIN": "get"
                    }
                },
                {
                    "url": "attendlist",
                    "roles":
                    {
                        "ROLE_ORG_ADMIN": "get,imp,trend",
                        "ROLE_ORG_MANAGER": "get,imp,trend",
                        "ROLE_COLLEGE_ADMIN": "get"
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
                        "ROLE_ORG_ADMIN": "batchadd,add,update,del,get,imp,exp",
                        "ROLE_ORG_MANAGER": "add,update,del,get,imp,exp",
                        "ROLE_COLLEGE_ADMIN": "get"
                    }
                },
                {
                    "url": "elecfence",
                    "roles":
                    {
                        "ROLE_ORG_ADMIN": "add,get",
                        "ROLE_ORG_MANAGER": "add,get",
                        "ROLE_COLLEGE_ADMIN": "get"
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
                        "ROLE_ORG_ADMIN": "school,college",
                        "ROLE_ORG_MANAGER": "college"
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
