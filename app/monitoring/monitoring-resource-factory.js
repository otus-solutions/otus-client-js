(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('OtusMonitoringResourceFactory', OtusMonitoringResourceFactory);

        OtusMonitoringResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function OtusMonitoringResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/monitoring';

        var self = this;
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
                listAcronyms: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + "/activities",
                    headers: headers.json                    
                },
                find: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + "/activities/:acronym",
                    headers: headers.json,
                    params: {
                        'acronym': '@acronym'
                    }
                },
                listCenters: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + "/centers",
                    headers: headers.json
                }

            });
        }

        return self;
    }

}());
