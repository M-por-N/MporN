app.controller("IncluirPlanoController", function($scope, $location, store, jwtHelper, IncluirService, toastr) {
    $scope.dataPlanoIncluir = {
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
            valor: {
                requerido: false,
                invalido: false
            }
        },
        loading: 0,
        data: {}
    };

    function planoValido() {
        $scope.dataPlanoIncluir.erro.nome.requerido = $scope.incluirForm.nomeInput.$error.required === true;
        $scope.dataPlanoIncluir.erro.nome.tamanho = $scope.incluirForm.nomeInput.$error.minlength === true; //evita undefined

        $scope.dataPlanoIncluir.erro.descricao.requerido = $scope.incluirForm.descricaoInput.$error.required === true;
        $scope.dataPlanoIncluir.erro.descricao.tamanho = $scope.incluirForm.descricaoInput.$error.minlength === true;

        $scope.dataPlanoIncluir.erro.valor.requerido = $scope.incluirForm.valorInput.$error.required === true;


        return $scope.incluirForm.$valid;
    }

    $scope.incluir = function(usuario) {
        //verificações:
        if (!planoValido()) return;

        $scope.dataPlanoIncluir.loading += 1;
        var resposta = IncluirService.incluirPlano(usuario);
        resposta.then(function(data) {
            if (data.resultado == true) {
                $scope.dataPlanoIncluir.loading -= 1;
                $location.path('/admin/listar-plano');
                toastr.success("Incluído com sucesso!");
            }
            else {
                $scope.dataPlanoIncluir.erro.mensagem = "Erro na Inclusão: " + data.mensagem;
                $scope.dataPlanoIncluir.loading -= 1;
            }
        });
    };


})
