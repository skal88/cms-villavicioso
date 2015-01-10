var myApp = angular.module('myApp', [])



.factory("gastosFactory", ['$http', function($http){
	var urlBase = '/api/gastos';
    var gastosFactory = {};

    gastosFactory.getGastos = function () {
        return $http.get(urlBase);
    };

    gastosFactory.getGasto = function (id) {
        return $http.get(urlBase + '/' + id);
    };

    gastosFactory.insertGasto = function (cust) {
        return $http.post(urlBase, cust);
    };

    gastosFactory.updateGasto = function (cust) {
        return $http.put(urlBase + '/' + cust.ID, cust)
    };

    gastosFactory.deleteGasto = function (id) {
        return $http.delete(urlBase + '/' + id);
    };

    gastosFactory.getOrders = function (id) {
        return $http.get(urlBase + '/' + id + '/orders');
    };

    return gastosFactory;
}])

.controller('gastosCtrl', ['$scope', 'gastosFactory', 
        function ($scope, gastosFactory) {

    $scope.status;
    $scope.gastos;
    $scope.orders;

    getCustomers();

    function getCustomers() {
        gastosFactory.getGastos()
            .success(function (data) {
                $scope.gastos = data;
            })
            .error(function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
            });
    }

    $scope.updateGasto = function (id) {
        var gasto;
        for (var i = 0; i < $scope.gastos.length; i++) {
            var currGasto = $scope.gastos[i];
            if (currGasto._id === id) {
                gasto = currGasto;
                break;
            }
        }

        gastosFactory.updateGastos(gasto)
          .success(function () {
              $scope.status = 'Updated Customer! Refreshing customer list.';
          })
          .error(function (error) {
              $scope.status = 'Unable to update customer: ' + error.message;
          });
    };

    $scope.insertGasto = function (obj) {
        //Fake customer data
        var obj = {
            title: $scope.title,
        };
        gastosFactory.insertGasto(obj)
            .success(function (data) {
                $scope.status = 'Inserted Customer! Refreshing customer list.';
                $scope.gastos.push(data);
            }).
            error(function(error) {
                $scope.status = 'Unable to insert customer: ' + error.message;
            });
    };

    $scope.deleteGasto = function (id) {
        gastosFactory.deleteGasto(id)
        .success(function () {
            $scope.status = 'Deleted Customer! Refreshing customer list.';
            for (var i = 0; i < $scope.gastos.length; i++) {
                var cust = $scope.gastos[i];
                if (cust._id === id) {
                    $scope.gastos.splice(i, 1);
                    break;
                }
            }
            //$scope.orders = null;
        })
        .error(function (error) {
            $scope.status = 'Unable to delete customer: ' + error.message;
        });
    };

    /*$scope.getCustomerOrders = function (id) {
        dataFactory.getOrders(id)
        .success(function (orders) {
            $scope.status = 'Retrieved orders!';
            $scope.orders = orders;
        })
        .error(function (error) {
            $scope.status = 'Error retrieving customers! ' + error.message;
        });
    };*/
}]);