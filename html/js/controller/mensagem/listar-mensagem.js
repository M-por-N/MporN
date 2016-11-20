app.controller("ListarMensagemController", function($scope, Trabalho, $uibModal, MensagemService) {
    $scope.dataMensagem = {
        loading: 0,
        dados: [],
        erro: {
            mensagem: null
        }
    };


})
