app.controller("ClienteTrabalhoAnaliseController", function($scope, $location, store, jwtHelper, TrabalhoClienteService, toastr, SweetAlert) {
    $scope.dataClienteTrabalhoAnalise = {
        loading: 0,
        dados: []
    };

    $scope.dataClienteTrabalhoAnalise.loading += 1;
    TrabalhoClienteService.getAnalise().then(function(data) {
        if (data.trabalhos) {
            $scope.dataClienteTrabalhoAnalise.dados = data.trabalhos;
            $scope.dataClienteTrabalhoAnalise.loading -= 1;
        }
        else {
            $scope.dataClienteTrabalhoAnalise.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
        }
    });

    $scope.concluirTrabalho = function(trabalho) {


        SweetAlert.swal({
                title: "Você tem certeza?",
                text: "Você irá concluir o trabalho '" + trabalho.trabalhoNome + "'. Tem certeza?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, concluir agora!",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {

                    $scope.params = {
                        trabalho: trabalho.id,
                        situacao: 3
                    };

                    var resposta = TrabalhoClienteService.conclui($scope.params);
                    resposta.then(function(data) {
                        if (data.resultado == true) {

                            var index = $scope.dataClienteTrabalhoAnalise.dados.indexOf(trabalho);
                            $scope.dataClienteTrabalhoAnalise.dados.splice(index, 1);

                            SweetAlert.swal("Concluído!", "Trabalho concluído com sucesso", "success");
                            toastr.success("Concluido com sucesso");
                        }
                        else {
                            $scope.dataClienteTrabalhoAnalise.erro.mensagem = "Erro na Conclusão: " + data.mensagem;
                            toastr.error("Error");
                        }
                    });

                }
                else {
                    SweetAlert.swal("Ok, sem concluir!");
                }
            });
    };

    $scope.devolverTrabalho = function(trabalho) {

        SweetAlert.swal({
                title: "Você tem certeza?",
                text: "Você irá devolver o trabalho '" + trabalho.trabalhoNome + "' para o freelancer. Tem certeza?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, devolver agora!",
                cancelButtonText: "Cancelar",
                closeOnConfirm: false,
                closeOnCancel: false
            },
            function(isConfirm) {
                if (isConfirm) {

                    $scope.params = {
                        trabalho: trabalho.id,
                        situacao: 1
                    };

                    var resposta = TrabalhoClienteService.devolver($scope.params);
                    resposta.then(function(data) {
                        if (data.resultado == true) {

                            var index = $scope.dataClienteTrabalhoAnalise.dados.indexOf(trabalho);
                            $scope.dataClienteTrabalhoAnalise.dados.splice(index, 1);

                            SweetAlert.swal("Devolvido!", "Trabalho devolvido com sucesso", "success");
                            toastr.success("Devolvido com sucesso");
                        }
                        else {
                            $scope.dataClienteTrabalhoAnalise.erro.mensagem = "Erro na Conclusão: " + data.mensagem;
                            toastr.error("Error");
                        }
                    });

                }

                else {
                    SweetAlert.swal("Ok, sem devolver!");
                }
            });
    };
})
