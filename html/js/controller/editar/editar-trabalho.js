app.controller("EditarTrabalhoController", function($scope, close, trabalho, toastr, SweetAlert, EditarService) {

   $scope.trabalho = trabalho;

   $scope.close = function(result) {
      close(result, 500);
   };

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
