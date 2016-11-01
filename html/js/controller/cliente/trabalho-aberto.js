app.controller("ClienteTrabalhoAbertoController", function($scope, $location, $window, store, jwtHelper, TrabalhoClienteService) {
    $scope.dataClienteTrabalhoAberto = {
        loading: 0,
        dados: [],
        erro: {
            mensagem: null
        }
    };

    $scope.dataClienteTrabalhoAberto.loading += 1;
    TrabalhoClienteService.getAbertos().then(function(data) {
        if (data.trabalhos) {
            $scope.dataClienteTrabalhoAberto.dados = data.trabalhos;
            $scope.dataClienteTrabalhoAberto.loading = 0;
        }
        else {
            $scope.dataClienteTrabalhoAberto.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
        }
    });


    $scope.removerTrabalho = function(id) {

        

        var r = confirm("Você deseja mesmo remover?");

        if (r == true) {
            
            $scope.dataClienteTrabalhoAberto.loading += 1;
            
            $scope.params = {
                trabalho: id
            };

            var resposta = TrabalhoClienteService.removerTrabalho($scope.params);
            resposta.then(function(data) {
                if (data.resultado == true) {

                    $window.location.reload();
                }
                else {
                    $scope.dataClienteTrabalhoAberto.erro.mensagem = "Erro no Remover: " + data.mensagem;

                }
            });

        }
    };
})
