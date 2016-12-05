app.controller("ListarTrabalhoController", function($scope, $location, store, jwtHelper, ListarService, toastr, ModalService) {
    $scope.dataListarTrabalho = {
        loading: 0,
        erro: {
            mensagem: null
        },
        dados: []
    };

    $scope.listarTrabalho = function() {
        $scope.dataListarTrabalho.loading += 1;
        ListarService.listarTrabalho().then(function(data) {
            if (data) {
                $scope.dataListarTrabalho.dados = data.trabalho;

                $scope.dataListarTrabalho.loading = 0;
            }
            else {
                $scope.dataListarTrabalho.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
                $scope.dataListarTrabalho.loading -= 1;
            }
        });
    }

    $scope.listarTrabalho();
    
    
    $scope.editarTrabalho = function(trabalho) {

        ModalService.showModal({
            templateUrl: "views/modal/editarTrabalhoModal.html",
            controller: "EditarTrabalhoController",
            inputs: {
                trabalho: trabalho
            }
        }).then(function(modal) {

            modal.element.modal();
            modal.close.then(function(result) {

                $scope.listarTrabalho();

            });
        });

    };


})
