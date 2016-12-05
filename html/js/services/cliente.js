app.factory('ClienteService', function($http) {
    var urlgetDados = "/php/cliente/retorna-dados.php";
    var urlSetDados = "/php/cliente/altera-dados.php";
    var urlCadastra = "/php/cliente/cadastra.php";

    var getDados = function(filtro) {
        return $http.get(urlgetDados).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com o servidor"};
            });
    };

    var setDados = function(dados) {
        return $http.post(urlSetDados, dados).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com o servidor"};
            });
    };

    var cadastra = function(usuario) {
        return $http.post(urlCadastra, usuario).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com o servidor"};
            });
    };
    
    
    return {
        getDados: getDados,
        setDados: setDados,
        cadastra: cadastra
    };
});