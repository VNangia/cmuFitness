angular.module('cmufit.login', [])
.controller('LoginController', function ($scope, $http, $location) {
    $scope.user = { 'username': '', 'password': '', 'email': ''};


    $scope.login = function (user) {
      $http.post('/login', user).success(function(data) {
        window.console.log("logged in!");
        window.console.log(data);
        $location.path('/index');
        }).error(function(data) {
        window.console.log(data);
      });
    };

    $scope.register = function (user) {
      window.console.log(user);
      $http.post('/register', user).success(function(data) {
        window.console.log("registered");
        window.console.log(data);
        $scope.clearForm();
        }).error(function(data) {
        window.console.log(data);
      });
    };

    $scope.clearForm = function() {
      $scope.user.username = '';
      $scope.user.password = '';
      $scope.user.email = '';
    };

});


