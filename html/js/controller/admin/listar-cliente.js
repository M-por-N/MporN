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
    
  
    $scope.dataListarCliente.loading += 1;
    ListarService.listarCliente().then(function(data) {
        if (data) {
            $scope.dataListarCliente.dados = data.cliente;
            
            $scope.dataListarCliente.loading = 0;
        } else {
            $scope.dataListarCliente.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            $scope.dataListarCliente.loading -= 1;
        }
    });
    
    $scope.bloqueiaCliente = function(cliente) {
         SweetAlert.swal({
            title: "Você tem certeza?",
            text: "Você irá bloquear o cliente '" + cliente.nome + "'. Tem certeza?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, bloquear agora!",
            cancelButtonText: "Cancelar"
        }).then(function() {

            $scope.dataClienteBloquear.loading += 1;
            var resposta = AdminService.bloqueiaCliente(cliente);
            resposta.then(function(data) {
                if (data.resultado == true) {
                    $scope.dataClienteBloquear.loading -= 1;
                    $location.path('/admin/listar-cliente');
                    toastr.success("Bloqueado com sucesso!");
                }
                else {
                    $scope.dataClienteBloquear.erro.mensagem = "Erro no Bloqueio: " + data.mensagem;
                    $scope.dataClienteBloquear.loading -= 1;
                }
            });
        });
    };
    
    $scope.desbloqueiaCliente = function(cliente) {
         SweetAlert.swal({
            title: "Você tem certeza?",
            text: "Você irá desbloquear o cliente '" + cliente.nome + "'. Tem certeza?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, desbloquear agora!",
            cancelButtonText: "Cancelar"
        }).then(function() {

            $scope.dataClienteBloquear.loading += 1;
            var resposta = AdminService.desbloqueiaCliente(cliente);
            resposta.then(function(data) {
                if (data.resultado == true) {
                    $scope.dataClienteBloquear.loading -= 1;
                    $location.path('/admin/listar-cliente');
                    toastr.success("Desbloqueado com sucesso!");
                }
                else {
                    $scope.dataClienteBloquear.erro.mensagem = "Erro no Desbloqueio: " + data.mensagem;
                    $scope.dataClienteBloquear.loading -= 1;
                }
            });
        });
    };
    
    $scope.editarCliente = function(admin) {

        ModalService.showModal({
            templateUrl: "views/modal/editarModal.html",
            controller: "EditarClienteController",
            inputs:{
                usuario: admin
            }
        }).then(function(modal) {

            modal.element.modal();
            modal.close.then(function(result) {
            
            });
        });

    };
})