app.controller('loginCtrl', function($rootScope, $scope, db){
    $scope.loguser = {};
    $scope.error = {};
    $scope.ShutUp = function(){$scope.error = false;}
    $scope.LogIn = function(){
        if ($scope.loguser.email == undefined || $scope.loguser.passwd == undefined){
            $scope.error = {
                show: true,
                type: 'danger',
                message: 'Empty fields are not allowed!'
            }
        }
        else{
            db.login({
             email:$scope.loguser.email,
             passwd:$scope.loguser.passwd
            }).then(function(res){
                $rootScope.user = {
                    ID: res.data.ID,
                    name: res.data.name,
                    email: res.data.email
                };
                window.localStorage.setItem('5kun', angular.toJson($rootScope.user));
            }, function(res){
                $scope.error.type = res.data.type;
                $scope.error.message = res.data.message;
                $scope.error.show = true;
            })
        }
    }
})