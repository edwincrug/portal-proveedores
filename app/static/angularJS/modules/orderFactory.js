
app.factory("Order", function($http) {
  var url = "api/orden/"
    return {
        getPendingByProvider: function(idProvider) {
            return $http.get(url + 'pendientes/' + idProvider);
        }
    }
});
