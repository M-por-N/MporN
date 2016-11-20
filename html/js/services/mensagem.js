app.factory('MensagemService', function($http) {
    var urlRetornarMensagem = "/php/mensagem/retornar-mensagem.php";
    var urlSetMensagem = "/php/mensagem/inserir-mensagem.php";

    
    var getMensagem = function(trabalho) {
        return $http.post(urlRetornarMensagem, trabalho).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {
                    resultado: false,
                    mensagem: "Erro ao se comunicar com o servidor"
                };
            });
    };
    
    var setMensagem = function(params) {
        return $http.post(urlSetMensagem, params).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {
                    resultado: false,
                    mensagem: "Erro ao se comunicar com o servidor"
                };
            });
    };

    return {
        getMensagem: getMensagem,
        setMensagem: setMensagem
    };
});
