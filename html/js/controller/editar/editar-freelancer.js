app.controller("EditarFreelancerController", function($scope, close, usuario, toastr, SweetAlert, EditarUsuarioService, StatusService) {

    $scope.usuario = usuario;

    $scope.close = function(result) {
        close(result, 500);
    };

    $scope.idStatus = usuario.idStatus;

    $scope.listaStatus = [];

    StatusService.getStatus().then(function(data) {
        $scope.listaStatus = data.status;

    });

    $scope.setStatus = function() {
        $scope.params = {
            idStatus: $scope.idStatus,
            idUsuario: usuario.idUsuario
        };

        StatusService.setStatus($scope.params).then(function(data) {
            if (data.resultado) {

                toastr.success("Situação alterada com sucesso!");
            }
            else {
                toastr.error("Erro no banco");
            }

        });
    }

    $scope.atualizaDados = function() {

        EditarUsuarioService.editarFreelancer($scope.usuario).then(function(data) {
            if (data.resultado) {

                toastr.success("Dados alterados com sucesso!");
            }
            else {
                toastr.error("Erro no banco");
            }
        });
    }
})
