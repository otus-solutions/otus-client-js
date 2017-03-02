(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.ActivityResourceFactory', ActivityResourceFactory);

    ActivityResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function ActivityResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/participants/:rn/activities';

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
                params: {
                  'id': '@id',
                  'rn': '@rn',
                }
              },
              update: {
                method: 'PUT',
                url: restPrefix + SUFFIX + '/:id',
                headers: headers.json,
                data: {
                  'activity': '@activity'
                },
                params: {
                  'id': '@id',
                  'rn': '@rn',
                }
              },
              listAll: {
                method: 'GET',
                url: restPrefix + SUFFIX,
                headers: headers.json,
                params: {
                  'rn': '@rn',
                }
              },
              getById: {
                method: 'GET',
                url: restPrefix + SUFFIX + '/:id',
                headers: headers.json,
                params: {
                  'id': '@id',
                  'rn': '@rn',
                }
              },
              deleteById: {
                method: 'PUT',
                url: restPrefix + SUFFIX + '/:id',
                headers: headers.json,
                data: {
                  'activity': '@activity'
                },
                params: {
                  'id': '@id',
                  'rn': '@rn',
                }
              }
            });
        }

        return self;
    }

}());