app.controller('signupController', function($scope, User, AlertFactory, $state) {
    $scope.razon = ""
    $scope.email = ""
    $scope.rfc = ""
    $scope.pass = ""

    $scope.submit = function() {
        User.signup($scope.razon, $scope.email, $scope.rfc.toUpperCase(), $scope.pass)
            .then(function(data) {
                data[0].mensaje = decodeURIComponent(data[0].mensaje)
                if (data[0].estatus == "ok") {
                    AlertFactory.successTopFull(data[0].mensaje)
                    $state.go("login")
                } else {
                    AlertFactory.error(data[0].mensaje)
                }
            },function(err){
              console.log(err)
            })
    }

    var password = document.getElementById("pass"),
        confirm_password = document.getElementById("passConfirm");

    function validatePassword() {
        if (password.value != confirm_password.value) {
            confirm_password.setCustomValidity("La contraseña no coincide");
        } else {
            confirm_password.setCustomValidity('');
        }
    }
    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;
    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });


});
