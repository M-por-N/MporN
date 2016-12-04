app.controller("IncluirAdminController", function($scope, $location, store, jwtHelper, CadastrarService, toastr) {
    $scope.dataAdminIncluir = {
        erro: {
            mensagem: null,
            nome: {
                requerido: false,
                tamanho: false
            },
            email: {
                requerido: false,
                invalido: false
            },
            cpfcnpj: {
                requerido: false,
                invalido: false
            },
            senha: {
                requerido: false,
                tamanho: false,
                difere: false
            }
        },
        senha2: null,
        loading: 0,
        data: {}
    };

    function adminValido() {
        $scope.dataAdminIncluir.erro.nome.requerido = $scope.incluirForm.nomeInput.$error.required === true;
        $scope.dataAdminIncluir.erro.nome.tamanho = $scope.incluirForm.nomeInput.$error.minlength === true; //evita undefined

        $scope.dataAdminIncluir.erro.email.requerido = $scope.incluirForm.emailInput.$error.required === true;
        $scope.dataAdminIncluir.erro.email.invalido = $scope.incluirForm.emailInput.$error.email === true;

        $scope.dataAdminIncluir.erro.cpfcnpj.requerido = $scope.incluirForm.cpfcnpjInput.$error.required === true;
        $scope.dataAdminIncluir.erro.cpfcnpj.invalido = //se não for preenchido não verfica por validade
            (!$scope.dataAdminIncluir.erro.cpfcnpj.requerido && !$scope.incluirForm.cpfcnpjInput.$valid);

        $scope.dataAdminIncluir.erro.senha.requerido = $scope.incluirForm.senhaInput.$error.required === true;
        $scope.dataAdminIncluir.erro.senha.tamanho = $scope.incluirForm.senhaInput.$error.minlength === true;

        //Verfica se as senhas são iguais, mas somente se a primeira é maior que o minimo
        $scope.dataAdminIncluir.erro.senha.difere = !$scope.dataAdminIncluir.erro.senha.tamanho &&
            ($scope.dataAdminIncluir.senha2 != $scope.dataAdminIncluir.data.senha);

        return $scope.incluirForm.$valid;
    }

     $scope.incluir = function(usuario) {
        //verificações:
        if (!adminValido()) return;

        $scope.dataAdminIncluir.loading += 1;
        var resposta = CadastrarService.cadastraAdmin(usuario);
        resposta.then(function(data) {
            if (data.resultado == true) {
                $scope.dataAdminIncluir.loading -= 1;
                $location.path('/admin/listar-admin');
                toastr.success("Incluído com sucesso!");
            }
            else {
                $scope.dataAdminIncluir.erro.mensagem = "Erro no Cadastro: " + data.mensagem;
                $scope.dataAdminIncluir.loading -= 1;
            }
        });
    };

})
