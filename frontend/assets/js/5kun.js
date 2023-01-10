let app = new angular.module('kunkun', ['ngRoute']);

app.run(function($rootScope){
    $rootScope.settings = {
        appTitle: '5kun',
        company: 'Bajai SZC Türr István Technikum',
        author: 'Team KoZiGi'
    };
    $rootScope.user = {};
    if (window.localStorage.getItem('5kun')){$rootScope.user = angular.fromJson(window.localStorage.getItem('5kun'));}
    $rootScope.LogOut = function(){
        $rootScope.user = {};
        window.localStorage.setItem('5kun', '{}');
    };
    $rootScope.urls = [
        {
            link:'#!/',
            name:'Login',
            perm: $rootScope.user.ID==undefined
        },
        {
            link:'#!/reg',
            name:'Registration',
            perm: $rootScope.user.ID==undefined
        },
        {
            link:'#!/feed',
            name:'Feed',
            perm: Object.values($rootScope.user).length>=0
        },
        {
            link:'#!/profiles',
            name:'Profiles',
            perm:Object.values($rootScope.user).length>0
        }
    ]
})

app.config(function($routeProvider) {
    $routeProvider
        .when("/",{
            templateUrl: 'views/login.html',
            controller: 'loginCtrl',
            // bejelentkezett felhasználó ne tudjon ide menni!
            resolve: {
                function($rootScope, $location){
                    if (Object.values($rootScope.user).length>0) $location.path('/feed');
                }
            }
        })
        .when("/reg",{
            templateUrl: 'views/reg.html',
            controller: 'regCtrl',
            // bejelentkezett felhasználó ne tudjon ide menni!
            resolve: {function($rootScope, $location){
                if (Object.values($rootScope.user).length>0) $location.path('/feed');
            }}
        })
        .when('/profiles', {
            templateUrl: 'views/profiles.html',
            controller:'profilesCtrl'
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
            controller: 'profilmodCtrl',
            resolve: {
                function ($rootScope, $location){
                    if (Object.values($rootScope.user).length==0) $location.path('/')
                }
            }
        })
        .when("/messages",{
            templateUrl: 'views/messages.html',
            controller: 'messagesCtrl'
        })
        .when("/admin",{
            templateUrl: 'views/admin.html',
            controller: 'adminCtrl'
        })
        .when('/chat', {
            templateUrl:'views/chat.html',
            controller:'chatCtrl',
            resolve:{
                function($rootScope, $location){
                    if (Object.values($rootScope.user).length==0) $location.path('/');
                }
            }
        })
        .otherwise('/')
});

//file methods
app.directive('fileModel', function($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function() {
                scope.$apply(function() {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
});
app.service('fileUpload', function($http, $q) {
    this.uploadFileToUrl = function(file, uploadUrl) {
        var fd = new FormData();
        fd.append('file', file);

        var deffered = $q.defer();
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }

        }).then(
            function(res) {
                deffered.resolve(res);
            },
            function(err) {
                deffered.reject(err);
            }
        );
        return deffered.promise;
    }
});