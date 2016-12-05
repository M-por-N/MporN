app.controller("ListarMensagemController", function($scope, close, trabalho, idt, MensagemService, toastr, SweetAlert) {

    $scope.titulo = {};
    $scope.mensagem = "";
    $scope.titulo = trabalho.nomeTrabalho;

    $scope.disableButton = false;

    $scope.listaMensagem = [];

    $scope.filtro = {

        trabalho: trabalho.idTrabalho
    };

    MensagemService.getMensagem($scope.filtro).then(function(data) {

        $scope.listaMensagem = data.mensagens;
    });



    $scope.close = function(result) {
        close(result, 500);
    };



    $scope.enviar = function(result) {

        if (!$scope.mensagem || !$scope.mensagem.length || $scope.mensagem.length<=5) {
            SweetAlert.swal(
                'Está estranho!',
                'Você está tentando se comunicar com o quê?',
                'error'
            )

            return;
        }

        $scope.disableButton = true;

        $scope.params = {
            mensagem: $scope.mensagem,
            trabalho: trabalho.idTrabalho,
            idt: idt
        };

        MensagemService.setMensagem($scope.params).then(function(data) {

            if (data.resultado == true) {

                var txt = '';
                if (idt == 'C') {
                    txt = 'Cliente';
                }
                else {
                    txt = 'Freelancer';
                }

                var newMensagem = {
                    texto: $scope.mensagem,
                    datahora: new Date(),
                    usuario: txt
                };

                var index = $scope.listaMensagem.indexOf(newMensagem);



                $scope.listaMensagem.push(angular.copy(newMensagem))

                $scope.mensagem = "";

                toastr.success("Mensagem Postada");

                $scope.disableButton = false;
            }
            else {
                $scope.dataClienteTrabalhoAberto.erro.mensagem = "Erro no Remover: " + data.mensagem;
                toastr.error("Error");
                $scope.disableButton = false;
            }
        });

    };



});
