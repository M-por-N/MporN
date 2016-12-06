app.factory('ApagarService', function($http) {

    var urlApagar = "/php/admin/apagar/admin.php";

    var deleteAdmin = function(usuario) {
        return $http.post(urlApagar, usuario).then(
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
        deleteAdmin: deleteAdmin
    };
});
