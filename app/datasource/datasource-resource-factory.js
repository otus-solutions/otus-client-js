(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.DatasourceResourceFactory', DatasourceResourceFactory);

    DatasourceResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function DatasourceResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/configuration/datasources';
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
                    url: restPrefix + SUFFIX,
                    headers: headers.json
                },
                getByID: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/:idx',
                    headers: headers.json,
                    params: {
                        'idx': '@idx'
                    }
                }
            });
        }

        return self;
    }

}());
