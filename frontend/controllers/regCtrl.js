app.controller('regCtrl', function($scope,$rootScope,db) {
    $scope.newuser={}
    if($scope.newuser.name==""|| $scope.newuser.email==""||$scope.newuser.pw1==""||$scope.newuser.pw2==""){
        //TODO: nincs kitöltve minden
    }
    else{
        if($scope.newuser.pw1!=$scope.newuser.pw2){
            //TODO: nem egyeznek a jelszavak
        }
        else{
            if(!$scope.newuser.pw1.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")){
                //TODO: a jelszónak tartalmaznia kell kis-és nagybetűt valamint számot 
            }
            else{
                db.select
            }
        }
    }
})