
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
        }

    }
});
