(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.SurveyResourceFactory', SurveyResourceFactory);

    SurveyResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function SurveyResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/survey';

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
                    url: restPrefix + SUFFIX + '/list',
                    headers: headers.json
                },
                listAll: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/list/all',
                    headers: headers.json
                }
            });
        }

        return self;
    }

}());
