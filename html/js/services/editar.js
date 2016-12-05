app.factory('EditarService', function($http) {
    var urlEditarAdmin = "/php/admin/editar-usuario/admin.php";
    var urlEditarFreelancer = "/php/admin/editar-usuario/cliente.php";
    var urlEditarCliente = "/php/admin/editar-usuario/freelancer.php";
    var urlEditarTrabalho = "/php/admin/alterar-trabalho.php";
    var urlEditarPlano = "/php/admin/alterar-plano.php";
    var urlEditarSenha = "/php/login/editarSenha.php";


    var editarAdmin = function(usuario) {
        return $http.post(urlEditarAdmin, usuario).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {
                    resultado: false,
                    mensagem: "Erro ao se comunicar com a servidor"
                };
            });
    };

    var editarCliente = function(usuario) {
        return $http.post(urlEditarFreelancer, usuario).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {
                    resultado: false,
                    mensagem: "Erro ao se comunicar com a servidor"
                };
            });
    };

    var editarFreelancer = function(usuario) {
        return $http.post(urlEditarCliente, usuario).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {
                    resultado: false,
                    mensagem: "Erro ao se comunicar com a servidor"
                };
            });
    };
    
    var atualizarSenha = function(dados) {
        return $http.post(urlEditarSenha, dados).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {
                    resultado: false,
                    mensagem: "Erro ao se comunicar com a servidor"
                };
            });
    };

    var editarTrabalho = function(trabalho) {
        return $http.post(urlEditarTrabalho, trabalho).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {
                    resultado: false,
                    mensagem: "Erro ao se comunicar com a servidor"
                };
            });
    };

    var editarPlano = function(plano) {
        return $http.post(urlEditarPlano, plano).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {
                    resultado: false,
                    mensagem: "Erro ao se comunicar com a servidor"
                };
            });
    };


    return {
        editarAdmin: editarAdmin,
        editarFreelancer: editarFreelancer,
        editarCliente: editarCliente,
        editarPlano: editarPlano,
        editarTrabalho: editarTrabalho,
        atualizarSenha: atualizarSenha
    };

});
