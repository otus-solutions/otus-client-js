(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.ActivityResourceFactory', ActivityResourceFactory);

    ActivityResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function ActivityResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/survey';

        var self = this;

        /* Public methods */
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                update: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/update',
                    headers: headers.json
                },
                list: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/list',
                    headers: headers.json
                },
                remove: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/remove',
                    headers: headers.json
                }
            });
        }

        return self;
    }

}());
