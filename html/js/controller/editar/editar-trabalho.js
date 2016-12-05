app.controller("EditarTrabalhoController", function($scope, close, trabalho, toastr, SweetAlert, EditarService, StatusService) {

   $scope.trabalho = trabalho;

   $scope.close = function(result) {
      close(result, 500);
   };

   $scope.idStatus = trabalho.idStatus;

   $scope.listaStatus = [];

   StatusService.getStatus().then(function(data) {
      $scope.listaStatus = data.status;

   });

   $scope.setStatusTrabalho = function() {
      $scope.params = {
         idStatus: $scope.idStatus,
         idTrabalho: trabalho.idTrabalho
      };

      StatusService.setStatusTrabalho($scope.params).then(function(data) {
         if (data.resultado) {

            toastr.success("Situação alterada com sucesso!");
         }
         else {
            toastr.error("Erro no banco");
         }

      });
   }

   $scope.atualizarTrabalho = function(trabalho) {

      $scope.params = {
         idTrabalho: trabalho.idTrabalho,
         nomeTrabalho: trabalho.nomeTrabalho,
         descricaoTrabalho: trabalho.descricaoTrabalho,
         detalhadoTrabalho: trabalho.detalhadoTrabalho
      };

      EditarService.editarTrabalho($scope.params).then(function(data) {
         if (data.resultado) {

            toastr.success("Dados alterados com sucesso!");
         }
         else {
            toastr.error("Erro no banco");
         }
      });


   };
})
