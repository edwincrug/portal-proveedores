app.controller('userController', function($scope, User, $state) {

  User.me().then(function(user){
    $scope.user = user.data
  })

    $scope.salir = function() {
        User.logout().then(function() {
            $state.go("login")
        });
    }
})
