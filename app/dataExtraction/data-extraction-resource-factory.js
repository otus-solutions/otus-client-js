(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.DataExtractionResourceFactory', DataExtractionResourceFactory);

    DataExtractionResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function DataExtractionResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/data-extraction';
        var self = this;


        /* Public methods */
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                extractionToken: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/extraction-token',
                    headers: headers.json
                },
                listExtractionIps: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/list-ips',
                    headers: headers.json
                },
                updateExtractionIps: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/enable-ips',
                    headers: headers.json
                },
                enableExtraction: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/enable',
                    headers: headers.json
                },
                disableExtraction: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/disable',
                    headers: headers.json
                }
            });
        }

        return self;
    }

}());
