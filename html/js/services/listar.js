app.factory('ListarService', function($http) {
    var urlListarAdmin = "/php/admin/listar-admin.php";
    var urlListarCliente = "/php/admin/listar-cliente.php";
    var urlListarFreelancer = "/php/admin/listar-freelancer.php";
    var urlListarTrabalho = "/php/admin/listar-trabalho.php";

    var listarAdmin = function(filtro) {
        return $http.get(urlListarAdmin).then(
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

    var listarCliente = function(filtro) {
        return $http.get(urlListarCliente).then(
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
    
    var listarFreelancer = function(filtro) {
        return $http.get(urlListarFreelancer).then(
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
    
    var listarTrabalho = function(filtro) {
        return $http.get(urlListarTrabalho).then(
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
        listarAdmin: listarAdmin,
        listarCliente: listarCliente,
        listarFreelancer: listarFreelancer,
        listarTrabalho: listarTrabalho
    };
});
