app.controller("ClienteTrabalhoAbertoController", function($scope, $location, $window, store, jwtHelper, TrabalhoClienteService, toastr, SweetAlert, ModalService) {
    $scope.dataClienteTrabalhoAberto = {
        loading: 0,
        dados: [],
        erro: {
            mensagem: null
        }
    };


    $scope.pesquisarAberto = function() {

        $scope.filtro = {
            situacao: 1
        };

        $scope.dataClienteTrabalhoAberto.loading += 1;
        TrabalhoClienteService.getTrabalhos($scope.filtro).then(function(data) {
            if (data.trabalhos) {
                $scope.dataClienteTrabalhoAberto.dados = data.trabalhos;
                $scope.dataClienteTrabalhoAberto.loading -= 1;
            }
            else {
                $scope.dataClienteTrabalhoAberto.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
            }
        });
    };

    $scope.pesquisarAberto();

    $scope.removerTrabalho = function(trabalho) {

        SweetAlert.swal({
            title: "Você tem certeza?",
            text: "Você irá deletar o trabalho '" + trabalho.nomeTrabalho + "' do sistema. Tem certeza?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Sim, remover agora!",
            cancelButtonText: "Cancelar"
        }).then(function() {


            $scope.params = {
                trabalho: trabalho.idTrabalho
            };


            var resposta = TrabalhoClienteService.removerTrabalho($scope.params);
            resposta.then(function(data) {
                if (data.resultado == true) {

                    var index = $scope.dataClienteTrabalhoAberto.dados.indexOf(trabalho);
                    $scope.dataClienteTrabalhoAberto.dados.splice(index, 1);

                    SweetAlert.swal("Removido!", "Trabalho removido com sucesso.", "success");

                    toastr.success("Trabalho removido com sucesso");
                }
                else {
                    $scope.dataClienteTrabalhoAberto.erro.mensagem = "Erro no Remover: " + data.mensagem;
                    toastr.error("Error");
                }
            });

        }, function(dismiss) {

            SweetAlert.swal("Seu trabalho está salvo!");

        });

    };

    

    $scope.mensagem = function(trabalho) {

        ModalService.showModal({
            templateUrl: "views/mensagem/mensagemModal.html",
            controller: "ListarMensagemController",
            inputs:{
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
