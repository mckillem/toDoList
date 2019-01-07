var toDoList = angular.module('toDoList', ['ngRoute']);

toDoList.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/basic', {
            templateUrl: 'html/basic.tpl.html'
        })
        .when('/dashboard', {
            templateUrl: 'html/dashboard.html',
            controller: widgetsController,
            activeTab: 'dashboard'
        })
        .when('/projects', {
            templateUrl: 'html/projects.html',
            controller: widgetsController,
            activeTab: 'projects'
        })
        .when('/tasks', {
            templateUrl: 'html/tasks.html',
            controller: widgetsController,
            activeTab: 'tasks'
        })
        // .when('/login', {
        //     templateUrl: 'index.html'
        // })
        // .otherwise({
        //     redirectTo: 'index.html'
        // })
}])

function widgetsController($scope, $route) {
    $scope.$route = $route;
}

toDoList.controller('toDoListController', ['$scope', '$http', function ($scope, $http) {
    $scope.loginUser = false;

    // Loads user data from a file
    $http.get('databaseFiles/users.php').then(function (response) {
        $scope.users = response.data;
    });

    $http.get('databaseFiles/login.php').then(function (response) {
        $scope.login = response.data;
    });

    $scope.userLogin = {};

    $scope.clickLogIn = function (userName, password) {

        for (let i = 0; i < $scope.login.length; i++) {
            if ($scope.login[i].user_name === userName && $scope.login[i].password === password) {
                $scope.loginUser = true;

                for (user of $scope.users) {
                    if ($scope.login[i].id_user === user.id_user) {
                        $scope.userLogin = $scope.login[i];
                        $scope.userName = user.first_name + ' ' + user.last_name;
                        $scope.idUser = user.id_user;
                        // console.log(user.id_user)
                        // console.log($scope.idUser)
                        // loadProjectsByUserId();
                    }
                }
             }
        }
    }

    $scope.logOut = function () {
        $scope.loginUser = false;
        $scope.userName = "";
    }


    //
    // // Load project by id_user
    // function loadProjectsByUserId() {
    //     $http.post('databaseFiles/projects.php').then(function (response) {
    //         $scope.Projects = response.data;
    //         console.log($scope.idUser + '--' + $scope.Projects[0].id_user)
    //         for (project of $scope.Projects) {
    //             if ($scope.idUser === project.id_user) {
    //                 $scope.projectsByUser = project.id_user
    //                 console.log(project.id_user)
    //             }
    //         }
    //     });
    // }


    // Function to get projects from the database
    getProject();

    function getProject() {
// Sending request to EmpDetails.php files
        $http.post('databaseFiles/projects.php').then(function (response) {
// Stored the returned data into scope
            $scope.Projects = response.data;
        });
    }


// Enabling show_form variable to enable Add employee button
    $scope.show_form = true;
    $scope.showForm = false;
    $scope.showEditForm = false;
// Function to add toggle behaviour to form
    $scope.formToggle = function () {
        $scope.showForm = true;
        $('#form').slideToggle();
        $('#editForm').css('display', 'none');
    }
    // insert project

    $scope.insertProject = function (project) {

        // var number = $scope.Projects[-1].last_serial_number;
        // var lastSerialNumber =
        // lastSerialNumber = lastSerialNumber + 1;
        // // var codeProject = project.selectedProject.project_code + '-' + number;
        //
        // project.selectedProject.last_serial_number = number;
        // // $scope.updateProject(project.selectedProject); // možná opravit update
        // // TODO: uložit number k projectu jako last_Serial_number

        $http.post('databaseFiles/insertProject.php', {
            "id_user": project.selectedUser,
            "created_id": project.created_id,
            "name": project.name,
            "description": project.description,
            "project_code": project.project_code,
            "last_serial_number": project.last_serial_number
        }).then(function (response) {
            if (response.data == true) {
                getProject();
                $('#form').css('display', 'none');

            }
        });
    }

    // delete project
    $scope.deleteProject = function (project) {
        $http.post('databaseFiles/deleteProject.php', {"del_id": project.id_project}).then(function (response) {
            if (response.data == true) {
                getProject();
            }
        });
    }

    $scope.currentProject = {};
    $scope.editProject = function (project) {
        $scope.currentProject = project;
        $scope.showEditForm = true;

        $('#form').slideUp();
        $('#editForm').slideToggle();
    }
    $scope.updateProject = function (project) {
        $http.post('databaseFiles/updateProject.php', {
            "id_project": project.id_project,
            "id_user": project.id_user,
            "created_id": project.created_id,
            "name": project.name,
            "description": project.description,
            "project_code": project.project_code,
            "last_serial_number": project.last_serial_number
        }).then(function (response) {
            $scope.show_form = true;
            if (response.data == true) {
                getProject();
            }
        });
    }
    $scope.updateMsg = function (id_project) {
        $('#editForm').css('display', 'none');
    }

    // Function to get tasks from the database
    getTask();

    function getTask() {
// Sending request to EmpDetails.php files
        $http.post('databaseFiles/tasks.php').then(function (response) {
// Stored the returned data into scope
            $scope.Tasks = response.data;
        });
    }

    //Enabling show_form variable to enable Add employee button
    $scope.showTaskForm = false;
    $scope.showEditTaskForm = false;
// Function to add toggle behaviour to form
    $scope.taskToggle = function () {
        $scope.showTaskForm = true;
        $('#taskForm').slideToggle();
        $('#editTaskForm').css('display', 'none');
    }

    // insert task

    $scope.insertTask = function (task) {
        var number = task.selectedProject.last_serial_number+1;
        var codeTask = task.selectedProject.project_code + '-' + number;

        task.selectedProject.last_serial_number = number;
        $scope.updateProject(task.selectedProject); // možná opravit update
        // TODO: uložit number k projectu jako last_Serial_number

        $http.post('databaseFiles/insertTask.php', {
            "name": task.name,
            "description": task.description,
            "created_id": $scope.userLogin.id_user,
            "code": codeTask,
            "created_date": new Date(),
            "estimate": task.estimate,
            "project": task.selectedProject.id_project,
            "remaining": task.remaining,
            "worked": task.worked,
            "id_user": task.selectedUser
        }).then(function (response) {
            if (response.data == true) {
                getTask();
                $('#taskForm').css('display', 'none');
            }
        });
    }

    // delete task
    $scope.deleteTask = function (task) {
        $http.post('databaseFiles/deleteTask.php', {"del_id": task.id_task}).then(function (response) {
            if (response.data == true) {
                getTask();
            }
        });
    }

    $scope.currentTask = {};
    $scope.editTask = function (task) {
        $scope.currentTask = task;
        $scope.showEditTaskForm = true;

        $('#taskForm').slideUp();
        $('#editTaskForm').slideToggle();
    }
    $scope.updateTask = function (task) {
        $http.post('databaseFiles/updateTask.php', {
            "id_task": task.id_task,
            "name": task.name,
            "description": task.description,
            "created_id": task.created_id,
            "code": task.code,
            "created_date": task.created_date,
            "project": task.selectedProject.id_project,
            "estimate": task.estimate,
            "remaining": task.remaining,
            "worked": task.worked,
            "id_user": task.id_user
        }).then(function (response) {
            $scope.show_form = true;
            if (response.data == true) {
                getTask();
            }
        });
    }

    $scope.updateMsg = function (id_task) {
        $('#editTaskForm').css('display', 'none');
    }

}]);

