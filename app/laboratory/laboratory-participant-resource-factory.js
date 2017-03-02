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
                create: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/generate/:rn',
                    headers: headers.json,
                    params: {
                        'rn': '@rn'
                    }
                },
                createEmpty: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/generate-empty/:rn',
                    headers: headers.json,
                    params: {
                        'rn': '@rn'
                    }
                },
                generateTubes: {
                    method: 'PUT',
                    url: restPrefix + SUFFIX + '/generate-tubes/:rn',
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
                }
            });
        }
        return self;
    }

}());
