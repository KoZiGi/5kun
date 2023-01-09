app.controller('regCtrl', function($scope,$rootScope,db, fileUpload, $location) {
    $scope.newuser={}
    $scope.error = {}
    $scope.pw2=""
    $scope.ShutUp = function(){$scope.error = false;}
    $scope.Register= function(){
        if($scope.newuser.name==""|| $scope.newuser.email==""||$scope.newuser.password==""||$scope.pw2==""||$scope.newuser.name==undefined||$scope.newuser.email==undefined||$scope.newuser.password==undefined||$scope.pw2==undefined){
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
                            console.log($scope.newuser.pfp)
                            if ($scope.newuser.pfp!=undefined||$scope.newuser.pfp!=null){
                                fileUpload.uploadFileToUrl($scope.newuser.pfp, 'http://localhost:3000/files').then(function(res){
                                    let data = {
                                        name: $scope.newuser.name,
                                        email: $scope.newuser.email,
                                        password: CryptoJS.SHA1($scope.newuser.password).toString(),
                                        filename: res.data.filename
                                    };
                                    if ($scope.newuser.address) data.address = $scope.newuser.address;
                                    if ($scope.newuser.phone) data.phone = $scope.newuser.phone
                                    db.insert("users",data).then(function(res){
                                        $scope.error = {
                                            show: true,
                                            type: 'success',
                                            message: 'Registration successfull!'
                                        }
                                    })
                                    $location.path('/feed')
                                });
                            }
                            else{
                                let data = {
                                    name: $scope.newuser.name,
                                    email: $scope.newuser.email,
                                    password: CryptoJS.SHA1($scope.newuser.password).toString(),
                                    filename: res.data.filename
                                };
                                if ($scope.newuser.address) data.address = $scope.newuser.address;
                                if ($scope.newuser.phone) data.phone = $scope.newuser.phone
                                db.insert("users",data).then(function(){
                                    $scope.error = {
                                        show: true,
                                        type: 'success',
                                        message: 'Registration successfull!'
                                    }
                                    console.log($scope.newuser)
                                })
                            }
                        }
                    })
                }
            }
        }
    }
})