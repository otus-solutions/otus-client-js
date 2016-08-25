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
            var config = {
                getParticipantRegister: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/participant-register',
                    interceptor: {
                        response: function(response) {
                          console.log('certooou');
                            console.log(response);
                            return response;
                        },
                        responseError: function(error){
                          console.log('errrrroooou');
                          console.log(error);
                        }
                    },
                    headers: headers.json
                },
                updateParticipantRegister: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/participant-register',
                    headers: headers.json
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
