app.controller('feedCtrl', function($rootScope, $scope, db){
    $scope.newpost = {};
    $scope.message = {
        text: "",
        icon: "",
        type: "",
        show: false
    };
    $scope.posts = [];
    db.selectAll('postView').then(function(res){
        $scope.posts = res.data;
        console.log($scope.posts);
    })

    $scope.Post = function(){
        let data = {
            userID: $rootScope.user.ID,
            postmessage: $scope.newpost.postmessage
        }
        db.insert('posts', data).then(function(res){
            if (res.status==200){
                if (res.data.insertId){
                    $scope.setMessage('success', 'check-lg', 'Successful post!')
                }
            }
            else{
                $scope.setMessage('danger', 'exclamation-circle', 'Unuccessful post!')
            }
        });
    }
    $scope.setMessage = function(type, icon, text){
        $scope.message.text = text;
        $scope.message.icon = icon;
        $scope.message.type = type;
        $scope.message.show = true;
    }
})



