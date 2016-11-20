app.controller("FreelancerTrabalhoAnaliseController", function($scope, $location, $window, store, jwtHelper, TrabalhoFreelancerService, toastr, ModalService) {
    $scope.dataFreelancerTrabalhoAnalise = {
        loading: 0,
        dados: [],
        erro: {
            mensagem: null
        }
    };


     $scope.pesquisarAnalise = function() {

        $scope.filtro = {
            situacao: 3
        };

        $scope.dataFreelancerTrabalhoAnalise.loading += 1;
        TrabalhoFreelancerService.getTrabalhos($scope.filtro).then(function(data) {
            if (data.trabalhos) {
                $scope.dataFreelancerTrabalhoAnalise.dados = data.trabalhos;
                $scope.dataFreelancerTrabalhoAnalise.loading -= 1;
            }
            else {
                $scope.dataFreelancerTrabalhoAnalise.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            }
        });
    };

    $scope.pesquisarAnalise();
    
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

})


