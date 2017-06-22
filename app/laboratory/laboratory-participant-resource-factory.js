(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.LaboratoryParticipantResourceFactory', LaboratoryParticipanResourceFactory);

    LaboratoryParticipanResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function LaboratoryParticipanResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/laboratory-participant';

        var self = this;

        /* Public methods */
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                initialize: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/initialize/:rn',
                    headers: headers.json,
                    params: {
                        'rn': '@rn'
                    }
                },
                getLaboratory: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/:rn',
                    headers: headers.json,
                    params: {
                        'rn': '@rn'
                    }
                },
                update: {
                  method: 'PUT',
                  url: restPrefix + SUFFIX + '/:rn',
                  headers: headers.json,
                  data: {
                    'laboratory': '@laboratory'
                  },
                  params: {
                    'rn': '@rn',
                  }
                },
                getDescriptors: {
                  method: 'GET',
                  url: restPrefix + SUFFIX + '/descriptor',
                  headers: headers.json,
                }
            });
        }
        return self;
    }

}());
