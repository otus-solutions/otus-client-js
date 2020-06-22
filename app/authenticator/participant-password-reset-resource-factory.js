(function () {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.ParticipantPasswordResetResourceFactory', ParticipantPasswordResetResourceFactory);

    ParticipantPasswordResetResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function ParticipantPasswordResetResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/participants/password-reset';

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
                        'email': '@email'
                    }
                },

                requestRecoveryLink: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '-link',
                    headers: headers.json,
                    data: {
                      'email': '@email'
                    }
                }
            });
        }
        return self;
    }
}());
