(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.ParticipantResourceFactory', ParticipantResourceFactory);

    ParticipantResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function ParticipantResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '';

        var self = this;

        /* Public methods */
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                list: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/participants',
                    isArray: true,
                    headers: headers.json
                },
                listIndexers: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/list-indexers',
                    headers: headers.json
                }
            });
        }

        return self;
    }

}());
