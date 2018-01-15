# Otus - Api Java Script

Essa API tem como objetivo facilitar o acesso ao Back-End do projeto Otus para quem utiliza Java Script. 

## Definindo URL

``` javascript
(function() {

    angular
        .module('app')
        .run(['OtusRestResourceService', initConfiguration]);

    function initConfiguration(OtusRestResourceService, $window) {
        OtusRestResourceService.setUrl('http://api-otus.localhost:8080');
    }

}());
```

## Utilizando Resources
Existem varios resources disponiveis, cada um reponsável pelo acesso a um determinado conjunto de
recursos do Back-End.

Todos os resources estão disponiveis através da interface **OtusRestResourceService**.
Login no Sistema, exemplo:

``` javascript
(function() {
    'use strict';

    angular
        .module('module')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['OtusRestResourceService'];

    function LoginController(OtusRestResourceService) {
        $scope.authenticate = function(user) {
            var authenticatorResource = OtusRestResourceService.getAuthenticatorResource();

            authenticatorResource.authenticate(user, function(response) {
                OtusRestResourceService.setSecurityToken(response.data);
            });
        };
    }
})();
```




