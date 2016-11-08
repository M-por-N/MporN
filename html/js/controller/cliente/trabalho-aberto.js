app.controller("ClienteTrabalhoAbertoController", function($scope, $location, $window, store, jwtHelper, TrabalhoClienteService, toastr, SweetAlert) {
    $scope.dataClienteTrabalhoAberto = {
        loading: 0,
        dados: [],
        erro: {
            mensagem: null
        }
    };

    $scope.dataClienteTrabalhoAberto.loading += 1;
    TrabalhoClienteService.getAbertos().then(function(data) {
        if (data.trabalhos) {
            $scope.dataClienteTrabalhoAberto.dados = data.trabalhos;
            $scope.dataClienteTrabalhoAberto.loading = 0;
        }
        else {
            $scope.dataClienteTrabalhoAberto.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
        }
    });

    $scope.removerTrabalho = function(trabalho) {

        SweetAlert.swal({
                title: "Você tem certeza?",
                text: "Você irá deletar o trabalho '" + trabalho.trabalhoNome + "' do sistema. Tem certeza?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, remover agora!",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {

                    $scope.params = {
                        trabalho: trabalho.id
                    };


                    var resposta = TrabalhoClienteService.removerTrabalho($scope.params);
                    resposta.then(function(data) {
                        if (data.resultado == true) {

                            var index = $scope.dataClienteTrabalhoAberto.dados.indexOf(trabalho);
                            $scope.dataClienteTrabalhoAberto.dados.splice(index, 1);
                            
                            SweetAlert.swal("Apagado!");
                            
                            toastr.success("Trabalho removido com sucesso");
                        }
                        else {
                            $scope.dataClienteTrabalhoAberto.erro.mensagem = "Erro no Remover: " + data.mensagem;
                            toastr.error("Error");
                        }
                    });
 
                }
                else {
                    SweetAlert.swal("Seu trabalho está salvo!");
                }
            });

    };
})
