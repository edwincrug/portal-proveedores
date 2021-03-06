app.controller('pOrderController', function($scope, $stateParams, $filter, User, Company, Branch, Order, File) {
    $scope.companyList = [];
    $scope.branchList = [];
    $scope.orderList = [];
    $scope.itemsPerPage = 5;
    $scope.currentPage = 0;
    $scope.branchSelectVisible = false;
    $scope.visible = false;
    //Order
    $scope.orderDate = "";
    $scope.orderImport = "";
    $scope.orderName = "";
    $scope.orderDetail = "";
    $scope.currentUser;


    $scope.changeOrderDate = function() {
        if ($scope.orderDate == "") {
            $scope.orderDate = "asc";
        } else if ($scope.orderDate == "asc") {
            $scope.orderDate = "desc";
        } else if ($scope.orderDate == "desc") {
            $scope.orderDate = "asc";
        }
        orderArrayList("oce_fechaorden", $scope.orderDate, true)
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

    $scope.changeOrderName = function() {
        if ($scope.orderName == "") {
            $scope.orderName = "asc";
        } else if ($scope.orderName == "asc") {
            $scope.orderName = "desc";
        } else if ($scope.orderName == "desc") {
            $scope.orderName = "asc";
        }
        orderArrayList("oce_folioorden", $scope.orderName, false,true)
    }

    $scope.changeOrderDetail = function() {
        if ($scope.orderDetail == "") {
            $scope.orderDetail = "asc";
        } else if ($scope.orderDetail == "asc") {
            $scope.orderDetail = "desc";
        } else if ($scope.orderDetail == "desc") {
            $scope.orderDetail = "asc";
        }
        orderArrayList(["emp_nombre","suc_nombre","dep_nombre"], $scope.orderDetail, false,true)
    }


    function orderArrayList(field, order, date,string) {

        $scope.orderList.sort(function(a, b) {
            if (date) {
                a[field] = new Date(a[field]).getTime();
                b[field] = new Date(b[field]).getTime();
            }
            if(string){
              var x="",y="";
              if(Array.isArray(field)){
                  x = field.reduce(function(ant,sig){
                      return ant + " "+ a[sig];
                  },"")
                  y = field.reduce(function(ant,sig){
                      return ant + " "+ b[sig];
                  },"")
              }else{
                  x =  a[field]
                  y =  b[field]
              }
              if (order == "asc") {
                return  x >= y ? -1 : 1
              } else if (order == "desc") {
                return  y >= x ? -1 : 1
              }
            }else{
              if (order == "asc") {
                  return a[field] - b[field]
              } else if (order == "desc") {
                  return b[field] - a[field]
              }
            }

        })
    }

    var totalElements;
    User.me().then(function(data) {
        $scope.idProvider = data.data.ppro_userId
        $scope.currentUser = data.data;

        Order.getPendingByProvider($scope.idProvider,$scope.currentUser.rfc,$scope.currentUser.ppro_idUserRol)
            .then(function(res) {
                $scope.orderList = res.data;
                totalElements = $scope.orderList.length;
                $scope.visible = true;
            })

        Company.getByProvider($scope.idProvider,$scope.currentUser.rfc,$scope.currentUser.ppro_idUserRol)
            .then(function(res) {
                $scope.companyList = res.data;
                $scope.company = $scope.companyList[0];
            });

    })
    $scope.changeCompany = function(company) {
        if (company.emp_idempresa != 0) {
            $scope.branchSelectVisible = true;
            Branch.getByCompany(company.emp_idempresa,$scope.currentUser.rfc
              ,$scope.currentUser.ppro_idUserRol,$scope.idProvider)
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
        Order.pendingSeen(order.oce_folioorden).then(function(data) {
            $scope.orderList.forEach(function(o, i) {
                if (o.oce_folioorden === order.oce_folioorden) {
                    $scope.orderList[i].visto = 2;
                }
            })
        })

        File.order = {
            provider: $scope.idProvider,
            rfc: $scope.currentUser.rfc,
            rfcProvider: order.per_rfc,
            folio: order.oce_folioorden,
            idRol: $scope.currentUser.ppro_idUserRol,
            incomplete: order.incomplete
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
