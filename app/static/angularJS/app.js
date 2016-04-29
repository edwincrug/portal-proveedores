// -- =============================================
// -- Author:      Vladimir Juárez
// -- Create date: 18/03/2016
// -- Description: Is the container of the application
// -- Modificó:
// -- Fecha:
// -- =============================================
var app = angular.module('app', ['ui.router','angularFileUpload'])
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
        $stateProvider
            .state('login', {
                url: '/',
                templateUrl: 'angularJS/templates/login.html',
                controller: 'loginController'
            })
            .state('signup', {
                url: '/registro',
                templateUrl: 'angularJS/templates/signup.html',
                controller: 'signupController'
            })
            .state('admin', {
                abstrac:true,
                templateUrl: 'angularJS/templates/admin.html'
            })
            .state('admin.content', {
                url: '/ordenes',
                views: {
                    news: {
                        templateUrl: 'angularJS/templates/news.html'
                    },
                    pOrder: {
                        templateUrl: 'angularJS/templates/pOrder.html',
                        controller: 'pOrderController'
                    },
                    iPortal: {
                        templateUrl: 'angularJS/templates/iPortal.html'
                    },
                    oPaid: {
                        templateUrl: 'angularJS/templates/oPaid.html'
                    },
                    account: {
                        templateUrl: 'angularJS/templates/account.html'
                    },
                    fileUpload: {
                        templateUrl: 'angularJS/templates/fileUpload.html',
                        controller: 'fileUploadController'
                    }

                }
            })

        $urlRouterProvider.otherwise('/');
    });

app.directive('resize', function($window) {
    return function(scope, element) {
        var w = angular.element($window);
        var changeHeight = function() {
            element.css('height', (w.height() - 20) + 'px');
        };
        w.bind('resize', function() {
            changeHeight(); // when window size gets changed
        });
        changeHeight(); // when page loads
    }
});
