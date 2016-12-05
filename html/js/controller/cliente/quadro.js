app.controller("QuadroClienteController", function($scope, $location, $window, store, jwtHelper, QuadroService) {
    $scope.dataCliente = {
        loading: 0,
        dados: []
    };

    $scope.listarQuadro = function() {

        $scope.dataCliente.loading += 1;
        QuadroService.getCliente().then(function(data) {
            if (data) {
                $scope.dataCliente.dados = data;
                $scope.dataCliente.loading -= 1;
            }
            else {
                $scope.dataCliente.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            }
        });
    };

    $scope.listarQuadro();


})
