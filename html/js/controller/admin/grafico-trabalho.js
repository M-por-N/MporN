app.controller("GraficoTrabalhoController", function($scope, $location, store, jwtHelper, GraficoService, toastr, SweetAlert) {
    $scope.dataGrafico = {
        erro: {
            mensagem: null
        },
        loading: 0,
        data: {},
        labels: ["Disponivel", "Em Andamento", "Em Análise", "Concluído"]
    };





    $scope.pesquisarGrafico = function(quadro) {

        $scope.dataGrafico.loading += 1;
        GraficoService.getTrabalho().then(function(data) {
            if (data) {
                
                var novaLista = [];
                angular.forEach(data.trabalho, function(item) {
                    novaLista.push(item.valor)
                });
                
                $scope.dataGrafico.data = novaLista;

                $scope.dataGrafico.loading = 0;
            }
            else {
                $scope.dataGrafico.erro.mensagem = data.mensagem;
                $scope.dataGrafico.loading -= 1;
            }
        });
    };

    $scope.pesquisarGrafico();

})
