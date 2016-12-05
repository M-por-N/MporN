app.controller("IncluirQuadroController", function($scope, $location, store, jwtHelper, QuadroService, toastr) {
    $scope.dataAdmin = {
        erro: {
            mensagem: null
        },
        loading: 0,
        data: {}
    };

    $scope.incluir = function(quadro) {

        $scope.dataAdmin.loading += 1;
        var resposta = QuadroService.setQuadro(quadro);
        resposta.then(function(data) {
            if (data.resultado == true) {
                $scope.dataAdmin.loading -= 1;
                $location.path('/admin/quadro');
                toastr.success("Incluído com sucesso!");
            }
            else {
                $scope.dataAdmin.erro.mensagem = "Erro no Cadastro: " + data.mensagem;
                $scope.dataAdmin.loading -= 1;
            }
        });
    };

})
