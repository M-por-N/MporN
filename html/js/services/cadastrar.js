app.factory('CadastrarService', function($http) {

    var urlAdmin = "/php/cadastro/admin.php";
    var urlCliente = "/php/cadastro/cliente.php";
    var urlFreelancer = "/php/cadastro/freelancer.php";
    var urlPlano = "/php/cadastro/plano.php";


    var cadastraAdmin = function(usuario) {
        return $http.post(urlAdmin, usuario).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com o servidor"};
            });
    };
    
    var cadastraCliente = function(usuario) {
        return $http.post(urlCliente, usuario).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com o servidor"};
            });
    };
    
    var cadastraFreelancer = function(usuario) {
        return $http.post(urlFreelancer, usuario).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com o servidor"};
            });
    };
    
    var cadastrarPlano = function(usuario) {
        return $http.post(urlPlano, usuario).then(
            function sucesso(respostaServidor) {
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                return {resultado : false, mensagem: "Erro ao se comunicar com o servidor"};
            });
    };

    return {
        cadastraAdmin: cadastraAdmin,
        cadastraCliente: cadastraCliente,
        cadastraFreelancer: cadastraFreelancer
    };
});