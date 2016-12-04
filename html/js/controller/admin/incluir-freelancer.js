app.controller("IncluirFreelancerController", function($scope, $location, store, jwtHelper, CadastrarService, toastr, EspecialidadeService) {
    $scope.dataFreelancerIncluir = {
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

    function freelancerValido() {
        $scope.dataFreelancerIncluir.erro.nome.requerido = $scope.incluirForm.nomeInput.$error.required === true;
        $scope.dataFreelancerIncluir.erro.nome.tamanho = $scope.incluirForm.nomeInput.$error.minlength === true; //evita undefined

        $scope.dataFreelancerIncluir.erro.email.requerido = $scope.incluirForm.emailInput.$error.required === true;
        $scope.dataFreelancerIncluir.erro.email.invalido = $scope.incluirForm.emailInput.$error.email === true;

        $scope.dataFreelancerIncluir.erro.cpfcnpj.requerido = $scope.incluirForm.cpfcnpjInput.$error.required === true;
        $scope.dataFreelancerIncluir.erro.cpfcnpj.invalido = //se não for preenchido não verfica por validade
            (!$scope.dataFreelancerIncluir.erro.cpfcnpj.requerido && !$scope.incluirForm.cpfcnpjInput.$valid);

        $scope.dataFreelancerIncluir.erro.senha.requerido = $scope.incluirForm.senhaInput.$error.required === true;
        $scope.dataFreelancerIncluir.erro.senha.tamanho = $scope.incluirForm.senhaInput.$error.minlength === true;

        //Verfica se as senhas são iguais, mas somente se a primeira é maior que o minimo
        $scope.dataFreelancerIncluir.erro.senha.difere = !$scope.dataFreelancerIncluir.erro.senha.tamanho &&
            ($scope.dataFreelancerIncluir.senha2 != $scope.dataFreelancerIncluir.data.senha);

        $scope.dataFreelancerIncluir.erro.especialidade.requerido = $scope.incluirForm.especialidadeInput.$error.required === true;

        return $scope.incluirForm.$valid;
    }

    $scope.incluir = function(usuario) {
        //verificações:
        if (!freelancerValido()) return;

        $scope.dataFreelancerIncluir.loading += 1;
        var resposta = CadastrarService.cadastraFreelancer(usuario);
        resposta.then(function(data) {
            if (data.resultado == true) {
                $scope.dataFreelancerIncluir.loading -= 1;
                $location.path('/admin/listar-freelancer');
                toastr.success("Incluído com sucesso!");
            }
            else {
                $scope.dataFreelancerIncluir.erro.mensagem = "Erro no Cadastro: " + data.mensagem;
                $scope.dataFreelancerIncluir.loading -= 1;
            }
        });
    };
    
    $scope.dataFreelancerIncluir.loading += 1;
    EspecialidadeService.getEspecialidades().then(function(data) {
        if (data.especialidades) {
            $scope.dataFreelancerIncluir.todasEspecialidades = data.especialidades;
            $scope.dataFreelancerIncluir.loading -= 1;
        }
        else {
            $scope.dataFreelancerIncluir.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
        }
    });

})
