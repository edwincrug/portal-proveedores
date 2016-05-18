app.controller('userController', function($scope, User, $state,AlertFactory) {

    User.me().then(function(user) {
        $scope.user = user.data
    })

    $scope.updateEmail = function() {
        User.update($scope.user.razonSocial, $scope.user.rfc, $scope.newEmail, 1).then(function(data) {
            console.log(data)
        });
    }
    $scope.updatePassWord = function() {
        User.update($scope.user.razonSocial, $scope.user.rfc, $scope.pass, 2).then(function(data) {
            /*date = data.data[0]
            if (data.estatus == "ok") {
                $scope.pass = $scope.passConfirm = "";
            } else {

            }*/
            $scope.pass = $scope.passConfirm = "";
            AlertFactory.success("La contraseña se cambio correctamente.");
        });
    }

    $scope.salir = function() {
        User.logout().then(function() {
            $state.go("login")
        });
    }
})
