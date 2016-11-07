app.controller("ClienteTrabalhoAbertoController", function($scope, $location, $window, store, jwtHelper, TrabalhoClienteService, toastr) {
    $scope.dataClienteTrabalhoAberto = {
        loading: 0,
        dados: [],
        erro: {
            mensagem: null
        }
    };

    $scope.dataClienteTrabalhoAberto.loading += 1;
    TrabalhoClienteService.getAbertos().then(function(data) {
        if (data.trabalhos) {
            $scope.dataClienteTrabalhoAberto.dados = data.trabalhos;
            $scope.dataClienteTrabalhoAberto.loading = 0;
        }
        else {
            $scope.dataClienteTrabalhoAberto.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
        }
    });

    $scope.removerTrabalho = function(trabalho) {

        var r = confirm("Você deseja mesmo remover?");

        if (r == true) {


            $scope.params = {
                trabalho: trabalho.id
            };

            var resposta = TrabalhoClienteService.removerTrabalho($scope.params);
            resposta.then(function(data) {
                if (data.resultado == true) {

                    var index = $scope.dataClienteTrabalhoAberto.dados.indexOf(trabalho);
                    $scope.dataClienteTrabalhoAberto.dados.splice(index, 1);
                    toastr.success("Trabalho removido com sucesso");
                }
                else {
                    $scope.dataClienteTrabalhoAberto.erro.mensagem = "Erro no Remover: " + data.mensagem;
                    toastr.error("Error");
                }
            });

        }
    };
})
