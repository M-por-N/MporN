app.controller("ClienteTrabalhoConcluidoController", function($scope, $location, store, jwtHelper, TrabalhoClienteService, SweetAlert, toastr) {
    $scope.dataClienteTrabalhoConcluido = {
        loading: 0,
        dados: []
    };

    var inputRank = new Promise(function(resolve) {
        setTimeout(function() {
            resolve({
                'Ótimo': 'Ótimo',
                'Bom': 'Bom',
                'Ruim': 'Ruim'
            })
        }, 2000)
    });

    $scope.dataClienteTrabalhoConcluido.loading += 1;
    TrabalhoClienteService.getConcluidos().then(function(data) {
        if (data.trabalhos) {
            $scope.dataClienteTrabalhoConcluido.dados = data.trabalhos;
            $scope.dataClienteTrabalhoConcluido.loading -= 1;
        }
        else {
            $scope.dataClienteTrabalhoConcluido.erro = "Erro ao receber dados do servidor"; //TODO: mensagem de erro do servidor
        }
    });



    $scope.avaliarTrabalho = function(trabalho) {

        SweetAlert.swal({
            title: 'Selecione o rank do freelancer',
            input: 'radio',
            inputOptions: inputRank,
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
            SweetAlert.swal({
                type: 'success',
                html: 'Você selecionou: ' + result
            })
        })
    };
})
