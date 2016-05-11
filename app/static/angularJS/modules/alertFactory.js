app.factory("Alert", function($http) {
  var url = "/api/alerta/"
    return {
        getAlerts: function(rfc) {
            return $http.get(url + 'list/'+rfc);
        }
    }
});
