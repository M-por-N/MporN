app.controller("FreelancerTrabalhoAndamentoController", function($scope, $location, $window, store, jwtHelper, TrabalhoFreelancerService, toastr, SweetAlert, ModalService) {
    $scope.dataFreelancerTrabalhoAndamento = {
        loading: 0,
        dados: [],
        erro: {
            mensagem: null
        }
    };

    $scope.pesquisarAndamento = function() {

        $scope.filtro = {
            situacao: 2
        };

        $scope.dataFreelancerTrabalhoAndamento.loading += 1;
        TrabalhoFreelancerService.getTrabalhos($scope.filtro).then(function(data) {
            if (data.trabalhos) {
                $scope.dataFreelancerTrabalhoAndamento.dados = data.trabalhos;
                $scope.dataFreelancerTrabalhoAndamento.loading -= 1;
            }
            else {
                $scope.dataFreelancerTrabalhoAndamento.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            }
        });
    };

    $scope.pesquisarAndamento();


    $scope.concluirTrabalho = function(trabalho) {

        SweetAlert.swal({
            title: "Você tem certeza?",
            text: "Você irá concluir o trabalho '" + trabalho.nomeTrabalho + "'. Tem certeza?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, concluir agora!",
            cancelButtonText: "Cancelar"
        }).then(function() {
            $scope.params = {
                trabalho: trabalho.idTrabalho,
                situacao: 3
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
    
    
    $scope.mensagem = function(trabalho) {

        ModalService.showModal({
            templateUrl: "views/mensagem/mensagemModal.html",
            controller: "ListarMensagemController",
            inputs:{
                trabalho: trabalho,
                idt: 'F'
            }
        }).then(function(modal) {

            modal.element.modal();
            modal.close.then(function(result) {
            
            });
        });

    };
    
    
})
