
app.factory("Company", function($http) {
  var url = "/api/empresa/"
    return {
        getByProvider: function(idProveedor) {
            return $http.get(url + 'list/' + idProveedor);
        }
    }
});
