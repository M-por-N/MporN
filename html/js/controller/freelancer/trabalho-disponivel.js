app.controller("FreelancerTrabalhoDisponivelController", function($scope, $location, $window, store, jwtHelper, TrabalhoFreelancerService, toastr) {
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

    $scope.associarTrabalho = function(trabalho) {

     
        
        $scope.params = {
            trabalho: trabalho.id,
            situacao: 1
        };

        var resposta = TrabalhoFreelancerService.altera($scope.params);
        resposta.then(function(data) {
            if (data.resultado == true) {

                var index = $scope.dataFreelancerTrabalhoDisponivel.dados.indexOf(trabalho);
                $scope.dataFreelancerTrabalhoDisponivel.dados.splice(index, 1);  
                toastr.success("Associado com sucesso");

            }
            else {
                $scope.dataFreelancerTrabalhoDisponivel.erro.mensagem = "Erro na Associação: " + data.mensagem;
                toastr.error("Error - Favor entrar em contato");
            }
        });
    };
})



