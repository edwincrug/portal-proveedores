app.controller('pOrderController', function($scope, $stateParams, $filter, User, Company, Branch, Order, File) {
    $scope.companyList = [];
    $scope.branchList = [];
    $scope.orderList = [];
    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;
    $scope.branchSelectVisible = false;
    $scope.visible = false;
    var totalElements;
    User.me().then(function(data) {
        $scope.idProvider = data.data.ppro_userId
        Order.getPendingByProvider($scope.idProvider)
            .then(function(res) {
                $scope.orderList = res.data;
                totalElements = $scope.orderList.length;
                $scope.visible = true;
            })

        Company.getByProvider($scope.idProvider)
            .then(function(res) {
                $scope.companyList = res.data;
                $scope.company = $scope.companyList[0];
            });

    })
    $scope.changeCompany = function(company) {
        if (company.emp_idempresa != 0) {
            $scope.branchSelectVisible = true;
            Branch.getByCompany(company.emp_idempresa)
                .then(function(res) {
                    $scope.branchList = res.data;
                    $scope.branch = $scope.branchList[0];
                    filterApply()
                })
        } else {
            filterApply()
            $scope.branchSelectVisible = false;
            $scope.branch = null;
        }
    }

    $scope.changeBranch = function(branch) {
        filterApply();
    }

    $scope.changeOrder = function(branch) {
        filterApply();
    }

    $scope.uploadinvoice = function(order) {
      Order.pendingSeen(order.oce_folioorden).then(function(data){
          $scope.orderList.forEach(function(o,i){
            if(o.oce_folioorden === order.oce_folioorden){
              $scope.orderList[i].visto = 2;
            }
          })
      })

        File.order = {
            provider: $scope.idProvider,
            rfc: order.per_rfc,
            folio: order.oce_folioorden
        };
    }



    function filterApply() {
        totalElements = $filter('order')($filter('branch')(($filter('company')($scope.orderList, $scope.company)), $scope.branch), $scope.order).length;
        $scope.currentPage = 0;
    }
    //Pagination
    $scope.range = function() {
        var rangeSize = 5;
        var ret = [];
        var start;
        if ($scope.currentPage - 2 >= 0) {
            start = $scope.currentPage - 2;
        } else {
            start = 0;
        }
        if (start > $scope.pageCount() - rangeSize) {
            start = $scope.pageCount() - rangeSize + 1;
        }

        for (var i = start; i < start + rangeSize; i++) {
            if (i >= 0)
                ret.push(i);
        }
        return ret;
    };

    $scope.prevPage = function() {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.prevPageDisabled = function() {
        return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.pageCount = function() {
        return Math.ceil(totalElements / $scope.itemsPerPage) - 1;
    };

    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pageCount()) {
            $scope.currentPage++;
        }
    };

    $scope.nextPageDisabled = function() {
        return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
    };

    $scope.setPage = function(n) {
        $scope.currentPage = n;
    };

});
