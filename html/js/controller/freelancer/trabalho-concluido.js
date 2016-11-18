app.controller("FreelancerTrabalhoConcluidoController", function($scope, $location, store, jwtHelper, TrabalhoFreelancerService) {
    $scope.dataFreelancerTrabalhoConcluido = {
        loading: 0,
        dados: []
    };

    $scope.pesquisarConcluido = function() {

        $scope.filtro = {
            situacao: 4
        };

        $scope.dataFreelancerTrabalhoConcluido.loading += 1;
        TrabalhoFreelancerService.getTrabalhos($scope.filtro).then(function(data) {
            if (data.trabalhos) {
                $scope.dataFreelancerTrabalhoConcluido.dados = data.trabalhos;
                $scope.dataFreelancerTrabalhoConcluido.loading -= 1;
            }
            else {
                $scope.dataFreelancerTrabalhoConcluido.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            }
        });
    };

    $scope.pesquisarConcluido();
})