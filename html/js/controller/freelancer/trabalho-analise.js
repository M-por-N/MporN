app.controller("FreelancerTrabalhoAnaliseController", function($scope, $location, $window, store, jwtHelper, TrabalhoFreelancerService, toastr) {
    $scope.dataFreelancerTrabalhoAnalise = {
        loading: 0,
        dados: [],
        erro: {
            mensagem: null
        }
    };

    $scope.dataFreelancerTrabalhoAnalise.loading += 1;
    TrabalhoFreelancerService.getAnalise().then(function(data) {
        if (data.trabalhos) {
            $scope.dataFreelancerTrabalhoAnalise.dados = data.trabalhos
            $scope.dataFreelancerTrabalhoAnalise.loading = 0;
        }
        else {
            $scope.dataFreelancerTrabalhoAnalise.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
        }
    });
    
    

})


