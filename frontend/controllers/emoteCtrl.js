app.controller('emoteCtrl', function($rootScope, $scope, db){
    let icons=[]
    db.selectAll("emotions").then(function(res){
        icons=res
    })
})