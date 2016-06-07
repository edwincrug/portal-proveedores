app.controller('detailNewsController', function($scope, $stateParams, New, User) {
    User.me().then(function(user) {
        New.getNews(user.ppro_idUserRol == 1 ? user.rfc : user.ppro_userId).then(function(data) {
            for (var i in data.data) {
                if (data.data[i].idNoticia == $stateParams.id) {
                    $scope.new = data.data[i];
                }
            }
        })
    })

})
