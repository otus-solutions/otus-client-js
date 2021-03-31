(function () {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.NoteAboutParticipantResourceFactory', NotepAboutParticipantResourceFactory);

    NotepAboutParticipantResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function NotepAboutParticipantResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/participant/note-about';

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
                    data: {
                        'noteAboutParticipantJson': '@noteAboutParticipantJson'
                    }
                },
                update: {
                    method: 'PUT',
                    url: restPrefix + SUFFIX,
                    headers: headers.json,
                    data: {
                        'noteAboutParticipantJson': '@noteAboutParticipantJson'
                    }
                },
                updateStarred: {
                    method: 'PUT',
                    url: restPrefix + SUFFIX + "/update-starred/:id/:starred",
                    headers: headers.json,
                    params: {
                        'id': '@id',
                        'starred': '@starred'
                    }
                },
                delete: {
                    method: 'DELETE',
                    url: restPrefix + SUFFIX + "/:id",
                    headers: headers.json,
                    params: {
                        'id': '@id'
                    }
                },
                getAll: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + "/:rn",
                    headers: headers.json,
                    data: {
                        'searchSettings': '@searchSettings'
                    },
                    params: {
                        'rn': '@rn'
                    }
                }
            });
        }

        return self;
    }

}());