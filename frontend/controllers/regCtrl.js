app.controller('regCtrl', function($scope,$rootScope,db) {
    $scope.newuser={}
    if($scope.newuser.name==""|| $scope.newuser.email==""||$scope.newuser.password==""||$scope.newuser.pw2==""){
        //TODO: Nincs kitöltve minden
    }
    else{
        if($scope.newuser.password!=$scope.newuser.pw2){
            //TODO: Nem egyeznek a jelszavak
        }
        else{
            if(!$scope.newuser.password.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")){
                //TODO: A jelszónak tartalmaznia kell kis-és nagybetűt valamint számot 
            }
            else{
                db.select("user","email",$scope.newuser.email).then(function(results){
                    if(results.length!=0){
                        //TODO: Ez az Email már foglalt
                    }
                    else{
                        db.insert("users",$scope.newuser).then(function(){
                            //TODO: Sikeres regisztráció
                        })
                    }
                })
            }
        }
    }
})