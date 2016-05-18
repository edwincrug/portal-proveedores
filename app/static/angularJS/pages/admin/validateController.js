app.controller('validateController', function($scope, $state, $location, User, AlertFactory) {
    if ($location.search().token && $location.search().rfc) {
        User.validate($location.search().rfc, $location.search().token).then(function(data) {
            data = data.data[0]
            console.log(data)
            if (data.estatus === "ok") {
                User.activate($location.search().rfc, $location.search().token, 1).then(function(data) {
                    data = data.data[0]
                    if (data.estatus === "ok") {
                        AlertFactory.success(data.mensaje)
                        $state.go("login")
                    } else {
                        AlertFactory.error(data.mensaje)
                    }
                })
            } else {
                AlertFactory.error(data.mensaje)
                $("#activatingMsg").text(data.mensaje)
            }
        })
    } else {
        AlertFactory.error("Url invalida")
        $("#activatingMsg").text("Url invalida")
    }
})
