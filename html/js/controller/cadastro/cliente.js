app.controller("CadastroClienteController", function($scope, $location, store, jwtHelper, CadastrarService, toastr) {
    $scope.dataCadastraCliente = {
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
        $scope.dataCadastraCliente.erro.nome.requerido = $scope.cadastroForm.nomeInput.$error.required === true;
        $scope.dataCadastraCliente.erro.nome.tamanho = $scope.cadastroForm.nomeInput.$error.minlength === true; //evita undefined
        
        $scope.dataCadastraCliente.erro.email.requerido = $scope.cadastroForm.emailInput.$error.required === true;
        $scope.dataCadastraCliente.erro.email.invalido = $scope.cadastroForm.emailInput.$error.email === true;
        
        $scope.dataCadastraCliente.erro.cpfcnpj.requerido = $scope.cadastroForm.cpfcnpjInput.$error.required === true;
        $scope.dataCadastraCliente.erro.cpfcnpj.invalido = //se não for preenchido não verfica por validade
            (!$scope.dataCadastraCliente.erro.cpfcnpj.requerido && !$scope.cadastroForm.cpfcnpjInput.$valid);
            
        $scope.dataCadastraCliente.erro.senha.requerido = $scope.cadastroForm.senhaInput.$error.required === true;
        $scope.dataCadastraCliente.erro.senha.tamanho = $scope.cadastroForm.senhaInput.$error.minlength === true;
        
        //Verfica se as senhas são iguais, mas somente se a primeira é maior que o minimo
        $scope.dataCadastraCliente.erro.senha.difere = !$scope.dataCadastraCliente.erro.senha.tamanho &&
            ($scope.dataCadastraCliente.senha2 != $scope.dataCadastraCliente.data.senha);
        
        return $scope.cadastroForm.$valid;
    }
    
    $scope.cadastrar = function(usuario) {
        //verificações:
        if(!cadastraValido()) return;
        
        $scope.dataCadastraCliente.loading += 1;
        var resposta = CadastrarService.cadastraCliente(usuario);
            resposta.then(function(data) {
            if(data.resultado == true) {
                $scope.dataCadastraCliente.loading -= 1;
                $location.path('/login/cliente');
                toastr.success('Cadastro feito com sucesso!');
            } else {
                $scope.dataCadastraCliente.erro.mensagem = "Erro no Cadastro: " + data.mensagem;
                $scope.dataCadastraCliente.loading -= 1;
                toastr.error('Erro!');
            }
        });
    };
});