app.factory('GraficoService', function($http) {
    var urlGetTrabalho = "/php/admin/grafico/trabalho.php";


    var getTrabalho = function() {
        return $http.get(urlGetTrabalho).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com a servidor"};
            });
    };

   
    
    return {
        getTrabalho: getTrabalho
    };
});