app.run(function($rootScope, User, $state) {
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options) {
            if (toState.admin) {
                User.me().then(function(data) {
                    $state.go(toState.name, {
                        data: data.data
                    })
                }, function(err) {
                    event.preventDefault();
                   $state.go('login')
                })
            }

        })
})
