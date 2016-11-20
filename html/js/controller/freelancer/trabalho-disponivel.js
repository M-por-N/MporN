app.controller("FreelancerTrabalhoDisponivelController", function($scope, $location, $window, store, jwtHelper, TrabalhoFreelancerService, toastr, SweetAlert) {
    $scope.dataFreelancerTrabalhoDisponivel = {
        loading: 0,
        dados: [],
        erro: {
            mensagem: null
        }
    };

    $scope.params = [];

    $scope.dataFreelancerTrabalhoDisponivel.loading += 1;
    TrabalhoFreelancerService.getDisponiveis().then(function(data) {
        if (data.trabalhos) {
            $scope.dataFreelancerTrabalhoDisponivel.dados = data.trabalhos;
            $scope.dataFreelancerTrabalhoDisponivel.loading = 0;
        }
        else {
            $scope.dataFreelancerTrabalhoDisponivel.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
        }
    });

    $scope.associarTrabalho = function(trabalho) {

        SweetAlert.swal({
            title: "Você tem certeza?",
            text: "Você irá associar o trabalho '" + trabalho.trabalhoNome + "'. Tem certeza?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, associar agora!",
            cancelButtonText: "Cancelar"
        }).then(function() {

            $scope.params = {
                trabalho: trabalho.id,
                situacao: 2
            };

            var resposta = TrabalhoFreelancerService.altera($scope.params);
            resposta.then(function(data) {
                if (data.resultado == true) {

                    var index = $scope.dataFreelancerTrabalhoDisponivel.dados.indexOf(trabalho);
                    $scope.dataFreelancerTrabalhoDisponivel.dados.splice(index, 1);

                    SweetAlert.swal("Associado!", "Trabalho associado com sucesso", "success");

                    toastr.success("Associado com sucesso");

                }
                else {
                    $scope.dataFreelancerTrabalhoDisponivel.erro.mensagem = "Erro na Associação: " + data.mensagem;
                    toastr.error("Error - Favor entrar em contato");
                }
            });
        }, function(dismiss) {

            SweetAlert.swal("Ok, sem associar!");

        });
    };
    
    
})
