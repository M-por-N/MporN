app.controller("ClienteCriarTrabalhoController", function($scope, $location, store, jwtHelper, TrabalhoClienteService, PlanoService) {
    $scope.dataClienteCriarTrabalho = {
        erro: {
                mensagem: null,
                nome: {
                    requerido: false,
                    tamanho: false
                    },
                descricao: {
                    requerido: false,
                    invalido: false
                    },
                detalhado: {
                    requerido: false,
                    invalido: false
                    }
                },
        loading: 0,
        data: {}
    };
    
    
    function cadastraValido() {
        $scope.dataClienteCriarTrabalho.erro.nome.requerido = $scope.criarTrabalhoForm.nomeInput.$error.required === true;
        $scope.dataClienteCriarTrabalho.erro.nome.tamanho = $scope.criarTrabalhoForm.nomeInput.$error.minlength === true; //evita undefined
        
        $scope.dataClienteCriarTrabalho.erro.descricao.requerido = $scope.criarTrabalhoForm.descricaoInput.$error.required === true;
        $scope.dataClienteCriarTrabalho.erro.descricao.invalido = $scope.criarTrabalhoForm.descricaoInput.$error.invalido === true;
        
        return $scope.criarTrabalhoForm.$valid;
    }
    
    
    $scope.criarTrabalhoDados = function(trabalho) {
        //verificações:
        if(!cadastraValido()) return;
        
        $scope.dataClienteCriarTrabalho.loading += 1;
        var resposta = TrabalhoClienteService.cadastrarTrabalho(trabalho);
            resposta.then(function(data) {
            if(data.resultado == true) {
                $scope.dataClienteCriarTrabalho.loading -= 1;
                $location.path('/cliente/aberto');
            } else {
                $scope.dataClienteCriarTrabalho.erro.mensagem = "Erro no Cadastro: " + data.mensagem;
                $scope.dataClienteCriarTrabalho.loading -= 1;
            }
        });
    };
    
    PlanoService.getPlanos().then(function(data) {
        if (data.planos) {
            $scope.dataClienteCriarTrabalho.todosPlanos = data.planos;
            $scope.dataClienteCriarTrabalho.loading = 0;
        } else {
            $scope.dataClienteCriarTrabalho.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            $scope.dataClienteCriarTrabalho.loading = 0;
        }
    });
    
    
})