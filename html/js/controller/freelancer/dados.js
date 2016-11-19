app.controller("FreelancerDadosController", function($scope, $location, store, jwtHelper, TrabalhoFreelancerService, FreelancerService, EspecialidadeService, toastr) {
    $scope.dataFreelancer = {
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
        senha2:null,
        dados: {}
    };    
    
    function cadastraValido() {
        $scope.dataFreelancer.erro.nome.requerido = $scope.cadastroForm.nomeInput.$error.required === true;
        $scope.dataFreelancer.erro.nome.tamanho = $scope.cadastroForm.nomeInput.$error.minlength === true; //evita undefined
        
        $scope.dataFreelancer.erro.email.requerido = $scope.cadastroForm.emailInput.$error.required === true;
        $scope.dataFreelancer.erro.email.invalido = $scope.cadastroForm.emailInput.$error.invalido === true;
        
        $scope.dataFreelancer.erro.cpfcnpj.requerido = $scope.cadastroForm.cpfcnpjInput.$error.required === true;
        $scope.dataFreelancer.erro.cpfcnpj.invalido = //se não for preenchido não verfica por validade
            (!$scope.dataFreelancer.erro.cpfcnpj.requerido && !$scope.cadastroForm.cpfcnpjInput.$valid);
        
        //senha não é obrigatorio
        //$scope.dataFreelancer.erro.senha.requerido = $scope.cadastroForm.senhaInput.$error.required === true;
        $scope.dataFreelancer.erro.senha.tamanho = $scope.cadastroForm.senhaInput.$error.minlength === true;
        
        $scope.dataFreelancer.erro.especialidade.requerido = $scope.cadastroForm.especialidadeInput.$error.required === true;
        
        //Verfica se as senhas são iguais, mas somente se a primeira é maior que o minimo
        if($scope.dataFreelancer.dados.hasOwnProperty('senha') && $scope.dataFreelancer.dados.senha != null && $scope.dataFreelancer.dados.senha != '')
            $scope.dataFreelancer.erro.senha.difere = !$scope.dataFreelancer.erro.senha.tamanho &&
                ($scope.dataFreelancer.senha2 != $scope.dataFreelancer.dados.senha);
        
        return $scope.cadastroForm.$valid;
    }

    $scope.atualizaFreelancerDados = function() {
        if (!cadastraValido()) {
            return;
        }
        $scope.dataFreelancer.loading += 1;
        FreelancerService.setDados($scope.dataFreelancer.dados).then(function(data) {
            if (data.resultado) {
                $location.path('/freelancer/disponivel');
                toastr.success("Dados alterados com sucesso!");
                $scope.dataFreelancer.loading -= 1;
            } else {
                $scope.dataFreelancer.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
                $scope.dataFreelancer.loading -= 1;
            }
        });
    }

    $scope.dataFreelancer.loading += 2;
    FreelancerService.getDados().then(function(data) {
        if (data) {
            $scope.dataFreelancer.dados = data;
            $scope.dataFreelancer.senha2 = $scope.dataFreelancer.dados.senha;
            $scope.dataFreelancer.loading -= 1;
        } else {
            $scope.dataFreelancer.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            $scope.dataFreelancer.loading -= 1;
        }
    });
    EspecialidadeService.getEspecialidades().then(function(data) {
        if (data.especialidades) {
            $scope.dataFreelancer.todasEspecialidades = data.especialidades;
            $scope.dataFreelancer.loading -= 1;
        } else {
            $scope.dataFreelancer.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            $scope.dataFreelancer.loading -= 1;
        }
    });
})