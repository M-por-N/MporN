app.factory('TrabalhoFreelancerService', function($http) {
    var urlDisponiveis = "/php/freelancer/trabalho-disponivel.php";
    var urlTrabalhos = "/php/freelancer/retorna-trabalho.php";
    var urlAltera = "/php/freelancer/altera-trabalho.php";
    var urlConclui = "/php/freelancer/concluir-trabalho.php";
    //TODO: var urlCadastra = "/php/cliente/cadastra-trabalho.php";
    
    
    var getDisponiveis = function(filtro) {
        return $http.post(urlDisponiveis, {filtro: filtro}).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com a servidor"};
            });
    }
    
    
    
    var getTrabalhos = function(filtro) {
        return $http.post(urlTrabalhos, filtro).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com a servidor"};
            });
    }
    
    var altera = function(modificacoes) {
        return $http.post(urlAltera, modificacoes).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com a servidor"};
            });
    }
    
    var conclui = function(modificacoes) {
        return $http.post(urlConclui, modificacoes).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com a servidor"};
            });
    }
    
    
    return {
        getDisponiveis: getDisponiveis,
        getTrabalhos: getTrabalhos,
        altera: altera,
        conclui: conclui
    };
});