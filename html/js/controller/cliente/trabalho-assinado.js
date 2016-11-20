app.controller("ClienteTrabalhoAssinadoController", function($scope, $location, store, jwtHelper, TrabalhoClienteService, toastr, ModalService) {
    $scope.dataClienteTrabalhoAssinado = {
        loading: 0,
        dados: []
    };

    $scope.pesquisarAssinado = function() {

        $scope.filtro = {
            situacao: 2
        };

        $scope.dataClienteTrabalhoAssinado.loading += 1;
        TrabalhoClienteService.getTrabalhos($scope.filtro).then(function(data) {
            if (data.trabalhos) {
                $scope.dataClienteTrabalhoAssinado.dados = data.trabalhos;
                $scope.dataClienteTrabalhoAssinado.loading -= 1;
            }
            else {
                $scope.dataClienteTrabalhoAssinado.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            }
        });
    };

    $scope.pesquisarAssinado();
    
    
    $scope.mensagem = function(trabalho) {

        ModalService.showModal({
            templateUrl: "views/mensagem/mensagemModal.html",
            controller: "ListarMensagemController",
            inputs:{
                trabalho: trabalho,
                idt: 'C'
            }
        }).then(function(modal) {

            modal.element.modal();
            modal.close.then(function(result) {
            
            });
        });

    };
    
})