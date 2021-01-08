(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.ParticipantContactAttemptResourceFactory', ParticipantContactAttemptResourceFactory);

    ParticipantContactAttemptResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function ParticipantContactAttemptResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/participant/participant-contact-attempt';

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
                    url: restPrefix + SUFFIX,
                    headers: headers.json,
                    data:{
                      'attemptJson': '@attemptJson'
                    }
                },
                delete: {
                    method: 'DELETE',
                    url: restPrefix + SUFFIX + "/:id",
                    headers: headers.json,
                    params:{
                        'id': '@id'
                    }
                },
                findAllByRn: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/rn/:rn',
                    headers: headers.json,
                    params:{
                      'rn': '@rn'
                    }
                },
                findMetadataAttemptByObjectType: {
                  method: 'GET',
                  url: restPrefix + SUFFIX + '/metadata-status/:objectType',
                  headers: headers.json,
                  params:{
                    'objectType': '@objectType'
                  }
                }
            });
        }

        return self;
    }

}());
