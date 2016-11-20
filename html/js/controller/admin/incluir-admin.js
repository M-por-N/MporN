app.controller("AdminIncluirAdminsController", function($scope, $location, store, jwtHelper) {
    $scope.dataAdminIncluir = {
        erro: {
                mensagem: null,
                nome: {
                    requerido: false,
                    tamanho: false
                    },
                descricao: {
                    requerido: false,
                    invalido: false
                    },
                detalhado: {
                    requerido: false,
                    invalido: false
                    },
                 plano: {
                    requerido: false,
                    invalido: false
                    }
                },
        loading: 0,
        data: {}
    };
    
    
    
    
})