app.factory('IncluirService', function($http) {
    var urlIncluirAdmin = "/php/admin/incluir-admin.php";
    var urlIncluirCliente = "/php/admin/incluir-cliente.php";
    var urlIncluirFreelancer = "/php/admin/incluir-freelancer.php";
    var urlIncluirPlano = "/php/admin/incluir-plano.php";


    var incluirAdmin = function(admin) {
        return $http.post(urlIncluirAdmin, admin).then(
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

    var incluirCliente = function(cliente) {
        return $http.post(urlIncluirCliente, cliente).then(
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

    var incluirFreelancer = function(freelancer) {
        return $http.post(urlIncluirFreelancer, freelancer).then(
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

    var incluirPlano = function(plano) {
        return $http.post(urlIncluirPlano, plano).then(
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
        incluirAdmin: incluirAdmin,
        incluirCliente: incluirCliente,
        incluirFreelancer: incluirFreelancer,
        incluirPlano: incluirPlano
    };
});
