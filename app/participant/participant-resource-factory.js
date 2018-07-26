(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.ParticipantResourceFactory', ParticipantResourceFactory);

    ParticipantResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function ParticipantResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/participants';

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
                    url: restPrefix + SUFFIX,
                    headers: headers.json
                },
                create: {
                    method: 'POST',
                    url: restPrefix + SUFFIX,
                    headers: headers.json,
                    data:{
                      'participantJson': '@participantJson'
                    }
                },
                getByRecruitmentNumber: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/:rn',
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
