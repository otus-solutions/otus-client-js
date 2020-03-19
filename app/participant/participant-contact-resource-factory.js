(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.ParticipantContactResourceFactory', ParticipantContactResourceFactory);

    ParticipantContactResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function ParticipantContactResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/participant/participant-contact';

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
                      'participantJson': '@participantJson'
                    }
                },
                updateMainContact: {
                  method: 'PUT',
                  url: restPrefix + SUFFIX + "/update-main",
                  headers: headers.json,
                  data:{
                    'participantContactDtoJson': '@participantContactDtoJson'
                  }
                },
                addSecondaryContact: {
                  method: 'PUT',
                  url: restPrefix + SUFFIX + "/add-secondary",
                  headers: headers.json,
                  data:{
                    'participantContactDtoJson': '@participantContactDtoJson'
                  }
                },
                updateSecondaryContact: {
                    method: 'PUT',
                    url: restPrefix + SUFFIX + "/update-secondary",
                    headers: headers.json,
                    data:{
                      'participantContactDtoJson': '@participantContactDtoJson'
                    }
                },
                swapMainContactWithSecondary: {
                    method: 'PUT',
                    url: restPrefix + SUFFIX + "/swap",
                    headers: headers.json,
                    data:{
                      'participantContactDtoJson': '@participantContactDtoJson'
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
                deleteSecondaryContact: {
                    method: 'DELETE',
                    url: restPrefix + SUFFIX + "/secondary",
                    headers: headers.json,
                    data:{
                      'participantContactDtoJson': '@participantContactDtoJson'
                    }
                },
                get: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + "/:id",
                    headers: headers.json,
                    params:{
                        'id': '@id'
                    }
                },
                getByRecruitmentNumber: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/rn/:rn',
                    headers: headers.json,
                    params:{
                      'rn': '@rn'
                    }
                }
            });
        }

        return self;
    }

}());
