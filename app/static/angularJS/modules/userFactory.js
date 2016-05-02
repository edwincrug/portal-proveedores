app.factory("User", function($http) {
    var url = "api/usuario/"
    return {
        login: function(rfc, pass) {
            return $http.post(url + 'entrar/', {
                rfc: rfc,
                pass: pass
            });
        }
    }
});
