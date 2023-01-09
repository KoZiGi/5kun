app.factory('db', function($http, $q){
    return {
        login: function(data){
            let deferrer = $q.defer();
            $http.post('http://localhost:3000/api/log', data).then(function(res){
                deferrer.resolve(res);
            }, function(res){
                deferrer.reject(res);
            });
            return deferrer.promise;
        },
        insert: function(tablename,data){
            let deferrer = $q.defer();
            $http.post(`http://localhost:3000/api/${tablename}`, data).then(function(res){
                deferrer.resolve(res);
            }, function(res){
                deferrer.reject(res);
            });
            return deferrer.promise;
        },
        selectAll: function(tablename){
            let deferrer = $q.defer();
            $http.get(`http://localhost:3000/api/${tablename}`).then(function(res){
                deferrer.resolve(res);
            },function(res){
                deferrer.reject(res);
            })
            return deferrer.promise;
        },
        select:function(tablename, field, value){
            let deferrer = $q.defer();
            $http.get(`http://localhost:3000/api/${tablename}/${field}/${value}`).then(function(res){
                deferrer.resolve(res);
            }, function(res){
                deferrer.reject(res);
            })
            return deferrer.promise;
        },
        update: function(tablename, field, value, data){
            let deferrer = $q.defer();
            $http.patch(`http://localhost:3000/api/${tablename}/${field}/${value}`, data).then(function(res){
                deferrer.resolve(res);
            }, function(res){
                deferrer.reject(res);
            })
            return deferrer.promise;
        },
        deleteFile: function(filename){
            let deferrer = $q.defer();
            $http.delete(`http://localhost:3000/file/${filename}`).then(function(res){
                deferrer.resolve(res);
            }, function(res){
                deferrer.reject(res);
            })
            return deferrer.promise
        },
        delete: function(tablename, id){
            let deferrer = $q.defer();
            $http.delete(`http://localhost:3000/api/${tablename}/${id}`).then(function(res){
                deferrer.resolve(res);
            }, function(res){
                deferrer.reject(res);
            })
            return deferrer.promise
        }
    }
})