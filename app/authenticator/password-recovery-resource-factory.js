(function () {
    'use strict';

    angular
        .module('otus.client')
        .factory('OtusPasswordRecoveryResourceFactory', OtusPasswordRecoveryResourceFactory);

    OtusPasswordRecoveryResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function OtusPasswordRecoveryResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/password-recovery';

        var self = this;
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                passwordRecovery: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/:userEmail',
                    headers: headers.json,
                    params: {
                        'userEmail': '@userEmail'
                    }
                },
                tokenValidation: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/validateToken/:tk',
                    headers: headers.json,
                    params: {
                        'tk': '@tk'
                    }
                },
                passwordUpdate: {
                    method: 'PUT',
                    url: restPrefix + SUFFIX + '/passwordUpdate',
                    headers: headers.json,
                    data: {
                        'password': '@password'
                    }
                }

            });

        }

        return self;

    }

}());
