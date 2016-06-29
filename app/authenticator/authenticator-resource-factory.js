(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('OtusAuthenticatorResourceFactory', OtusAuthenticatorResourceFactory);

    OtusAuthenticatorResourceFactory.$inject = ['$resource', 'OtusRestResourceContext'];

    function OtusAuthenticatorResourceFactory($resource, OtusRestResourceContext) {
        var SUFFIX = '/authentication';

        var self = this;
        self.create = create;

        function create() {
            return $resource({}, {}, {
                authenticate: {
                    method: 'POST',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX,
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityToken()
                    }
                },
                invalidate: {
                    method: 'POST',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX + '/invalidate',
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityToken()
                    }
                },
                authenticateProject: {
                    method: 'POST',
                    url: OtusRestResourceContext.getRestPrefix() + SUFFIX + '/project',
                    headers: {
                        'Authorization': 'Bearer ' + OtusRestResourceContext.getSecurityToken()
                    }
                }
            });

        }

        return self;

    }

}());
