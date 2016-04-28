app.controller('pOrderController', function($scope, Company, Branch, Order) {
    // Temporal
    var idProvider = 4;
    $scope.companyList = [];
    $scope.branchList = [];
    $scope.orderList = [];

    $scope.branchSelectVisible = false;
    Company.getByProvider(idProvider)
        .then(function(res) {
            $scope.companyList = res.data;
            $scope.company = $scope.companyList[0];
        });

    Order.getPendingByProvider(idProvider)
        .then(function(res) {
            $scope.orderList = res.data;
        })

    $scope.changeCompany = function(company) {
        if (company.emp_idempresa != 0) {
            $scope.branchSelectVisible = true;
            Branch.getByCompany(company.emp_idempresa)
                .then(function(res) {
                    $scope.branchList = res.data;
                    $scope.branch = $scope.branchList[0];
                })
        } else {
            $scope.branchSelectVisible = false;
        }
    }

    $scope.changeBranch = function(branch) {
        console.log(branch)
    }

});
