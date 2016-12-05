app.controller("ListarFreelancerController", function($scope, $location, store, jwtHelper, ListarService, AdminService, toastr, SweetAlert, ModalService) {
    $scope.dataListarFreelancer = {
        loading: 0,
        erro: {
            mensagem: null
        },
        dados: []
    };
    $scope.dataFreelancerBloquear = {
        loading: 0,
        erro: {
            mensagem: null
        },
        dados: []
    };

    $scope.listarFreelancer = function() {
        $scope.dataListarFreelancer.loading += 1;
        ListarService.listarFreelancer().then(function(data) {
            if (data) {
                $scope.dataListarFreelancer.dados = data.freelancer;

                $scope.dataListarFreelancer.loading = 0;
            }
            else {
                $scope.dataListarFreelancer.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
                $scope.dataListarFreelancer.loading -= 1;
            }
        });
    }

    $scope.listarFreelancer();

    $scope.editarFreelancer = function(admin) {

        ModalService.showModal({
            templateUrl: "views/modal/editarModal.html",
            controller: "EditarFreelancerController",
            inputs: {
                usuario: admin
            }
        }).then(function(modal) {

            modal.element.modal();
            modal.close.then(function(result) {

                $scope.listarFreelancer();

            });
        });

    };
})
