
app.factory("Branch", function($http) {
  var url = "api/sucursal/"
    return {
        getByCompany: function(idCompany) {
            return $http.get(url + 'list/' + idCompany);
        }
    }
});