//
// angular.module('toDoList', []).controller('toDoListController', function($scope, $timeout) {
//
//     $scope.loginUser = false;
//     $scope.logInDateTime = null;
//     $scope.logOutDateTime = null;
//     $scope.user = {};
//
//     $scope.allowedLoginUsers = [
//         {
//             userName: 'Matej',
//             passwd: 'Matej',
//             level: '10'
//         },
//         {
//             userName: 'Lada',
//             passwd: 'Lada',
//             level: '10'
//         }
//     ];
//
//     /**
//      *
//      * @param userName
//      * @param password
//      */
//     $scope.clickLogIn = function (userName, password) {
//         var passwd = MD5(password);
//         // zatím je to takhle, jinak zde bude komunikace s DB a ověření, zda takový uživatel vůbec existuje
//         for (user of $scope.allowedLoginUsers) {
//             if (user.userName === userName) {
//                 if (user.passwd === password) {
//                     $scope.loginUser = false;
//                     $timeout(function () {
//                         $scope.loginUser = true;
//                         $scope.user = user;
//                         $scope.logInDateTime = new Date();
//                     }, 0);
//                 }
//             }
//         }
//
//
//         /*_.forEach($scope.allowedLoginUsers, function (user) {
//             if (user.userName === userName) {
//                 if (user.passwd === password) {
//                     $scope.loginUser = false;
//                     $timeout(function () {
//                         $scope.loginUser = true;
//                         $scope.user = user;
//                         $scope.logInDateTime = new Date();
//                     }, 0);
//                 }
//             }
//         })*/
//     };
//
//     /**
//      *
//      */
//     $scope.clickLogOut = function () {
//         $timeout(function () {
//             $scope.loginUser = false;
//             $scope.logOutDateTime = new Date();
//         },0);
//
//
//     //    dořešení pro práci s datem, aby bylo možné říci jak dlouho byl uživatel přihlášen do systému
//
//     };
//
//
//     /**
//      *
//      * @param string
//      * @returns {string}
//      * @constructor
//      */
//
//     var MD5 = function (string) {
//
//         function RotateLeft(lValue, iShiftBits) {
//             return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
//         }
//
//         function AddUnsigned(lX,lY) {
//             var lX4,lY4,lX8,lY8,lResult;
//             lX8 = (lX & 0x80000000);
//             lY8 = (lY & 0x80000000);
//             lX4 = (lX & 0x40000000);
//             lY4 = (lY & 0x40000000);
//             lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
//             if (lX4 & lY4) {
//                 return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
//             }
//             if (lX4 | lY4) {
//                 if (lResult & 0x40000000) {
//                     return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
//                 } else {
//                     return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
//                 }
//             } else {
//                 return (lResult ^ lX8 ^ lY8);
//             }
//         }
//
//         function F(x,y,z) { return (x & y) | ((~x) & z); }
//         function G(x,y,z) { return (x & z) | (y & (~z)); }
//         function H(x,y,z) { return (x ^ y ^ z); }
//         function I(x,y,z) { return (y ^ (x | (~z))); }
//
//         function FF(a,b,c,d,x,s,ac) {
//             a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
//             return AddUnsigned(RotateLeft(a, s), b);
//         };
//
//         function GG(a,b,c,d,x,s,ac) {
//             a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
//             return AddUnsigned(RotateLeft(a, s), b);
//         };
//
//         function HH(a,b,c,d,x,s,ac) {
//             a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
//             return AddUnsigned(RotateLeft(a, s), b);
//         };
//
//         function II(a,b,c,d,x,s,ac) {
//             a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
//             return AddUnsigned(RotateLeft(a, s), b);
//         };
//
//         function ConvertToWordArray(string) {
//             var lWordCount;
//             var lMessageLength = string.length;
//             var lNumberOfWords_temp1=lMessageLength + 8;
//             var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
//             var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
//             var lWordArray=Array(lNumberOfWords-1);
//             var lBytePosition = 0;
//             var lByteCount = 0;
//             while ( lByteCount < lMessageLength ) {
//                 lWordCount = (lByteCount-(lByteCount % 4))/4;
//                 lBytePosition = (lByteCount % 4)*8;
//                 lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
//                 lByteCount++;
//             }
//             lWordCount = (lByteCount-(lByteCount % 4))/4;
//             lBytePosition = (lByteCount % 4)*8;
//             lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
//             lWordArray[lNumberOfWords-2] = lMessageLength<<3;
//             lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
//             return lWordArray;
//         };
//
//         function WordToHex(lValue) {
//             var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
//             for (lCount = 0;lCount<=3;lCount++) {
//                 lByte = (lValue>>>(lCount*8)) & 255;
//                 WordToHexValue_temp = "0" + lByte.toString(16);
//                 WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
//             }
//             return WordToHexValue;
//         };
//
//         function Utf8Encode(string) {
//             string = string.replace(/\r\n/g,"\n");
//             var utftext = "";
//
//             for (var n = 0; n < string.length; n++) {
//
//                 var c = string.charCodeAt(n);
//
//                 if (c < 128) {
//                     utftext += String.fromCharCode(c);
//                 }
//                 else if((c > 127) && (c < 2048)) {
//                     utftext += String.fromCharCode((c >> 6) | 192);
//                     utftext += String.fromCharCode((c & 63) | 128);
//                 }
//                 else {
//                     utftext += String.fromCharCode((c >> 12) | 224);
//                     utftext += String.fromCharCode(((c >> 6) & 63) | 128);
//                     utftext += String.fromCharCode((c & 63) | 128);
//                 }
//
//             }
//
//             return utftext;
//         };
//
//         var x=Array();
//         var k,AA,BB,CC,DD,a,b,c,d;
//         var S11=7, S12=12, S13=17, S14=22;
//         var S21=5, S22=9 , S23=14, S24=20;
//         var S31=4, S32=11, S33=16, S34=23;
//         var S41=6, S42=10, S43=15, S44=21;
//
//         string = Utf8Encode(string);
//
//         x = ConvertToWordArray(string);
//
//         a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
//
//         for (k=0;k<x.length;k+=16) {
//             AA=a; BB=b; CC=c; DD=d;
//             a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
//             d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
//             c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
//             b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
//             a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
//             d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
//             c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
//             b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
//             a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
//             d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
//             c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
//             b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
//             a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
//             d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
//             c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
//             b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
//             a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
//             d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
//             c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
//             b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
//             a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
//             d=GG(d,a,b,c,x[k+10],S22,0x2441453);
//             c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
//             b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
//             a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
//             d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
//             c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
//             b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
//             a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
//             d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
//             c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
//             b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
//             a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
//             d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
//             c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
//             b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
//             a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
//             d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
//             c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
//             b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
//             a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
//             d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
//             c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
//             b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
//             a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
//             d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
//             c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
//             b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
//             a=II(a,b,c,d,x[k+0], S41,0xF4292244);
//             d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
//             c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
//             b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
//             a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
//             d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
//             c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
//             b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
//             a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
//             d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
//             c=II(c,d,a,b,x[k+6], S43,0xA3014314);
//             b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
//             a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
//             d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
//             c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
//             b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
//             a=AddUnsigned(a,AA);
//             b=AddUnsigned(b,BB);
//             c=AddUnsigned(c,CC);
//             d=AddUnsigned(d,DD);
//         }
//
//         var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
//
//         return temp.toLowerCase();
//     }
//
//
//
// });