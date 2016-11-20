app.controller("ListarPlanoController", function($scope, $location, store, jwtHelper, ListarService, toastr) {
    $scope.dataListarPlano = {
        loading: 0,
        erro: {
            mensagem: null
            },
        dados: []
    };    
    
  
    $scope.dataListarPlano.loading += 1;
    ListarService.listarPlano().then(function(data) {
        if (data) {
            $scope.dataListarPlano.dados = data.plano;
            
            $scope.dataListarPlano.loading = 0;
        } else {
            $scope.dataListarPlano.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            $scope.dataListarPlano.loading -= 1;
        }
    });
})