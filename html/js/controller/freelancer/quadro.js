app.controller("QuadroFreelancerController", function($scope, $location, $window, store, jwtHelper, QuadroService) {
    $scope.dataFreelancer = {
        loading: 0,
        dados: []
    };
    
    $scope.listaMensagem = [];

    $scope.listarQuadro = function() {

        $scope.dataFreelancer.loading += 1;
        QuadroService.getFreelancer().then(function(data) {
            if (data) {
                $scope.dataFreelancer.dados = data;
                $scope.dataFreelancer.loading -= 1;
            }
            else {
                $scope.dataFreelancer.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            }

        });


        QuadroService.getQuadro().then(function(data) {

            $scope.listaMensagem = data.quadro;
        });

    };

    $scope.listarQuadro();


})
