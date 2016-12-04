app.factory('TrabalhoClienteService', function($http) {
    var urlAvaliacao = "/php/cliente/avaliacao.php";
    var urlAvaliar = "/php/cliente/avaliar-freelancer.php";
    var urlTrabalhos = "/php/cliente/retorna-trabalho.php";
    var urlCadastraTrabalho = "/php/cliente/criar-trabalho.php";
    var urlRemoverTrabalho = "/php/cliente/remover-trabalho.php";
    var urlConcluiTrabalho = "/php/cliente/concluir-trabalho.php";
    var urlDevolviTrabalho = "/php/cliente/devolver-trabalho.php"
    //TODO: var urlCadastra = "/php/cliente/cadastra-trabalho.php";
    
    var getAvaliacao = function() {
        return $http.get(urlAvaliacao).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com a servidor"};
            });
    }
    
    var avaliar = function(avaliar) {
        return $http.post(urlAvaliar, avaliar).then(
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
    
    var cadastrarTrabalho = function(trabalho) {
        return $http.post(urlCadastraTrabalho, trabalho).then(
            function sucesso(respostaServidor) {
                console.log(respostaServidor);
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com o servidor"};
            });
    }
    
    var removerTrabalho = function(trabalho) {
        return $http.post(urlRemoverTrabalho, trabalho).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com o servidor"};
            });
    }
    
    var conclui = function(trabalho) {
        return $http.post(urlConcluiTrabalho, trabalho).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com o servidor"};
            });
    }
    
    var devolver = function(trabalho) {
        return $http.post(urlDevolviTrabalho, trabalho).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com o servidor"};
            });
    }
    
    
    return {
        getTrabalhos: getTrabalhos,
        cadastrarTrabalho: cadastrarTrabalho,
        removerTrabalho: removerTrabalho,
        getAvaliacao: getAvaliacao,
        conclui: conclui,
        devolver: devolver,
        avaliar: avaliar
    };
});