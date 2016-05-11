app.controller('newsController', function($scope, New, User) {

    $scope.time = new Date();

    User.me().then(function(user) {
        New.getNews(user.data.rfc).then(function(data) {
            $scope.listNews = data.data;
        })
    })

})
