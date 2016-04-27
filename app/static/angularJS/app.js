// -- =============================================
// -- Author:      Vladimir Juárez
// -- Create date: 18/03/2016
// -- Description: Is the container of the application
// -- Modificó:
// -- Fecha:
// -- =============================================
var app = angular.module("provedoresApp", ["ngRoute"])
.config(function ($routeProvider, $locationProvider) {

    /*cheange the routes*/
    $routeProvider.when('/', {
        templateUrl: 'angularJS/templates/example.html',//example 1
        controller: 'loginController'
    });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});

app.directive('resize', function ($window) {
	return function (scope, element) {
		var w = angular.element($window);
        var changeHeight = function() {element.css('height', (w.height() -20) + 'px' );};
			w.bind('resize', function () {
		      changeHeight();   // when window size gets changed
		});
        changeHeight(); // when page loads
	}
});
