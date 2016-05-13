app.controller('loginController', function($scope, $state, User,AlertFactory) {
    $scope.rfc = ""
    $scope.pass = ""
    $scope.submit = function() {
        User.login($scope.rfc, $scope.pass).then(function(user) {
            if (user.data.token) {
                User.saveToken(user.data.token);
                $state.go("admin.news");
            }
        },function(error){
          $scope.pass = ""
          AlertFactory.error("RFC o contraseña incorrecta intenta de nuevo por favor.")
        })
    }

});
