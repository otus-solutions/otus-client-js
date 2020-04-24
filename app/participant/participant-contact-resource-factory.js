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
                addNonMainEmail: {
                  method: 'PUT',
                  url: restPrefix + SUFFIX + "/add-non-main/email",
                  headers: headers.json,
                  data:{
                    'participantContactDtoJson': '@participantContactDtoJson'
                  }
                },
                addNonMainAddress: {
                  method: 'PUT',
                  url: restPrefix + SUFFIX + "/add-non-main/address",
                  headers: headers.json,
                  data:{
                    'participantContactDtoJson': '@participantContactDtoJson'
                  }
                },
                addNonMainPhoneNumber: {
                  method: 'PUT',
                  url: restPrefix + SUFFIX + "/add-non-main/phone-number",
                  headers: headers.json,
                  data:{
                    'participantContactDtoJson': '@participantContactDtoJson'
                  }
                },

                updateEmail: {
                  method: 'PUT',
                  url: restPrefix + SUFFIX + "/update/email",
                  headers: headers.json,
                  data:{
                    'participantContactDtoJson': '@participantContactDtoJson'
                  }
                },
                updateAddress: {
                  method: 'PUT',
                  url: restPrefix + SUFFIX + "/update/address",
                  headers: headers.json,
                  data:{
                    'participantContactDtoJson': '@participantContactDtoJson'
                  }
                },
                updatePhoneNumber: {
                  method: 'PUT',
                  url: restPrefix + SUFFIX + "/update/phone-number",
                  headers: headers.json,
                  data:{
                    'participantContactDtoJson': '@participantContactDtoJson'
                  }
                },
                swapMainContact: {
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
                deleteNonMainContact: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + "/delete-non-main",
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
