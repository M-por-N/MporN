app.controller("ClienteTrabalhoConcluidoController", function($scope, $location, store, jwtHelper, TrabalhoClienteService, SweetAlert, toastr, ModalService) {
    $scope.dataClienteTrabalhoConcluido = {
        loading: 0,
        dados: [],
        avaliacao: {}
    };



    TrabalhoClienteService.getAvaliacao().then(function(data) {

        var novaLista = [];
        angular.forEach(data, function(item) {
            novaLista.push(item.descricao)
        });
        $scope.dataClienteTrabalhoConcluido.avaliacao = novaLista;
    });




    $scope.pesquisarConcluido = function() {

        $scope.filtro = {
            situacao: 4
        };

        $scope.dataClienteTrabalhoConcluido.loading += 1;
        TrabalhoClienteService.getTrabalhos($scope.filtro).then(function(data) {
            if (data.trabalhos) {
                $scope.dataClienteTrabalhoConcluido.dados = data.trabalhos;
                $scope.dataClienteTrabalhoConcluido.loading -= 1;
            }
            else {
                $scope.dataClienteTrabalhoConcluido.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            }
        });
    };

    $scope.pesquisarConcluido();


    $scope.avaliarTrabalho = function(trabalho) {

        SweetAlert.swal({
            title: 'Avalie o trabalho do Freelancer',
            input: 'radio',
            inputOptions: $scope.dataClienteTrabalhoConcluido.avaliacao,
            inputValidator: function(result) {
                return new Promise(function(resolve, reject) {
                    if (result) {
                        resolve()
                    }
                    else {
                        reject('Você precisar selecionar alguma coisa!')
                    }
                })
            }
        }).then(function(result) {

            var avaliacao = parseInt(result) + 1;

            $scope.params = {
                trabalho: trabalho.id,
                avaliacao: avaliacao
            };

            var resposta = TrabalhoClienteService.avaliar($scope.params);
            resposta.then(function(data) {
                if (data.resultado == true) {

                    SweetAlert.swal("Avaliado!", "Trabalho foi avaliado com sucesso.", "success");
                    $scope.pesquisarConcluido();
                }
                else {
                    $scope.dataClienteTrabalhoConcluido.erro.mensagem = "Erro na Conclusão: " + data.mensagem;
                    toastr.error("Error");
                }
            });


        })
    };


    $scope.mensagem = function(trabalho) {

        ModalService.showModal({
            templateUrl: "views/mensagem/mensagemModal.html",
            controller: "ListarMensagemController",
            inputs: {
                trabalho: trabalho,
                idt: 'C'
            }
        }).then(function(modal) {

            modal.element.modal();
            modal.close.then(function(result) {

            });
        });

    };
})
