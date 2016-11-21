app.controller("FreelancerTrabalhoConcluidoController", function($scope, $location, store, jwtHelper, TrabalhoFreelancerService, ModalService) {
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

    $scope.mensagem = function(trabalho) {

        ModalService.showModal({
            templateUrl: "views/mensagem/mensagemModal.html",
            controller: "ListarMensagemController",
            inputs:{
                trabalho: trabalho,
                idt: 'F'
            }
        }).then(function(modal) {

            modal.element.modal();
            modal.close.then(function(result) {
            
            });
        });

    };
    
    $scope.pesquisarConcluido();
})