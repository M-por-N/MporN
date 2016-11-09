app.controller("ClienteTrabalhoConcluidoController", function($scope, $location, store, jwtHelper, TrabalhoClienteService, SweetAlert, toastr) {
    $scope.dataClienteTrabalhoConcluido = {
        loading: 0,
        dados: []
    };

    var inputOptions = new Promise(function(resolve) {
        setTimeout(function() {
            resolve({
                '#ff0000': 'Red',
                '#00ff00': 'Green',
                '#0000ff': 'Blue'
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
            title: 'Select color',
            input: 'radio',
            inputOptions: inputOptions,
            inputValidator: function(result) {
                return new Promise(function(resolve, reject) {
                    if (result) {
                        resolve()
                    }
                    else {
                        reject('You need to select something!')
                    }
                })
            }
        }).then(function(result) {
            SweetAlert.swal({
                type: 'success',
                html: 'You selected: ' + result
            })
        })
    };
})
