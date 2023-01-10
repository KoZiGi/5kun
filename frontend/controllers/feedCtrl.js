app.controller('feedCtrl', function($rootScope, $scope, db){
    $scope.newpost = {};
    $scope.message = {
        text: "",
        icon: "",
        type: "",
        show: false
    };
    $scope.posts = [];
    $scope.postthing = function (){
        db.selectAll('postView').then(function(res){
            $scope.posts = res.data;
            $scope.posts.sort((a, b)=>b.ID-a.ID)
            $scope.posts.forEach(e=>{
                e.reacted=false
                e.emotes=[]
                db.select('allemotes', 'postID', e.ID).then(function(r){
                    e.emotes=r.data;
                })
                db.select('reactions','postID',e.ID).then(function(res){
                    res.data.forEach(element => {
                        if(element.userID==$rootScope.user.ID){
                            e.reacted=true
                        }
                    })
                })
            })
            console.log($scope.posts);
        })
    }
    $scope.postthing()
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
        $scope.users.forEach(element =>{
            if(element.filename==undefined){
                element.filename="assets/images/nopic.png";
            }
        });
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
                    window.location.reload();
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
        let data={
            'postID':postid,
            'userID':$rootScope.user.ID,
            'emojiID':emojiid
        }
        db.insert('reactions',data).then()
        postthing()
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
            $scope.users.forEach(element =>{
                if(element.filename==undefined){
                    element.filename="assets/images/nopic.png";
                }
            });
            console.log($scope.users);
        })
    }
    
})