app.controller('loginController', function($scope, $state, alertFactory, User) {
    $scope.rfc = ""
    $scope.pass = ""
    $scope.submit = function() {
        User.login($scope.rfc, $scope.pass).success(function(data, status, headers, config) {
            if (data.token) {
                User.saveToken(data.token);
                $state.go("admin.content");
            }
        })
    }
});
