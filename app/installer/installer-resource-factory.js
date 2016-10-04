(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('OtusInstallerResourceFactory', OtusInstallerResourceFactory);

    OtusInstallerResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function OtusInstallerResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/installer';

        var self = this;
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                ready: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/ready',
                    headers: headers.json
                },
                config: {
                    method: 'POST',
                    url: restPrefix + SUFFIX,
                    headers: headers.json

                },
                validationEmail: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/validation/email',
                    headers: headers.json
                }

            });
        }

        return self;
    }

}());
