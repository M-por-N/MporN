app.controller("ListarClienteController", function($scope, $location, store, jwtHelper, ListarService, AdminService, toastr, SweetAlert, ModalService) {
    $scope.dataListarCliente = {
        loading: 0,
        erro: {
            mensagem: null
        },
        dados: []
    };
    $scope.dataClienteBloquear = {
        loading: 0,
        erro: {
            mensagem: null
        },
        dados: []
    };

    $scope.pesquisarCliente = function() {
        $scope.dataListarCliente.loading += 1;
        ListarService.listarCliente().then(function(data) {
            if (data) {
                $scope.dataListarCliente.dados = data.cliente;

                $scope.dataListarCliente.loading = 0;
            }
            else {
                $scope.dataListarCliente.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
                $scope.dataListarCliente.loading -= 1;
            }
        });
    };
    
    $scope.pesquisarCliente();
    
    $scope.editarCliente = function(admin) {

        ModalService.showModal({
            templateUrl: "views/modal/editarModal.html",
            controller: "EditarClienteController",
            inputs: {
                usuario: admin
            }
        }).then(function(modal) {

            
            
            modal.element.modal();
            modal.close.then(function(result) {
                $scope.pesquisarCliente();
            });
        });

    };
})
