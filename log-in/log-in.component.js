'use strict';

angular.module('logIn').component('logIn', templateUrl: 'log-in/log-in.template.html', controller: [])

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
