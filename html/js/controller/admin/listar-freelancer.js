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
    
  
    $scope.dataListarFreelancer.loading += 1;
    ListarService.listarFreelancer().then(function(data) {
        if (data) {
            $scope.dataListarFreelancer.dados = data.freelancer;
            
            $scope.dataListarFreelancer.loading = 0;
        } else {
            $scope.dataListarFreelancer.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            $scope.dataListarFreelancer.loading -= 1;
        }
    });
    
    $scope.bloqueiaFreelancer = function(freelancer) {
         SweetAlert.swal({
            title: "Você tem certeza?",
            text: "Você irá bloquear o freelancer '" + freelancer.nome + "'. Tem certeza?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, bloquear agora!",
            cancelButtonText: "Cancelar"
        }).then(function() {

            $scope.dataFreelancerBloquear.loading += 1;
            var resposta = AdminService.bloqueiaFreelancer(freelancer);
            resposta.then(function(data) {
                if (data.resultado == true) {
                    $scope.dataFreelancerBloquear.loading -= 1;
                    $location.path('/admin/listar-freelancer');
                    toastr.success("Bloqueado com sucesso!");
                }
                else {
                    $scope.dataFreelancerBloquear.erro.mensagem = "Erro no Bloqueio: " + data.mensagem;
                    $scope.dataFreelancerBloquear.loading -= 1;
                }
            });
        });
    };
    
    $scope.desbloqueiaFreelancer = function(freelancer) {
         SweetAlert.swal({
            title: "Você tem certeza?",
            text: "Você irá desbloquear o freelancer '" + freelancer.nome + "'. Tem certeza?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, desbloquear agora!",
            cancelButtonText: "Cancelar"
        }).then(function() {

            $scope.dataFreelancerBloquear.loading += 1;
            var resposta = AdminService.desbloqueiaFreelancer(freelancer);
            resposta.then(function(data) {
                if (data.resultado == true) {
                    $scope.dataFreelancerBloquear.loading -= 1;
                    $location.path('/admin/listar-freelancer');
                    toastr.success("Desbloqueado com sucesso!");
                }
                else {
                    $scope.dataFreelancerBloquear.erro.mensagem = "Erro no Desbloqueio: " + data.mensagem;
                    $scope.dataFreelancerBloquear.loading -= 1;
                }
            });
        });
    };
    
    $scope.editarFreelancer = function(admin) {

        ModalService.showModal({
            templateUrl: "views/modal/editarModal.html",
            controller: "EditarFreelancerController",
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