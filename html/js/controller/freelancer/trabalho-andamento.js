app.controller("FreelancerTrabalhoAndamentoController", function($scope, $location, $window, store, jwtHelper, TrabalhoFreelancerService) {
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
    
    
    $scope.concluirTrabalho = function(id) {

        $scope.dataFreelancerTrabalhoAndamento.loading += 1;
        
        $scope.params = {
            trabalho: id,
            situacao: 2
        };

        var resposta = TrabalhoFreelancerService.conclui($scope.params);
        resposta.then(function(data) {
            if (data.resultado == true) {

                $window.location.reload();
            }
            else {
                $scope.dataFreelancerTrabalhoAndamento.erro.mensagem = "Erro na Conclusão: " + data.mensagem;

            }
        });
    };
})