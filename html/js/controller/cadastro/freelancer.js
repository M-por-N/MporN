app.controller("CadastroFreelancerController", function($scope, $location, store, jwtHelper, CadastrarService, EspecialidadeService, toastr) {
    $scope.dataCadastraFreelancer = {
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
            },
            especialidade: {
                requerido: false
            }
        },
        senha2: null,
        loading: 0,
        data: {}
    };

    function cadastraValido() {
        $scope.dataCadastraFreelancer.erro.nome.requerido = $scope.cadastroForm.nomeInput.$error.required === true;
        $scope.dataCadastraFreelancer.erro.nome.tamanho = $scope.cadastroForm.nomeInput.$error.minlength === true; //evita undefined

        $scope.dataCadastraFreelancer.erro.email.requerido = $scope.cadastroForm.emailInput.$error.required === true;
        $scope.dataCadastraFreelancer.erro.email.invalido = $scope.cadastroForm.emailInput.$error.email === true;

        $scope.dataCadastraFreelancer.erro.cpfcnpj.requerido = $scope.cadastroForm.cpfcnpjInput.$error.required === true;
        $scope.dataCadastraFreelancer.erro.cpfcnpj.invalido = //se não for preenchido não verfica por validade
            (!$scope.dataCadastraFreelancer.erro.cpfcnpj.requerido && !$scope.cadastroForm.cpfcnpjInput.$valid);

        $scope.dataCadastraFreelancer.erro.senha.requerido = $scope.cadastroForm.senhaInput.$error.required === true;
        $scope.dataCadastraFreelancer.erro.senha.tamanho = $scope.cadastroForm.senhaInput.$error.minlength === true;

        //Verfica se as senhas são iguais, mas somente se a primeira é maior que o minimo
        $scope.dataCadastraFreelancer.erro.senha.difere = !$scope.dataCadastraFreelancer.erro.senha.tamanho &&
            ($scope.dataCadastraFreelancer.senha2 != $scope.dataCadastraFreelancer.data.senha);

        $scope.dataCadastraFreelancer.erro.especialidade.requerido = $scope.cadastroForm.especialidadeInput.$error.required === true;

        return $scope.cadastroForm.$valid;
    }

    $scope.cadastrar = function(usuario) {
        //verificações:
        if (!cadastraValido()) return;

        $scope.dataCadastraFreelancer.loading += 1;
        var resposta = CadastrarService.cadastraFreelancer(usuario);
        resposta.then(function(data) {
            if (data.resultado == true) {
                $scope.dataCadastraFreelancer.loading -= 1;
                $location.path('/login/freelancer');
                toastr.success('Cadastro feito com sucesso!');
            }
            else {
                $scope.dataCadastraFreelancer.erro.mensagem = "Erro no Cadastro: " + data.mensagem;
                $scope.dataCadastraFreelancer.loading -= 1;
                toastr.error('Erro no cadastro');
            }
        });
    };


    $scope.dataCadastraFreelancer.loading += 1;
    EspecialidadeService.getEspecialidades().then(function(data) {
        if (data.especialidades) {
            $scope.dataCadastraFreelancer.todasEspecialidades = data.especialidades;
            $scope.dataCadastraFreelancer.loading -= 1;
        }
        else {
            $scope.dataCadastraFreelancer.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
        }
    });

});
