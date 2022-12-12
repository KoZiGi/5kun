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