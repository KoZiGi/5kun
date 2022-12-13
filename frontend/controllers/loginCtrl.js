app.controller('loginCtrl', function($scope, db){
    $scope.loguser = {};
    $scope.error = {};
    $scope.LogIn = function(){
        if ($scope.loguser.email == undefined || $scope.loguser.password == undefined){
            $scope.error = {
                show: true,
                
            }
        }
    }
})