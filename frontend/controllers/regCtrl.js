app.controller('regCtrl', function($scope,$rootScope,db) {
    $scope.newuser={}
    $scope.error = {}
    $scope.pw2=""
    $scope.ShutUp = function(){$scope.error = false;}
    $scope.Register= function(){
        if($scope.newuser.name==""|| $scope.newuser.email==""||$scope.newuser.password==""||$scope.pw2==""){
            $scope.error = {
                show: true,
                type: 'danger',
                message: 'Empty fields are not allowed!'
            }
        }
        else{
            if($scope.newuser.password!=$scope.pw2){
                $scope.error = {
                    show: true,
                    type: 'danger',
                    message: 'The two passwords dont match!'
                }
            }
            else{
                if($scope.newuser.password.match("/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/")){
                    $scope.error = {
                        show: true,
                        type: 'danger',
                        message: 'The password is not strong enough!'
                    }
                }
                else{
                    db.selectAll("users").then(function(results){
                        let van=false;
                        results.data.forEach(element => {
                            if(element.email==$scope.newuser.email)van=true
                        });
                        if(van){
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
})