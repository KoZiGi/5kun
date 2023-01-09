let app = new angular.module('pizzeriaApp', ['ngRoute']);

app.run(function($rootScope){
    $rootScope.settings.appTitle = '5KUN';
    $rootScope.settings.company = 'Bajai SZC Türr István Technikum';
    $rootScope.settings.author = 'Team KoZiGi';
})

app.config(function($routeProvider) {
    $routeProvider
    // bárki számára
        .when("/",{
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        })
        .when("/reg",{
            templateUrl: 'views/reg.html',
            controller: 'regCtrl'
        })
        .when('/feed', {
            templateUrl: 'views/feed.html',
            controller: 'feedCtrl'
        })
        .when("/profil/:id",{
            templateUrl: 'views/profil.html',
            controller: 'profilCtrl'
        })
        .when("/profilmod",{
            templateUrl: 'views/profilmod.html',
            controller: 'profilmodCtrl'
        })
        .when("/messages",{
            templateUrl: 'views/messages.html',
            controller: 'messagesCtrl'
        })
        .when("/admin",{
            templateUrl: 'views/admin.html',
            controller: 'adminCtrl'
        })
        .otherwise('/')
});
