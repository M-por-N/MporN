app.controller("FreelancerTrabalhoDisponivelController", function($scope, $location, $window, store, jwtHelper, TrabalhoFreelancerService) {
    $scope.dataFreelancerTrabalhoDisponivel = {
        loading: 0,
        dados: [],
        erro: {
            mensagem: null
        }
    };

    $scope.params = [];

    $scope.dataFreelancerTrabalhoDisponivel.loading += 1;
    TrabalhoFreelancerService.getDisponiveis().then(function(data) {
        if (data.trabalhos) {
            $scope.dataFreelancerTrabalhoDisponivel.dados = data.trabalhos;
            $scope.dataFreelancerTrabalhoDisponivel.loading = 0;
        }
        else {
            $scope.dataFreelancerTrabalhoDisponivel.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
        }
    });

    $scope.associarTrabalho = function(id) {

        $scope.dataFreelancerTrabalhoDisponivel.loading += 1;
        
        $scope.params = {
            trabalho: id,
            situacao: 1
        };

        var resposta = TrabalhoFreelancerService.altera($scope.params);
        resposta.then(function(data) {
            if (data.resultado == true) {

                $window.location.reload();
            }
            else {
                $scope.dataFreelancerTrabalhoDisponivel.erro.mensagem = "Erro na Associação: " + data.mensagem;

            }
        });
    };
})
