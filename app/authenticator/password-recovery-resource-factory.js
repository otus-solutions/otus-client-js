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
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/:userEmail',
                    headers: headers.json,
                    data: {
                        'url': '@url'
                    },
                    params: {
                        'userEmail': '@userEmail'
                    }
                },

                updatePassword: {
                    method: 'PUT',
                    url: restPrefix + SUFFIX + '/update' + '/:token',
                    headers: headers.json,
                    data: {
                        'password': '@password'
                    },
                    params: {
                        'token': '@token'
                    }
                }

            });

        }

        return self;

    }

}());
