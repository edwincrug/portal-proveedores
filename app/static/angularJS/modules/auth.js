app.run(function($rootScope,User,$state) {
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options) {
          //console.log($state.get(toState.name));
          if(toState.admin){
            User.me().then(function(data){
                //$state.get(toState.name).data = data.data
                //event.preventDefault();
                //event.preventDefault();
                $state.go(toState.name,{data:data.data})
            },function(err){
                $state.go('login')
            })
          }

        })
})
