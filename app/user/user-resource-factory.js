(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.UserResourceFactory', UserResourceFactory);

    UserResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function UserResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/user';

        var self = this;

        /* Public methods */
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                create: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/signup',
                    headers: headers.json
                },
                logged: {
                    method: 'GET',
                    url: restPrefix + SUFFIX,
                    headers: headers.json
                },
                list: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/list',
                    headers: headers.json
                },
                enable: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/enable',
                    headers: headers.json
                },
                disable: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/disable',
                    headers: headers.json
                }
            });
        }

        return self;
    }

}());
