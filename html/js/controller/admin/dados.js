app.controller("AdminDadosController", function($scope, $location, store, jwtHelper, AdminService, toastr, ModalService) {
    $scope.dataAdmin = {
        loading: 0,
        erro: {
            mensagem: null,
            nome: {
                requerido: false,
                tamanho: false
                },
            email: {
                requerido: false,
                invalido: false
                },
            cpfcnpj: {
                requerido: false,
                invalido: false
                }
            },
        dados: {}
    };    
    
    function cadastraValido() {
        $scope.dataAdmin.erro.nome.requerido = $scope.cadastroForm.nomeInput.$error.required === true;
        $scope.dataAdmin.erro.nome.tamanho = $scope.cadastroForm.nomeInput.$error.minlength === true; //evita undefined
        
        $scope.dataAdmin.erro.email.requerido = $scope.cadastroForm.emailInput.$error.required === true;
        $scope.dataAdmin.erro.email.invalido = $scope.cadastroForm.emailInput.$error.email === true;
        
        $scope.dataAdmin.erro.cpfcnpj.requerido = $scope.cadastroForm.cpfcnpjInput.$error.required === true;
        $scope.dataAdmin.erro.cpfcnpj.invalido = //se não for preenchido não verfica por validade
            (!$scope.dataAdmin.erro.cpfcnpj.requerido && !$scope.cadastroForm.cpfcnpjInput.$valid);
        
    
        
        return $scope.cadastroForm.$valid;
    }

    $scope.atualizaAdminDados = function() {
        if (!cadastraValido()) {
            return;
        }
        $scope.dataAdmin.loading += 1;
        AdminService.setDados($scope.dataAdmin.dados).then(function(data) {
            if (data.resultado) {
                $location.path('/admin');
                toastr.success("Dados alterados com sucesso!");
                $scope.dataAdmin.loading = 0;
            } else {
                $scope.dataAdmin.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
                $scope.dataAdmin.loading = 0;
            }
        });
    }

    $scope.dataAdmin.loading += 2;
    AdminService.getDados().then(function(data) {
        if (data) {
            $scope.dataAdmin.dados = data;
            $scope.dataAdmin.senha2 = $scope.dataAdmin.dados.senha;
            $scope.dataAdmin.loading = 0;
        } else {
            $scope.dataAdmin.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            $scope.dataAdmin.loading = 0;
        }
    });
    
    $scope.alterarSenha = function(usuario) {

        ModalService.showModal({
            templateUrl: "views/modal/alterarSenha.html",
            controller: "AlterarSenhaController",
            inputs: {
                usuario: usuario
            }
        }).then(function(modal) {

            modal.element.modal();
            modal.close.then(function(result) {

            });
        });
    }
})