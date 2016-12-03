app.factory('AdminService', function($http) {
    var urlgetDados = "/php/admin/retorna-dados.php";
    var urlSetDados = "/php/admin/altera-dados.php";
    var urlCadastra = "/php/admin/cadastra.php";
    var urlBloqueiaFreelancer = "/php/admin/bloquear_freelancer.php";
    var urlBloqueiaCliente = "/php/admin/bloquear_cliente.php";
    var urlBloqueiaPlano = "/php/admin/bloquear_plano.php";
    var urlDesbloqueiaFreelancer = "/php/admin/desbloquear_freelancer.php";
    var urlDesbloqueiaCliente = "/php/admin/desbloquear_cliente.php";
    var urlDesbloqueiaPlano = "/php/admin/desbloquear_plano.php";

    var getDados = function(filtro) {
        return $http.get(urlgetDados).then(
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

    var setDados = function(dados) {
        return $http.post(urlSetDados, dados).then(
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

    var cadastra = function(usuario) {
        return $http.post(urlCadastra, usuario).then(
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

    var bloqueiaCliente = function(cliente) {
        return $http.post(urlBloqueiaCliente, cliente).then(
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

    var bloqueiaFreelancer = function(freelancer) {
        return $http.post(urlBloqueiaFreelancer, freelancer).then(
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
    
    var bloqueiaPlano = function(plano) {
        return $http.post(urlBloqueiaPlano, plano).then(
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
    
    var desbloqueiaCliente = function(cliente) {
        return $http.post(urlDesbloqueiaCliente, cliente).then(
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

    var desbloqueiaFreelancer = function(freelancer) {
        return $http.post(urlDesbloqueiaFreelancer, freelancer).then(
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
    
    var desbloqueiaPlano = function(plano) {
        return $http.post(urlDesbloqueiaPlano, plano).then(
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
        getDados: getDados,
        setDados: setDados,
        cadastra: cadastra,
        bloqueiaCliente: bloqueiaCliente,
        bloqueiaFreelancer: bloqueiaFreelancer,
        bloqueiaPlano: bloqueiaPlano,
        desbloqueiaCliente: desbloqueiaCliente,
        desbloqueiaFreelancer: desbloqueiaFreelancer,
        desbloqueiaPlano: desbloqueiaPlano
    };
});
