app.factory('QuadroService', function($http) {
    var urlQuadroCliente = "/php/quadro/cliente.php";
    var urlQuadroFreelancer = "/php/quadro/freelancer.php";
    var urlQuadroAdmin = "/php/quadro/admin.php";

    var getCliente = function() {
        return $http.get(urlQuadroCliente).then(
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

    var getAdmin = function() {
        return $http.get(urlQuadroAdmin).then(
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

    var getFreelancer = function() {
        return $http.get(urlQuadroFreelancer).then(
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
        getCliente: getCliente,
        getAdmin: getAdmin,
        getFreelancer: getFreelancer
    };
});
