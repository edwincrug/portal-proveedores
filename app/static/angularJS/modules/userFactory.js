app.factory("User", function($http,$cookies) {
    var url = "api/usuario/"
    return {
        login: function(rfc, pass) {
            return $http.post(url + 'entrar/', {
                rfc: rfc,
                pass: pass
            });
        },
        me: function() {
          return $http.get(url + 'me/');
        },
        saveToken: function(token) {
            $cookies.put('andrade-token', token);
        },
        getToken: function() {
            return $cookies.get('andrade-token')
        }
    }
});
