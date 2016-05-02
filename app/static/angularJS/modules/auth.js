app.run(function($rootScope) {
    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams, options) {
          //console.log(toState);
            //event.preventDefault();

        })
})
