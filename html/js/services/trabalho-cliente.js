app.factory('TrabalhoClienteService', function($http) {
    var urAbertos = "/php/cliente/trabalho-aberto.php";
    var urlAssinados = "/php/cliente/trabalho-assinado.php";
    var urlConcluidos = "/php/cliente/trabalho-concluido.php";
    var urlAnalise = "/php/cliente/trabalho-analise.php";
    var urlCadastraTrabalho = "/php/cliente/criar-trabalho.php";
    var urlRemoverTrabalho = "/php/cliente/remover-trabalho.php";
    var urlConcluiTrabalho = "/php/cliente/concluir-trabalho.php";
    var urlDevolviTrabalho = "/php/cliente/devolver-trabalho.php"
    //TODO: var urlCadastra = "/php/cliente/cadastra-trabalho.php";
    
    
    var getAbertos = function(filtro) {
        return $http.post(urAbertos, {filtro: filtro}).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com a servidor"};
            });
    }
    var getAssinados = function(filtro) {
        return $http.post(urlAssinados, {filtro: filtro}).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com a servidor"};
            });
    }
    var getConcluidos = function(filtro) {
        return $http.post(urlConcluidos, {filtro: filtro}).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com a servidor"};
            });
    }
    
    var getAnalise = function(filtro) {
        return $http.post(urlAnalise, {filtro: filtro}).then(
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
        getAbertos: getAbertos,
        getAssinados: getAssinados,
        getConcluidos: getConcluidos,
        getAnalise: getAnalise,
        cadastrarTrabalho: cadastrarTrabalho,
        removerTrabalho: removerTrabalho,
        conclui: conclui,
        devolver: devolver
    };
});