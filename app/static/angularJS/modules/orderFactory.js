app.factory("Order", function($http) {
    var url = "/api/orden/"
    return {
        getPendingByProvider: function(idProvider) {
            return $http.get(url + 'pendientes/' + idProvider);
        },
        getEnterByProvider: function(idProvider) {
            return $http.get(url + 'ingresadas/' + idProvider);
        },
        getPaidByProvider: function(idProvider) {
            return $http.get(url + 'pagadas/' + idProvider);
        },
        pendingSeen: function(idOrder) {
            return $http.post(url + 'pendientevista/', {
                idOrder: idOrder
            });
        },
        getDocuments: function(idOrder) {
            return $http.get(url + 'documentos/'+idOrder, {
                idOrder: idOrder
            });
        }

    }
});
