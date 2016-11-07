app.controller("ClienteTrabalhoAnaliseController", function($scope, $location, store, jwtHelper, TrabalhoClienteService, toastr) {
    $scope.dataClienteTrabalhoAnalise = {
        loading: 0,
        dados: []
    };

    $scope.dataClienteTrabalhoAnalise.loading += 1;
    TrabalhoClienteService.getAnalise().then(function(data) {
        if (data.trabalhos) {
            $scope.dataClienteTrabalhoAnalise.dados = data.trabalhos;
            $scope.dataClienteTrabalhoAnalise.loading -= 1;
        }
        else {
            $scope.dataClienteTrabalhoAnalise.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
        }
    });

    $scope.concluirTrabalho = function(trabalho) {


        var r = confirm("Você deseja mesmo concluir?");

        if (r == true) {

            $scope.params = {
                trabalho: trabalho.id,
                situacao: 3
            };

            var resposta = TrabalhoClienteService.conclui($scope.params);
            resposta.then(function(data) {
                if (data.resultado == true) {

                    var index = $scope.dataClienteTrabalhoAnalise.dados.indexOf(trabalho);
                    $scope.dataClienteTrabalhoAnalise.dados.splice(index, 1);
                    toastr.success("Concluido com sucesso");
                }
                else {
                    $scope.dataClienteTrabalhoAnalise.erro.mensagem = "Erro na Conclusão: " + data.mensagem;
                    toastr.error("Error");
                }
            });

        }
    };
})
