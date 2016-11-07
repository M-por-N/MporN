app.controller("FreelancerTrabalhoAndamentoController", function($scope, $location, $window, store, jwtHelper, TrabalhoFreelancerService, toastr) {
    $scope.dataFreelancerTrabalhoAndamento = {
        loading: 0,
        dados: [],
        erro: {
            mensagem: null
        }
    };

    $scope.dataFreelancerTrabalhoAndamento.loading += 1;
    TrabalhoFreelancerService.getAndamento().then(function(data) {
        if (data.trabalhos) {
            $scope.dataFreelancerTrabalhoAndamento.dados = data.trabalhos
            $scope.dataFreelancerTrabalhoAndamento.loading = 0;
        }
        else {
            $scope.dataFreelancerTrabalhoAndamento.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
        }
    });


    $scope.concluirTrabalho = function(trabalho) {

        var r = confirm("Você deseja mesmo concluir?");

        if (r == true) {

            $scope.params = {
                trabalho: trabalho.id,
                situacao: 2
            };

            var resposta = TrabalhoFreelancerService.conclui($scope.params);
            resposta.then(function(data) {
                if (data.resultado == true) {

                    var index = $scope.dataFreelancerTrabalhoAndamento.dados.indexOf(trabalho);
                    $scope.dataFreelancerTrabalhoAndamento.dados.splice(index, 1);
                    toastr.success("Concluido com sucesso");
                }
                else {
                    $scope.dataFreelancerTrabalhoAndamento.erro.mensagem = "Erro na Conclusão: " + data.mensagem;
                    toastr.error("Error");
                }
            });

        }
    };
})
