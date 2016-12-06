app.controller("ListarAdminController", function($scope, $location, store, jwtHelper, ListarService, toastr, ModalService, SweetAlert, ApagarService) {
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

    };

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


    $scope.apagarAdmin = function(admin) {



        SweetAlert.swal({
            title: "Você tem certeza?",
            text: "Você irá deletar o administrador '" + admin.nomeUsuario + "' do sistema. Tem certeza?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, remover agora!",
            cancelButtonText: "Cancelar"
        }).then(function() {


            $scope.params = {
                idAdmin: admin.idAdmin,
                idUsuario: admin.idUsuario
            };


            var resposta = ApagarService.deleteAdmin($scope.params);
            resposta.then(function(data) {
                if (data.resultado == true) {

                    var index = $scope.dataListarAdmin.dados.indexOf(admin);
                    $scope.dataListarAdmin.dados.splice(index, 1);

                    SweetAlert.swal("Removido!", "Trabalho removido com sucesso.", "success");

                    toastr.success("Trabalho removido com sucesso");
                }
                else {
                    $scope.dataListarAdmin.erro.mensagem = "Erro no Remover: " + data.mensagem;
                    toastr.error("Error");
                }
            });

        }, function(dismiss) {

            SweetAlert.swal("O administrador está salvo!");

        });

    };
})
