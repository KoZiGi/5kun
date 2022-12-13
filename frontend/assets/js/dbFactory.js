app.factory('db', function($http, $q){
    return {
        login: function(data){
            let deferrer = $q.defer();
            $http.post('http://localhost:3000/log', data).then(function(res){
                deferrer.resolve(res);
            }, function(res){
                deferrer.reject(res);
            });
            return deferrer.promise;
        },
        selectAll: function(tablename){
            let deferrer = $q.defer();
            $http.get(`http://localhost:3000/${tablename}`).then(function(res){
                deferrer.resolve(res);
            },function(res){
                deferrer.reject(res);
            })
            return deferrer.promise;
        },
        select:function(tablename, field, value){
            let deferrer = $q.defer();
            $http.get(`http://localhost:3000/${tablename}/${field}/${value}`).then(function(res){
                deferrer.resolve(res);
            }, function(res){
                deferrer.reject(res);
            })
            return deferrer.promise;
        },
        update: function(tablename, id, data){
            let deferrer = $q.defer();
            $http.patch(`http://localhost:3000/${tablename}/${id}`, data).then(function(res){
                deferrer.resolve(res);
            }, function(res){
                deferrer.reject(res);
            })
            return deferrer.promise;
        },
        delete: function(tablename, id){
            let deferrer = $q.defer();
            $http.delete(`http://localhost:3000/${tablename}/${id}`).then(function(res){
                deferrer.resolve(res);
            }, function(res){
                deferrer.reject(res);
            })
            return deferrer.promise
        }
    }
})