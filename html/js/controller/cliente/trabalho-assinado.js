app.controller("ClienteTrabalhoAssinadoController", function($scope, $location, store, jwtHelper, TrabalhoClienteService, toastr) {
    $scope.dataClienteTrabalhoAssinado = {
        loading: 0,
        dados: []
    };

    $scope.pesquisarAssinado = function() {

        $scope.filtro = {
            situacao: 2
        };

        $scope.dataClienteTrabalhoAssinado.loading += 1;
        TrabalhoClienteService.getTrabalhos($scope.filtro).then(function(data) {
            if (data.trabalhos) {
                $scope.dataClienteTrabalhoAssinado.dados = data.trabalhos;
                $scope.dataClienteTrabalhoAssinado.loading -= 1;
            }
            else {
                $scope.dataClienteTrabalhoAssinado.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            }
        });
    };

    $scope.pesquisarAssinado();
    
})