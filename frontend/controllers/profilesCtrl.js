app.controller('profilesCtrl', function($rootScope, $scope, db){
    db.selectAll('users').then(function(res){
        console.log(res.data)
        $scope.profiles = res.data;
    })
})