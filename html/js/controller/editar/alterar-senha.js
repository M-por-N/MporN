app.controller("AlterarSenhaController", function($scope, close, usuario, toastr, SweetAlert, EditarService) {

    $scope.usuario = usuario;

    $scope.dados = {
        senhaAntiga: '',
        senhaNova: '',
        senhaNova2: ''

    };

    $scope.close = function(result) {
        close(result, 500);
    };

    $scope.atualizarSenha = function(dados) {

        

        if (dados.senhaNova != dados.senhaNova2) {
            SweetAlert.swal(
                'Está estranho!',
                'Senhas são diferentes!',
                'error'
            )

            return;
        }
        
        

        EditarService.atualizarSenha(dados).then(function(data) {
            if (data.resultado) {

                toastr.success("Dados alterados com sucesso!");
            }
            else {
                toastr.error(data.mensagem);
            }
        });

    };


})
