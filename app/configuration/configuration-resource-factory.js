(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otusjs.otus.client.OtusProjectConfigurationResourceFactory', Factory);

    Factory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function Factory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/configuration';

        var self = this;
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);
            var headersPublishTemplate = HeaderBuilderFactory.create(token);
            headersPublishTemplate.setContentType('application/json');

            var config = {
                getSurveys: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/surveys',
                    headers: headers.json
                },
                updateSurveyTemplateType: {
                    method: 'PUT',
                    url: restPrefix + SUFFIX + '/surveys/:acronym/type',
                    data: {'newSurveyFormType': '@newSurveyFormType'},
                    headers: headers.json,
                    params: {'acronym':'@acronym'}
                },
                publishTemplate: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/publish/template',
                    headers: headersPublishTemplate.json
                },
                getVisualIdentity: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/visual-identity',
                    headers: headers.json
                },
                updateVisualIdentity: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/visual-identity',
                    headers: headers.json
                }
            };
            return $resource({}, {}, config);
        }
        return self;

    }
}());
