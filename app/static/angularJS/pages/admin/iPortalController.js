app.controller('iPortalController', function($scope, $stateParams, $filter, Company, Branch, Order, File, User) {
    $scope.companyList = [];
    $scope.branchList = [];
    $scope.orderList = [];
    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;
    $scope.branchSelectVisible = false;
    $scope.visible = false;
    var totalElements;
    //Order
    $scope.orderDate = "";
    $scope.orderDateValid = "";
    $scope.orderImport = "";
    $scope.currentUser;

    $scope.changeOrderDate = function() {
        if ($scope.orderDate == "") {
            $scope.orderDate = "asc";
        } else if ($scope.orderDate == "asc") {
            $scope.orderDate = "desc";
        } else if ($scope.orderDate == "desc") {
            $scope.orderDate = "asc";
        }
        orderArrayList("fecha_factura", $scope.orderDate, true)
    }

    $scope.changeOrderDateValid = function() {
        if ($scope.orderDateValid == "") {
            $scope.orderDateValid = "asc";
        } else if ($scope.orderDateValid == "asc") {
            $scope.orderDateValid = "desc";
        } else if ($scope.orderDateValid == "desc") {
            $scope.orderDateValid = "asc";
        }
        orderArrayList("fechaValidacion", $scope.orderDateValid, true)
    }

    $scope.changeOrderImport = function() {
        if ($scope.orderImport == "") {
            $scope.orderImport = "asc";
        } else if ($scope.orderImport == "asc") {
            $scope.orderImport = "desc";
        } else if ($scope.orderImport == "desc") {
            $scope.orderImport = "asc";
        }
        orderArrayList("oce_importetotal", $scope.orderImport, false)
    }

    function orderArrayList(field, order, date) {

        $scope.orderList.sort(function(a, b) {
            if (date) {
                a[field] = new Date(a[field]).getTime();
                b[field] = new Date(b[field]).getTime();

            }
            if (order == "asc") {
                return a[field] - b[field]
            } else if (order == "desc") {
                return b[field] - a[field]
            }
        })
    }

    User.me().then(function(data) {
        $scope.idProvider = data.data.ppro_userId;
        $scope.currentUser = data.data;
        Order.getEnterByProvider($scope.idProvider, $scope.currentUser.rfc, $scope.currentUser.ppro_idUserRol)
            .then(function(res) {
                $scope.orderList = res.data;
                totalElements = $scope.orderList.length;
                $scope.visible = true;
            })

        Company.getByProvider($scope.idProvider, $scope.currentUser.rfc, $scope.currentUser.ppro_idUserRol)
            .then(function(res) {
                $scope.companyList = res.data;
                $scope.company = $scope.companyList[0];
            });
    })

    $scope.changeCompany = function(company) {
        if (company.emp_idempresa != 0) {
            $scope.branchSelectVisible = true;
            Branch.getByCompany(company.emp_idempresa, $scope.currentUser.rfc, $scope.currentUser.ppro_idUserRol)
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
        File.order = {
            provider: $scope.idProvider,
            rfc: $scope.currentUser.rfc,
            folio: order.oce_folioorden,
            idRol: $scope.currentUser.ppro_idUserRol
        };
    }

    function filterApply() {
        totalElements = $filter('filter')($filter('branch')(($filter('company')($scope.orderList, $scope.company)), $scope.branch), $scope.order).length;
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
