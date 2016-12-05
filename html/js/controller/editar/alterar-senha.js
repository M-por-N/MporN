app.controller("AlterarSenhaController", function($scope, close, usuario, toastr, SweetAlert, EditarService) {

    $scope.usuario = usuario;

    $scope.close = function(result) {
        close(result, 500);
    };


})
