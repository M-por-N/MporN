app.controller("ListarPlanoController", function($scope, $location, store, jwtHelper, ListarService, AdminService, toastr, SweetAlert, ModalService) {
    $scope.dataListarPlano = {
        loading: 0,
        erro: {
            mensagem: null
        },
        dados: []
    };
    $scope.dataPlanoBloquear = {
        loading: 0,
        erro: {
            mensagem: null
        },
        dados: []
    };

    $scope.listarPlano = function() {
        $scope.dataListarPlano.loading += 1;
        ListarService.listarPlano().then(function(data) {
            if (data) {
                $scope.dataListarPlano.dados = data.plano;

                $scope.dataListarPlano.loading = 0;
            }
            else {
                $scope.dataListarPlano.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
                $scope.dataListarPlano.loading -= 1;
            }
        });
    }

    $scope.listarPlano();
    
    
    $scope.editarPlano = function(plano) {

        ModalService.showModal({
            templateUrl: "views/modal/editarPlanoModal.html",
            controller: "EditarPlanoController",
            inputs: {
                plano: plano
            }
        }).then(function(modal) {

            modal.element.modal();
            modal.close.then(function(result) {

                $scope.listarPlano();

            });
        });

    };


})
