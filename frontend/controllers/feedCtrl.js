app.controller('feedCtrl', function($rootScope, $scope, db){
    $scope.newpost = {};
    $scope.message = {
        text: "",
        icon: "",
        type: "",
        show: false
    };
    $scope.posts = [];
    $scope.comments=[];
    $scope.users=[];
    db.selectAll('postView').then(function(res){
        $scope.posts = res.data;
        console.log($scope.posts);
        $scope.posts.sort((a, b)=>b.ID-a.ID)
    })
    db.selectAll("comments").then(function(res){
        $scope.comments=res.data;
        console.log($scope.comments);
    })
    db.selectAll("postcomments").then(function(res){
        $scope.users=res.data;
        console.log($scope.users);
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
                    db.selectAll('postView').then(function(res){
                        $scope.posts = res.data;
                    })
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

    $scope.icons=[]
    db.selectAll("emotions").then(function(res){
        $scope.icons=res.data
    })

    $scope.sendemote= function(postid,emojiid){
        let reagaltmar=false
        db.select('reactions','postID',postid).then(function(res){
            res.data.forEach(element => {
                if(element.userID==$rootScope.user.ID){
                    reagaltmar=true
                    alert("Erre a postra már reagáltál")
                }
            })
            if(!reagaltmar){
                let data={
                    'postID':postid,
                    'userID':$rootScope.user.ID,
                    'emojiID':emojiid
                }
                db.insert('reactions',data).then(alert('sikeres like'))
            }    
        })
        
    }

    $scope.selfComment=function(index, userID,){
        $scope.comment=document.querySelector(`#ownComment${index}`).value;
        let data={
            'userID':$rootScope.user.ID,
            'postID': index,
            'comment': $scope.comment
        }
        db.insert("comments",data).then(alert('sikeres küldés'))
        db.selectAll("comments").then(function(res){
            $scope.comments=res.data;
            console.log($scope.comments);
        })
        db.selectAll("postcomments").then(function(res){
            $scope.users=res.data;
            console.log($scope.users);
        })
    }
    
})