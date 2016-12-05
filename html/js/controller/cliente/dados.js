app.controller("ClienteDadosController", function($scope, $location, store, jwtHelper, ClienteService, toastr, ModalService) {
    $scope.dataCliente = {
        loading: 0,
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
            }
        },
        dados: {}
    };

    function cadastraValido() {
        $scope.dataCliente.erro.nome.requerido = $scope.cadastroForm.nomeInput.$error.required === true;
        $scope.dataCliente.erro.nome.tamanho = $scope.cadastroForm.nomeInput.$error.minlength === true; //evita undefined

        $scope.dataCliente.erro.email.requerido = $scope.cadastroForm.emailInput.$error.required === true;
        $scope.dataCliente.erro.email.invalido = $scope.cadastroForm.emailInput.$error.email === true;

        $scope.dataCliente.erro.cpfcnpj.requerido = $scope.cadastroForm.cpfcnpjInput.$error.required === true;
        $scope.dataCliente.erro.cpfcnpj.invalido = //se não for preenchido não verfica por validade
            (!$scope.dataCliente.erro.cpfcnpj.requerido && !$scope.cadastroForm.cpfcnpjInput.$valid);

        return $scope.cadastroForm.$valid;
    }

    $scope.atualizaClienteDados = function() {
        if (!cadastraValido()) {
            return;
        }
        $scope.dataCliente.loading += 1;
        ClienteService.setDados($scope.dataCliente.dados).then(function(data) {
            if (data.resultado) {
                $location.path('/cliente/aberto');
                toastr.success("Dados alterados com sucesso!");
                $scope.dataCliente.loading = 0;
            }
            else {
                $scope.dataCliente.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
                $scope.dataCliente.loading = 0;
            }
        });
    }

    $scope.dataCliente.loading += 2;
    ClienteService.getDados().then(function(data) {
        if (data) {
            $scope.dataCliente.dados = data;
            $scope.dataCliente.senha2 = $scope.dataCliente.dados.senha;
            $scope.dataCliente.loading = 0;
        }
        else {
            $scope.dataCliente.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            $scope.dataCliente.loading = 0;
        }
    });


    $scope.alterarSenha = function(usuario) {

        ModalService.showModal({
            templateUrl: "views/modal/alterarSenha.html",
            controller: "AlterarSenhaController",
            inputs: {
                usuario: usuario
            }
        }).then(function(modal) {

            modal.element.modal();
            modal.close.then(function(result) {

            });
        });
    }
})
