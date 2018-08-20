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
                requestRecovery: {
                    method: 'POST',
                    url: restPrefix + SUFFIX,
                    headers: headers.json,
                    data: {
                        'email': '@email',
                        'url': '@url'
                    }
                },

                validationToken: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/validate/:token',
                    headers: headers.json,
                    params: {
                        'token': '@token'
                    }
                },

                updatePassword: {
                    method: 'PUT',
                    url: restPrefix + SUFFIX,
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
