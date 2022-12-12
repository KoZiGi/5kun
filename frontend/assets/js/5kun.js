let app = new angular.module('pizzeriaApp', ['ngRoute']);

app.run(function($rootScope){
    $rootScope.settings.appTitle = '5KUN';
    $rootScope.settings.company = 'Bajai SZC Türr István Technikum';
    $rootScope.settings.author = 'Team KoZiGi';
})

app.config(function($routeProvider) {
    $routeProvider
    // bárki számára
        .when('/', {
            templateUrl: 'views/feed.html',
            controller: 'feedCtrl'
        })
        .when('/',{

        })
        .otherwise('/')
});
