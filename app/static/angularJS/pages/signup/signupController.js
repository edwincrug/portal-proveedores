app.controller('signupController', function($scope, User) {
    $scope.razon = ""
    $scope.email = ""
    $scope.rfc = ""
    $scope.pass = ""


    $scope.submit = function() {
        User.signup($scope.razon, $scope.email, $scope.rfc, $scope.pass)
            .success(function(data, status, headers, config) {
                console.log(data)
                    /*if (data.token) {
                User.saveToken(data.token);
                $state.go("admin.content");
            }*/
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
