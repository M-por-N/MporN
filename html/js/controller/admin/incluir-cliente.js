app.controller("IncluirClienteController", function($scope, $location, store, jwtHelper, IncluirService, toastr) {
    $scope.dataClienteIncluir = {
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

    function clienteValido() {
        $scope.dataClienteIncluir.erro.nome.requerido = $scope.incluirForm.nomeInput.$error.required === true;
        $scope.dataClienteIncluir.erro.nome.tamanho = $scope.incluirForm.nomeInput.$error.minlength === true; //evita undefined

        $scope.dataClienteIncluir.erro.email.requerido = $scope.incluirForm.emailInput.$error.required === true;
        $scope.dataClienteIncluir.erro.email.invalido = $scope.incluirForm.emailInput.$error.email === true;

        $scope.dataClienteIncluir.erro.cpfcnpj.requerido = $scope.incluirForm.cpfcnpjInput.$error.required === true;
        $scope.dataClienteIncluir.erro.cpfcnpj.invalido = //se não for preenchido não verfica por validade
            (!$scope.dataClienteIncluir.erro.cpfcnpj.requerido && !$scope.incluirForm.cpfcnpjInput.$valid);

        $scope.dataClienteIncluir.erro.senha.requerido = $scope.incluirForm.senhaInput.$error.required === true;
        $scope.dataClienteIncluir.erro.senha.tamanho = $scope.incluirForm.senhaInput.$error.minlength === true;

        //Verfica se as senhas são iguais, mas somente se a primeira é maior que o minimo
        $scope.dataClienteIncluir.erro.senha.difere = !$scope.dataClienteIncluir.erro.senha.tamanho &&
            ($scope.dataClienteIncluir.senha2 != $scope.dataClienteIncluir.data.senha);

        return $scope.incluirForm.$valid;
    }

     $scope.incluir = function(usuario) {
        //verificações:
        if (!clienteValido()) return;

        $scope.dataClienteIncluir.loading += 1;
        var resposta = IncluirService.incluirCliente(usuario);
        resposta.then(function(data) {
            if (data.resultado == true) {
                $scope.dataClienteIncluir.loading -= 1;
                $location.path('/admin/listar-cliente');
                toastr.success("Incluído com sucesso!");
            }
            else {
                $scope.dataClienteIncluir.erro.mensagem = "Erro no Cadastro: " + data.mensagem;
                $scope.dataClienteIncluir.loading -= 1;
            }
        });
    };

})
