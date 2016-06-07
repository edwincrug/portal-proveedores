app.controller('loginController', function($scope,$location, $state, User, AlertFactory, New) {
    $scope.rfc = ""
    $scope.pass = ""

    if ($location.search().token) {
        setToken($location.search().token)
    }

    function setToken(token) {
        User.saveToken(token);
        New.getNews($scope.rfc).then(function(data) {
            $scope.listNews = data.data;
            var newFlag = false;
            for (var i in $scope.listNews) {
                if ($scope.listNews[i].idEstatus == 1) {
                    newFlag = true;
                    break;
                }
            }
            if (newFlag) {
                $state.go("admin.news");
            } else {
                $state.go("admin.pOrder");
            }

        })
    }
    $scope.submit = function() {
        User.login($scope.rfc, $scope.pass).then(function(user) {
            if (user.data.token) {
                setToken(user.data.token)
            }
        }, function(error) {
            $scope.pass = ""
            AlertFactory.error("RFC o contraseña incorrecta intenta de nuevo por favor.")
        })
    }

});
