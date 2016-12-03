app.controller("ListarPlanoController", function($scope, $location, store, jwtHelper, ListarService, AdminService, toastr, SweetAlert) {
    $scope.dataListarPlano = {
        loading: 0,
        erro: {
            mensagem: null
            },
        dados: []
    };    
    $scope.dataPlanoBloquear = {
        loading: 0,
        erro: {
            mensagem: null
            },
        dados: []
    }; 
    
  
    $scope.dataListarPlano.loading += 1;
    ListarService.listarPlano().then(function(data) {
        if (data) {
            $scope.dataListarPlano.dados = data.plano;
            
            $scope.dataListarPlano.loading = 0;
        } else {
            $scope.dataListarPlano.erro.mensagem = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            $scope.dataListarPlano.loading -= 1;
        }
    });
    
    $scope.bloqueiaPlano = function(plano) {
         SweetAlert.swal({
            title: "Você tem certeza?",
            text: "Você irá bloquear o plano '" + plano.nome + "'. Tem certeza?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, bloquear agora!",
            cancelButtonText: "Cancelar"
        }).then(function() {

            $scope.dataPlanoBloquear.loading += 1;
            var resposta = AdminService.bloqueiaPlano(plano);
            resposta.then(function(data) {
                if (data.resultado == true) {
                    $scope.dataPlanoBloquear.loading -= 1;
                    $location.path('/admin/listar-plano');
                    toastr.success("Bloqueado com sucesso!");
                }
                else {
                    $scope.dataPlanoBloquear.erro.mensagem = "Erro no Bloqueio: " + data.mensagem;
                    $scope.dataPlanoBloquear.loading -= 1;
                }
            });
        });
    };
    
    $scope.desbloqueiaPlano = function(plano) {
         SweetAlert.swal({
            title: "Você tem certeza?",
            text: "Você irá desbloquear o plano '" + plano.nome + "'. Tem certeza?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, desbloquear agora!",
            cancelButtonText: "Cancelar"
        }).then(function() {

            $scope.dataPlanoBloquear.loading += 1;
            var resposta = AdminService.desbloqueiaPlano(plano);
            resposta.then(function(data) {
                if (data.resultado == true) {
                    $scope.dataPlanoBloquear.loading -= 1;
                    $location.path('/admin/listar-plano');
                    toastr.success("Desloqueado com sucesso!");
                }
                else {
                    $scope.dataPlanoBloquear.erro.mensagem = "Erro no Desbloqueio: " + data.mensagem;
                    $scope.dataPlanoBloquear.loading -= 1;
                }
            });
        });
    };
    
    
    
})