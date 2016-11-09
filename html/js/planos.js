app.controller("PlanosController", function($scope, PlanoService) {
    $scope.dataInicio = {
        planos: [],
        loading: 0
    };
    
    $scope.dataInicio.loading += 1;
    PlanoService.getPlanos().then(function(data) {
        if(data.planos) {
            $scope.dataInicio.planos = data.planos;
            $scope.dataInicio.loading -= 1;
        }else{
            alert("Erro ao receber dados do servidor");
        }
    });
});