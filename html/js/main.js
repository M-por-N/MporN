var app = angular.module('mporn', ['ngRoute', 'angular-storage', 'angular-jwt', 'ui.mask', 'ngCpfCnpj', 'toastr', 'ngSweetAlert']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        redirectTo: '/inicio'
    }).when('/inicio', {
        templateUrl: 'views/inicio.html',
        controller: 'InicioController'
    }).when('/planos', {
        templateUrl: 'views/planos.html',
        controller: 'PlanosController'
    }).when('/login/freelancer', {
        templateUrl: 'views/login/freelancer.html',
        controller: 'LoginFreelancerController'
    }).when('/login/cliente', {
        templateUrl: 'views/login/cliente.html',
        controller: 'LoginClienteController'
    }).when('/login/admin', {
        templateUrl: 'views/login/admin.html',
        controller: 'LoginAdminController'
    }).when('/cadastro/freelancer', {
        templateUrl: 'views/cadastro/freelancer.html',
        controller: 'CadastroFreelancerController'
    }).when('/cadastro/cliente', {
        templateUrl: 'views/cadastro/cliente.html',
        controller: 'CadastroClienteController'
    }).when('/cadastro/admin', {
        templateUrl: 'views/cadastro/admin.html',
        controller: 'CadastroAdminController'
    }).when('/freelancer', {
        redirectTo: '/freelancer/disponivel'
    }).when('/cliente', {
        redirectTo: '/cliente/aberto'
    }).when('/cliente/criar-trabalho', {
        templateUrl: 'views/cliente/criar-trabalho.html',
        controller: 'ClienteCriarTrabalhoController'
    }).when('/cliente/dados', {
        templateUrl: 'views/cliente/dados.html',
        controller: 'ClienteDadosController'
    }).when('/cliente/aberto', {
        templateUrl: 'views/cliente/trabalho-aberto.html',
        controller: 'ClienteTrabalhoAbertoController'
    }).when('/cliente/assinado', {
        templateUrl: 'views/cliente/trabalho-assinado.html',
        controller: 'ClienteTrabalhoAssinadoController'
    }).when('/cliente/analise', {
        templateUrl: 'views/cliente/trabalho-analise.html',
        controller: 'ClienteTrabalhoAnaliseController'
    }).when('/cliente/concluido', {
        templateUrl: 'views/cliente/trabalho-concluido.html',
        controller: 'ClienteTrabalhoConcluidoController'
    }).when('/freelancer/disponivel', {
        templateUrl: 'views/freelancer/trabalho-disponivel.html',
        controller: 'FreelancerTrabalhoDisponivelController'
    }).when('/freelancer/analise', {
        templateUrl: 'views/freelancer/trabalho-analise.html',
        controller: 'FreelancerTrabalhoAnaliseController'
    }).when('/freelancer/andamento', {
        templateUrl: 'views/freelancer/trabalho-andamento.html',
        controller: 'FreelancerTrabalhoAndamentoController'
    }).when('/freelancer/concluido', {
        templateUrl: 'views/freelancer/trabalho-concluido.html',
        controller: 'FreelancerTrabalhoConcluidoController'
    }).when('/freelancer/dados', {
        templateUrl: 'views/freelancer/dados.html',
        controller: 'FreelancerDadosController'
    }).when('/admin/', {
        redirectTo: '/admin/incluir-admin'
    }).when('/admin/incluir-admin', {
        templateUrl: 'views/admin/incluir-admin.html',
        controller: 'IncluirAdminController'
    }).when('/admin/incluir-cliente', {
        templateUrl: 'views/admin/incluir-cliente.html',
        controller: 'IncluirClienteController'
    }).when('/admin/incluir-freelancer', {
        templateUrl: 'views/admin/incluir-freelancer.html',
        controller: 'IncluirFreelancerController'
    }).when('/admin/incluir-plano', {
        templateUrl: 'views/admin/incluir-plano.html',
        controller: 'IncluirPlanoController'
    }).when('/admin/dados', {
        templateUrl: 'views/admin/dados.html',
        controller: 'AdminDadosController'
    }).when('/admin/listar-admin', {
        templateUrl: 'views/admin/listar-admin.html',
        controller: 'ListarAdminController'
    }).when('/admin/listar-cliente', {
        templateUrl: 'views/admin/listar-cliente.html',
        controller: 'ListarClienteController'
    }).when('/admin/listar-freelancer', {
        templateUrl: 'views/admin/listar-freelancer.html',
        controller: 'ListarFreelancerController'
    }).when('/admin/listar-trabalho', {
        templateUrl: 'views/admin/listar-trabalho.html',
        controller: 'ListarTrabalhoController'
    }).when('/admin/listar-plano', {
        templateUrl: 'views/admin/listar-plano.html',
        controller: 'ListarPlanoController'
    }).when('/mporn/sobre', {
        templateUrl: 'views/mporn/sobre.html',
        controller: 'SobreController'
    }).otherwise({
        redirectTo: '/'
    });
}]);

app.config(function Config($httpProvider, jwtInterceptorProvider) {
    jwtInterceptorProvider.tokenGetter = ['store', function(store) {
        return store.get('jwt');
    }];

    $httpProvider.interceptors.push('jwtInterceptor');
})

app.controller("MainController", function($scope, $location, store, jwtHelper, LoginService) {
    $scope.dataMain = {isLoged: false, loading: false, usuario: {}};
    
    $scope.isTelaAtiva = function (viewLocation) { 
        return viewLocation === $location.path();
    };
    
    $scope.getTelaAtiva = function (viewLocation) { 
        return $location.path();
    };
    
    $scope.logout = function() {
        $scope.dataMain.isLoged = false;
        store.remove('jwt');
        $scope.dataMain.usuario = {};
        $location.path('/');
    }

    $scope.login = function(usuario) {
        alert("Erro login não implementado");
    };
    
    var jwt = store.get('jwt');
    if(store.get('jwt') == null){
        //não logado
        $scope.dataMain.isLoged = false;
        $scope.dataMain.usuario = {};
    } else if(jwtHelper.isTokenExpired(jwt)) {
        //logado, mas o login expirou
        $scope.dataMain.isLoged = false;
        $scope.dataMain.usuario = {};
        store.remove('jwt');
    } else {
        //logado e valido
        $scope.dataMain.usuario = jwtHelper.decodeToken(jwt).data;
        $scope.dataMain.isLoged = true;
    }
});