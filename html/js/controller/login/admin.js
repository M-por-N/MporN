app.controller("LoginAdminController", function($scope, $location, store, jwtHelper, LoginService) {
    $scope.dataAdminLogin = {
        erro: {
                mensagem: null,
                email: {
                    requerido: false,
                    invalido: false
                    },
                senha: {
                    requerido: false,
                    tamanho: false
                    }
            },
        loading: 0,
        data: {}
    };
    
    function loginValido() {
        $scope.dataAdminLogin.erro.email.invalido = $scope.loginForm.emailInput.$error.email === true; //evita undefined
        $scope.dataAdminLogin.erro.email.requerido = $scope.loginForm.emailInput.$error.required === true;
            
        $scope.dataAdminLogin.erro.senha.tamanho = $scope.loginForm.senhaInput.$error.minlength === true;
        $scope.dataAdminLogin.erro.senha.requerido = $scope.loginForm.senhaInput.$error.required === true;
        
        return $scope.loginForm.$valid;
    }
        
    $scope.login = function(usuario) {
        //verificações:
        if(!loginValido()) return;
        
        $scope.dataAdminLogin.loading += 1;
        var resposta = LoginService.loginAdmin(usuario.email, usuario.senha);
            resposta.then(function(data) {
            if(data.resultado == true) {
                $scope.isLoged = true;
                store.set('jwt', data.jwt);
                $scope.dataMain.usuario = jwtHelper.decodeToken(data.jwt).data;
                $location.path('/admin');
                $scope.dataAdminLogin.loading -= 1;
            } else {
                $scope.dataAdminLogin.erro.mensagem = "Erro no login: " + data.mensagem;
                $scope.dataAdminLogin.loading -= 1;
            }
        });
    };
});