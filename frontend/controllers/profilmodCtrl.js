app.controller('profilmodCtrl', function($rootScope, $scope, db, fileUpload){
    $scope.usermod = {};
    $scope.passmod = {};
    $scope.error = {
        show:false,
        message: "asd",
        type:"danger"
    };
    $scope.perror = {
        show:false,
        message: "asd",
        type:"danger"
    };
    db.select('users', 'ID', $rootScope.user.ID).then(function(res){
        $scope.usermod.name = res.data[0].name;
        $scope.usermod.email = res.data[0].email;
        $scope.usermod.phone = res.data[0].phone;
        $scope.usermod.address = res.data[0].address;
    })
    $scope.Mod = function(){
        console.log($scope.usermod.pfp)
        if ($scope.usermod.pfp!=null && $scope.usermod.pfp!=undefined){
            fileUpload.uploadFileToUrl($scope.usermod.pfp, 'http://locahost:3000/files').then(function(res){
                let data = {
                    name: $scope.usermod.name,
                    filename: res.data.filename
                }
                console.log(data);
                if ($scope.usermod.phone) data.phone = $scope.usermod.phone;
                if ($scope.usermod.address) data.address = $scope.usermod.address;
                db.select('users', 'ID', $rootScope.user.ID).then(function(res){
                    db.update('users', 'ID', $rootScope.user.ID , data).then(function(res){
                    })                
                    //db.deleteFile(res.data[0].filename).then(function(res){
                    //})
                })
            })
        }
        else{
            db.update('users', 'ID',$rootScope.user.ID, $scope.usermod).then(function(res){
                console.log(res);
            })
        }
    }
    $scope.PassMod = function(){
        let data = {
            old: CryptoJS.SHA1($scope.passmod.old).toString(),
            new1: CryptoJS.SHA1($scope.passmod.new1).toString(),
            new2: CryptoJS.SHA1($scope.passmod.new2).toString()
        }
        if ($scope.passmod.old==undefined||$scope.passmod.old=="") $scope.SetPassError('danger', 'You need to give the old password!');
        else{
            db.select('users', 'ID', $rootScope.user.ID).then(function(res){
                if (res.data[0].password!=data.old) $scope.SetPassError('danger', "The old passwords don't match!");
                else{
                    if ($scope.passmod.new1==undefined || $scope.passmod.new1==""){
                        $scope.SetPassError('danger', "You haven't set a new password yet!");
                    }
                    else if(data.new1==data.new2) {
                        db.update('users', 'ID',$rootScope.user.ID, {password: data.new1}).then(function(res){
                            $scope.SetPassError('success', "Successful password update!");
                        })
                    }
                    else {
                        $scope.SetPassError('danger', "Your new passwords don't match");
                    }
                }
            })
        }
        console.log(data)
    }
    $scope.ShutUp = function(){$scope.error.show = false};  
    $scope.ShutUp2 = function(){$scope.perror.show = false};
    $scope.SetError = function(type, message){
        $scope.error.type = type;
        $scope.error.message = message;
        $scope.error.show = true;
    }
    $scope.SetPassError = function(type, message){
        $scope.perror.type = type;
        $scope.perror.message = message;
        $scope.perror.show = true;
    }
});