app.controller("EditarPlanoController", function($scope, close, plano, toastr, SweetAlert, EditarService, StatusService) {

   $scope.plano = plano;

   $scope.close = function(result) {
      close(result, 500);
   };

   $scope.idStatus = plano.idStatus;

   $scope.listaStatus = [];

   StatusService.getStatus().then(function(data) {
      $scope.listaStatus = data.status;

   });

   $scope.setStatusPlano = function() {
      $scope.params = {
         idStatus: $scope.idStatus,
         idPlano: plano.idPlano
      };

      StatusService.setStatusPlano($scope.params).then(function(data) {
         if (data.resultado) {

            toastr.success("Situação alterada com sucesso!");
         }
         else {
            toastr.error("Erro no banco");
         }

      });
   }

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
