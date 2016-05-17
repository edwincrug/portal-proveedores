app.run(function($rootScope, User, $state) {
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options) {
            if (toState.admin) {
                User.me().then(function(data) {
                  console.log(data.data)
                  if(data.data.status==2){
                      $state.go('activatePending')
                  }
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
