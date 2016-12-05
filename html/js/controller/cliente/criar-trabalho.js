app.controller("ClienteCriarTrabalhoController", function($scope, $location, store, jwtHelper, TrabalhoClienteService, PlanoService, toastr) {
    $scope.selectedItem = 0;
    $scope.plano = null;
    
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
                    },
                 plano: {
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
        $scope.dataClienteCriarTrabalho.erro.descricao.tamanho = $scope.criarTrabalhoForm.descricaoInput.$error.minlength === true; //evita undefined
        
        $scope.dataClienteCriarTrabalho.erro.detalhado.requerido = $scope.criarTrabalhoForm.detalhadoInput.$error.required === true;
        $scope.dataClienteCriarTrabalho.erro.detalhado.invalido = $scope.criarTrabalhoForm.detalhadoInput.$error.invalido === true;
        $scope.dataClienteCriarTrabalho.erro.detalhado.tamanho = $scope.criarTrabalhoForm.detalhadoInput.$error.minlength === true; //evita undefined
        
        if($scope.dataClienteCriarTrabalho.data.plano === ''){
            $scope.dataClienteCriarTrabalho.erro.plano.requerido=true;
            return false;
        }
        
        return $scope.criarTrabalhoForm.$valid;
    }
    
    
    $scope.criarTrabalhoDados = function(trabalho) {
        //verificações:
        //trabalho.plano = $scope.plano;
        if(!cadastraValido()) return;
        console.log(trabalho);
        
        $scope.dataClienteCriarTrabalho.loading += 1;
        var resposta = TrabalhoClienteService.cadastrarTrabalho(trabalho);
            resposta.then(function(data) {
            if(data.resultado == true) {
                $scope.dataClienteCriarTrabalho.loading -= 1;
                $location.path('/cliente/aberto');
                toastr.success("Trabalho criado com sucesso!");
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
    

    $scope.selected = function(index) {
        $scope.plano = $scope.dataClienteCriarTrabalho.todosPlanos[index];
        //Seleciona o plano no array
        $scope.selectedItem = index;
    }
    
    
})