(function() {
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
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/:userEmail',
                    headers: headers.json,
                    params: {
                        'userEmail': '@userEmail'
                    }
                },
                tokenValidation: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/validateToken/:tk',
                    headers: headers.json,
                    params: {
                        'tk': '@tk'
                    }
                }                
            });

        }

        return self;

    }

}());
