app.controller("EditarFreelancerController", function($scope, close, usuario, toastr, SweetAlert, EditarUsuarioService) {
   
    $scope.usuario = usuario;
   
   $scope.close = function(result) {
        close(result, 500);
    };
    
     $scope.atualizaDados = function() {
     
      EditarUsuarioService.editarFreelancer($scope.usuario).then(function(data) {
         if (data.resultado) {

            toastr.success("Dados alterados com sucesso!");
         }
         else {
            toastr.error("Erro no banco");
         }
      });
   }
})
