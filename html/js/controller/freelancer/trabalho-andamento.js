app.controller("FreelancerTrabalhoAndamentoController", function($scope, $location, $window, store, jwtHelper, TrabalhoFreelancerService, toastr, SweetAlert) {
    $scope.dataFreelancerTrabalhoAndamento = {
        loading: 0,
        dados: [],
        erro: {
            mensagem: null
        }
    };

    $scope.dataFreelancerTrabalhoAndamento.loading += 1;
    TrabalhoFreelancerService.getAndamento().then(function(data) {
        if (data.trabalhos) {
            $scope.dataFreelancerTrabalhoAndamento.dados = data.trabalhos
            $scope.dataFreelancerTrabalhoAndamento.loading = 0;
        }
        else {
            $scope.dataFreelancerTrabalhoAndamento.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
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
            cancelButtonText: "Cancelar"
        }).then(function() {
            $scope.params = {
                trabalho: trabalho.id,
                situacao: 2
            };

            var resposta = TrabalhoFreelancerService.conclui($scope.params);
            resposta.then(function(data) {
                if (data.resultado == true) {

                    var index = $scope.dataFreelancerTrabalhoAndamento.dados.indexOf(trabalho);
                    $scope.dataFreelancerTrabalhoAndamento.dados.splice(index, 1);

                    SweetAlert.swal("Concluído!", "Trabalho foi concluido som sucesso", "success");

                    toastr.success("Concluido com sucesso");
                }
                else {
                    $scope.dataFreelancerTrabalhoAndamento.erro.mensagem = "Erro na Conclusão: " + data.mensagem;
                    toastr.error("Error");
                }
            });

        }, function(dismiss) {

            SweetAlert.swal("Ok, sem concluir!");

        });

    };
})
