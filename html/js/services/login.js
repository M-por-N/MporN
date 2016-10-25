app.factory('LoginService', function($http) {
    var urlCliente = "/php/login/cliente.php";
    var urlFreelancer = "/php/login/freelancer.php";
    var urlAdmin = "/php/login/admin.php";
    
    var loginGeral = function(login, senha, url) {
        return $http.post(url, {login: login, senha: senha}).then(
            function sucesso(respostaServidor) {
                console.log(respostaServidor);
                return respostaServidor.data;
            },
            function erro(respostaServidor) {
                console.log('2:' + respostaServidor);
                return {resultado : false, mensagem : "Erro ao se comunicar com a servidor"};
        });
    }
    
    var loginCliente = function(login, senha) {
        return loginGeral(login, senha, urlCliente);
    }
    
    var loginFreelancer = function(login, senha) {
        return loginGeral(login, senha, urlFreelancer);
    }
    
    var loginAdmin = function(login, senha) {
        return loginGeral(login, senha, urlAdmin);
    }
    
    return {
        loginCliente: loginCliente,
        loginFreelancer: loginFreelancer,
        loginAdmin: loginAdmin
    };
});