app.controller("ListarTrabalhoController", function($scope, $location, store, jwtHelper, ListarService, toastr) {
    $scope.dataListarTrabalho = {
        loading: 0,
        erro: {
            mensagem: null
            },
        dados: []
    };    
    
  
    $scope.dataListarTrabalho.loading += 1;
    ListarService.listarTrabalho().then(function(data) {
        if (data) {
            $scope.dataListarTrabalho.dados = data.trabalho;
            
            $scope.dataListarTrabalho.loading = 0;
        } else {
            $scope.dataListarTrabalho.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            $scope.dataListarTrabalho.loading -= 1;
        }
    });
})