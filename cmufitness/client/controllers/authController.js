angular.module('cmufit.auth', [])
.controller('AuthController', function ($scope, $http, $location) {
    $scope.user = { 'username': '', 'password': '', 'email': ''};


    $scope.login = function (user) {
      $http.post('/login', user).success(function(data) {
        window.console.log("logged in!");
        window.console.log(data);
        $location.path('/index');
        $scope.clearForm_();
        }).error(function(data) {
        window.console.log(data);
      });
    };

    $scope.register = function (user) {
      window.console.log(user);
      $http.post('/register', user).success(function(data) {
        window.console.log("registered");
        window.console.log(data);
        $scope.clearForm_();
        }).error(function(data) {
        window.console.log(data);
      });
    };

    $scope.clearForm_ = function() {
      $scope.user.username = '';
      $scope.user.password = '';
      $scope.user.email = '';
    };

    $scope.go = function (newPath) {
      $location.path(newPath);
    };

});


