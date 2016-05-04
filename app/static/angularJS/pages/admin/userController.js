app.controller('userController', function($scope, User, $state) {
    console.log("User");
    $scope.salir = function() {
        User.logout().then(function() {
            $state.go("login")
        });
    }
})
