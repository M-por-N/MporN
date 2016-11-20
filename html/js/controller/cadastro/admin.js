app.controller("CadastroAdminController", function($scope, $location, store, jwtHelper, AdminService, toastr) {
    $scope.dataCadastraAdmin = {
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

    function cadastraValido() {
        $scope.dataCadastraAdmin.erro.nome.requerido = $scope.cadastroForm.nomeInput.$error.required === true;
        $scope.dataCadastraAdmin.erro.nome.tamanho = $scope.cadastroForm.nomeInput.$error.minlength === true; //evita undefined

        $scope.dataCadastraAdmin.erro.email.requerido = $scope.cadastroForm.emailInput.$error.required === true;
        $scope.dataCadastraAdmin.erro.email.invalido = $scope.cadastroForm.emailInput.$error.email === true;

        $scope.dataCadastraAdmin.erro.cpfcnpj.requerido = $scope.cadastroForm.cpfcnpjInput.$error.required === true;
        $scope.dataCadastraAdmin.erro.cpfcnpj.invalido = //se não for preenchido não verfica por validade
            (!$scope.dataCadastraAdmin.erro.cpfcnpj.requerido && !$scope.cadastroForm.cpfcnpjInput.$valid);

        $scope.dataCadastraAdmin.erro.senha.requerido = $scope.cadastroForm.senhaInput.$error.required === true;
        $scope.dataCadastraAdmin.erro.senha.tamanho = $scope.cadastroForm.senhaInput.$error.minlength === true;

        //Verfica se as senhas são iguais, mas somente se a primeira é maior que o minimo
        $scope.dataCadastraAdmin.erro.senha.difere = !$scope.dataCadastraAdmin.erro.senha.tamanho &&
            ($scope.dataCadastraAdmin.senha2 != $scope.dataCadastraAdmin.data.senha);

        return $scope.cadastroForm.$valid;
    }

    $scope.cadastrar = function(usuario) {
        //verificações:
        if (!cadastraValido()) return;

        $scope.dataCadastraAdmin.loading += 1;
        var resposta = AdminService.cadastra(usuario);
        resposta.then(function(data) {
            if (data.resultado == true) {
                $scope.dataCadastraAdmin.loading -= 1;
                $location.path('/login/admin');
                toastr.success("Cadastrado com sucesso!");
            }
            else {
                $scope.dataCadastraAdmin.erro.mensagem = "Erro no Cadastro: " + data.mensagem;
                $scope.dataCadastraAdmin.loading -= 1;
            }
        });
    };
});
