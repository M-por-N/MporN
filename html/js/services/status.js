app.factory('StatusService', function($http) {
    var urlListarStatus = "/php/status.php";
    var urlAlterarStatus = "/php/admin/alterar-status/alterar-status.php";
    
    var getStatus = function() {
        return $http.get(urlListarStatus).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com a servidor"};
            });
    };
    
    var setStatus = function(params) {
        return $http.post(urlAlterarStatus, params).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com a servidor"};
            });
    };
    
        return {
        getStatus: getStatus,
        setStatus: setStatus
    };
    
    
});