app.controller('chatCtrl', function($scope, $rootScope, db){
    db.selectAll('users').then(function(res){$scope.profiles=res.data;});
    $scope.currentUser;
    $scope.Chat = function(id) {
        $scope.currentUser = id;
        $scope.messages = [];
        db.select('messages', 'fromID', id).then(function(res){
            let message = res.data;
            db.select('messages', 'toID', id).then(function(rest){
                $scope.messages = message.concat(rest.data);
                $scope.messages = $scope.messages.filter(e=>e.fromID==$rootScope.user.ID || e.toID==$rootScope.user.ID)
            })

        });
    }
    $scope.SendMessage = function(){
        if (document.querySelector('#newmsg').value!=""){

            let data = {
                message: document.querySelector('#newmsg').value,
                fromID: $rootScope.user.ID,
                toID: $scope.currentUser,
            }
            db.insert('messages', data).then(function(res){
                if (res.data.insertId>-1){
                    document.querySelector('#newmsg').value="";
                    $scope.messages.push(data);
                } 
            })
        }
    }
});