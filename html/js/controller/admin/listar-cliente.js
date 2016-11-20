app.controller("ListarClienteController", function($scope, $location, store, jwtHelper, ListarService, toastr) {
    $scope.dataListarCliente = {
        loading: 0,
        erro: {
            mensagem: null
            },
        dados: []
    };    
    
  
    $scope.dataListarCliente.loading += 1;
    ListarService.listarCliente().then(function(data) {
        if (data) {
            $scope.dataListarCliente.dados = data.cliente;
            
            $scope.dataListarCliente.loading = 0;
        } else {
            $scope.dataListarCliente.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            $scope.dataListarCliente.loading -= 1;
        }
    });
})