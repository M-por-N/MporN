app.controller("EditarPlanoController", function($scope, close, plano, toastr, SweetAlert, EditarService) {

   $scope.plano = plano;

   $scope.close = function(result) {
      close(result, 500);
   };

   $scope.atualizarPlano = function(plano) {

      $scope.params = {
         idPlano: plano.idPlano,
         nomePlano: plano.nomePlano,
         descricaoCurta: plano.descricaocurta,
         valor: plano.valor
      };

      EditarService.editarPlano($scope.params).then(function(data) {
         if (data.resultado) {

            toastr.success("Dados alterados com sucesso!");
         }
         else {
            toastr.error("Erro no banco");
         }
      });


   };

})
