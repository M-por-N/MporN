app.controller("ListarMensagemController", function($scope, close, trabalho, idt, MensagemService) {

    $scope.titulo = {};
    $scope.mensagem = "";
    $scope.titulo = trabalho.trabalhoNome;

    $scope.listaMensagem = [];

    $scope.filtro = {

        trabalho: trabalho.id
    };

    MensagemService.getMensagem($scope.filtro).then(function(data) {

        $scope.listaMensagem = data.mensagens;
    });



    $scope.close = function(result) {
        close(result, 500); // close, but give 500ms for bootstrap to animate
    };


    $scope.enviar = function(result) {

        $scope.params = {
            mensagem: $scope.mensagem,
            trabalho: trabalho.id,
            idt: idt
        };

        MensagemService.setMensagem($scope.params).then(function(data) {

            if (data.resultado == true) {
                
                var txt = '';
                if(idt=='C'){
                    txt = 'Cliente';
                }else{
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


            }
            else {
                $scope.dataClienteTrabalhoAberto.erro.mensagem = "Erro no Remover: " + data.mensagem;
                toastr.error("Error");
            }
        });

    };



});
