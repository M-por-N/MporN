app.controller("QuadroAdminController", function($scope, $location, $window, store, jwtHelper, QuadroService) {
    $scope.dataAdmin = {
        loading: 0,
        dados: [],
        erro: {
            mensagem: null
        }
    };
    
    $scope.listaMensagem = [];

    $scope.listarQuadro = function() {

        $scope.dataAdmin.loading += 1;
        QuadroService.getAdmin().then(function(data) {
            if (data) {
                $scope.dataAdmin.dados = data;
                $scope.dataAdmin.loading -= 1;
            }
            else {
                $scope.dataAdmin.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            }
        });
        
        
        QuadroService.getQuadro().then(function(data) {
            
            $scope.listaMensagem = data.quadro;
        });
        
    };

    $scope.listarQuadro();


})
