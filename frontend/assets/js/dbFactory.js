app.factory('db', function($http, $q){
    return {
        login: function(data){
            let deferrer = $q.defer();
            $http.post('http://localhost:3000/login', data).then(function(res){
                deferrer.resolve(res);
            }, function(res){
                deferrer.reject(res);
            });
            return deferrer.promise;
        },
        register: function(data){
            let deferrer = $q.defer();
            $http.post('http://localhost:3000/register', data).then(function(res){
                deferrer.resolve(res);
            }, function(res){
                deferrer.reject(res);
            })
        },
        selectAll: function(tablename){
            let deferrer = $q.defer();
            $http.get(`http://localhost:3000/${tablename}`).then(function(res){
                deferrer.resolve(res);
            },function(res){
                deferrer.reject(res);
            })
        },
        select:function(tablename, field, value){
            let deferrer = $q.defer();
            $http.get(`http://localhost:3000/${tablename}/${field}/${value}`).then(function(res){
                deferrer.resolve(res);
            }, function(res){
                deferrer.reject(res);
            })
        },
        update: function(tablename, id, data){
            let deferrer = $q.defer();
            $http.patch(`http://localhost:3000/${tablename}/${id}`, data).then(function(res){
                deferrer.resolve(res);
            }, function(res){
                deferrer.reject(res);
            })
        }
    }
})