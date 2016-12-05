app.controller("ListarAdminController", function($scope, $location, store, jwtHelper, ListarService, toastr, ModalService) {
    $scope.dataListarAdmin = {
        loading: 0,
        erro: {
            mensagem: null
        },
        dados: []
    };

    $scope.listarAdmin = function() {
        $scope.dataListarAdmin.loading += 1;
        ListarService.listarAdmin().then(function(data) {
            if (data) {
                $scope.dataListarAdmin.dados = data.admin;

                $scope.dataListarAdmin.loading = 0;
            }
            else {
                $scope.dataListarAdmin.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
                $scope.dataListarAdmin.loading -= 1;
            }
        });

    }

    $scope.listarAdmin();
    $scope.editarAdmin = function(admin) {

        ModalService.showModal({
            templateUrl: "views/modal/editarModal.html",
            controller: "EditarAdminController",
            inputs: {
                usuario: admin
            }
        }).then(function(modal) {

            modal.element.modal();
            modal.close.then(function(result) {

            $scope.listarAdmin();

            });
        });

    };
})
