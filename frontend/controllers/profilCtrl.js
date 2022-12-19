app.controller('profilCtrl', function($scope,$rootScope,$routeParams, db) {
    $scope.profile = {};
    $scope.posts = [];
    db.select('users', 'ID', $routeParams.id).then(function(res){
        $scope.profile = res.data[0];
    })
    db.select('posts', 'userID', $routeParams.id).then(function(res){
        $scope.posts = res.data;
        console.log($scope.posts);
    })
})