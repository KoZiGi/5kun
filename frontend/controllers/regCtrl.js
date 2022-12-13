app.controller('regCtrl', function($scope,$rootScope,db) {
    $scope.newuser={}
    $scope.error = {};
    $scope.ShutUp = function(){$scope.error = false;}
    $scope.Register= function(){
        if($scope.newuser.name==""|| $scope.newuser.email==""||$scope.newuser.password==""||$scope.newuser.pw2==""){
            $scope.error = {
                show: true,
                type: 'danger',
                message: 'Empty fields are not allowed!'
            }
        }
        else{
            if($scope.newuser.password!=$scope.newuser.pw2){
                $scope.error = {
                    show: true,
                    type: 'danger',
                    message: 'The two passwords dont match!'
                }
            }
            else{
                if(!$scope.newuser.password.matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])$")){
                    $scope.error = {
                        show: true,
                        type: 'danger',
                        message: 'The password has to contain at least one lowercase, one uppercase character, and a number!'
                    }
                }
                else{
                    if($scope.newuser.password.length<8){
                        $scope.error = {
                            show: true,
                            type: 'danger',
                            message: 'The password has to be at least eight characters long!'
                        }
                    }
                    else{
                        db.select("user","email",$scope.newuser.email).then(function(results){
                            if(results.length!=0){
                                $scope.error = {
                                    show: true,
                                    type: 'danger',
                                    message: 'This Email is already taken!'
                                }
                            }
                            else{
                                db.insert("users",$scope.newuser).then(function(){
                                    $scope.error = {
                                        show: true,
                                        type: 'success',
                                        message: 'Registration successfull!'
                                    }
                                })
                            }
                        })
                    }
                }
            }
        }
    }
})