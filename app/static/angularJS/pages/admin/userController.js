app.controller('userController', function($scope, User, $state) {

    User.me().then(function(user) {
        $scope.user = user.data
        console.log($scope.user)
    })

    $scope.updateEmail = function() {
        User.update($scope.user.razonSocial, $scope.user.rfc, $scope.newEmail,1).then(function(data) {
            console.log(data)
        });
    }
    $scope.updatePassWord = function() {
        User.update($scope.user.razonSocial, $scope.user.rfc, $scope.pass,2).then(function(data) {
            console.log(data)
        });
    }

    $scope.salir = function() {
        User.logout().then(function() {
            $state.go("login")
        });
    }
})
