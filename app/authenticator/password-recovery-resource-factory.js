(function () {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.otusPasswordRecoveryResourceFactory', OtusPasswordRecoveryResourceFactory);

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
                getRecovery: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/:userEmail',
                    headers: headers.json,
                    params: {
                        'userEmail': '@userEmail'
                    }
                },
                getValidationToken: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/validation/:token',
                    headers: headers.json,
                    params: {
                        'token': '@token'
                    }
                },
                updatePassword: {
                    method: 'PUT',
                    url: restPrefix + SUFFIX + '/update',
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
