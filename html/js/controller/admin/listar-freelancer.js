app.controller("ListarFreelancerController", function($scope, $location, store, jwtHelper, ListarService, toastr) {
    $scope.dataListarFreelancer = {
        loading: 0,
        erro: {
            mensagem: null
            },
        dados: []
    };    
    
  
    $scope.dataListarFreelancer.loading += 1;
    ListarService.listarFreelancer().then(function(data) {
        if (data) {
            $scope.dataListarFreelancer.dados = data.freelancer;
            
            $scope.dataListarFreelancer.loading = 0;
        } else {
            $scope.dataListarFreelancer.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            $scope.dataListarFreelancer.loading -= 1;
        }
    });
})