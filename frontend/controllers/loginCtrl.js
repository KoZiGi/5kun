app.controller('loginCtrl', function($scope, db){
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
                console.log(res.data);
            }, function(res){
                $scope.error.type = res.data.type;
                $scope.error.message = res.data.message;
                $scope.error.show = true;
            })
        }
    }
})