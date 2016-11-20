app.controller("AdminDadosController", function($scope, $location, store, jwtHelper, AdminService, toastr) {
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
                },
            senha: {
                requerido: false,
                tamanho: false,
                difere: false
                }
            },
        senha2:null,
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
        
        //senha não é obrigatorio
        //$scope.dataAdmin.erro.senha.requerido = $scope.cadastroForm.senhaInput.$error.required === true;
        $scope.dataAdmin.erro.senha.tamanho = $scope.cadastroForm.senhaInput.$error.minlength === true;

        if($scope.dataAdmin.senha2 !== $scope.dataAdmin.dados.senha){
            $scope.dataAdmin.erro.senha.difere = true;
            return false;
        }
            
        
        
        //Verfica se as senhas são iguais, mas somente se a primeira é maior que o minimo
        if($scope.dataAdmin.dados.hasOwnProperty('senha') && $scope.dataAdmin.dados.senha != null && $scope.dataAdmin.dados.senha != '')
            $scope.dataAdmin.erro.senha.difere = !$scope.dataAdmin.erro.senha.tamanho &&
                ($scope.dataAdmin.senha2 != $scope.dataAdmin.dados.senha);
        
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
})