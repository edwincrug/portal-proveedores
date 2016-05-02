app.controller('loginController', function($scope, $state, alertFactory, User) {
    $scope.rfc = ""
    $scope.pass = ""
    $scope.submit = function() {
        User.login($scope.rfc, $scope.pass).success(function(data, status, headers, config) {
            if (data.length > 0) {
                $state.go("admin.content");
            }
        })
    }
});
