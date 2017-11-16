(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.ActivityConfigurationResourceFactory', ActivityConfigurationResourceFactory);

    ActivityConfigurationResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function ActivityConfigurationResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/activities/configuration';

        var self = this;

        /* Public methods */
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
              listAll: {
                method: 'GET',
                url: restPrefix + SUFFIX + '/categories',
                headers: headers.json
              },
              getById: {
                method: 'GET',
                url: restPrefix + SUFFIX + '/categories/:id',
                headers: headers.json,
                params: {
                  'id': '@id'
                }
              },
              create: {
                method: 'POST',
                url: restPrefix + SUFFIX + '/categories',
                headers: headers.json,
                data: {
                  'activityCategory': '@activityCategory'
                }
              },
              delete: {
                method: 'PUT',
                url: restPrefix + SUFFIX + '/categories/:id',
                headers: headers.json,
                params: {
                  'id': '@id'
                }
              },
              update: {
                method: 'PUT',
                url: restPrefix + SUFFIX + '/categories',
                headers: headers.json,
                data: {
                  'activityCategory': '@activityCategory'
                }
              },
              setDefault: {
                method: 'PUT',
                url: restPrefix + SUFFIX + '/categories/default/:id',
                headers: headers.json,
                params: {
                  'id': '@id'
                }
              }
            });
        }

        return self;
    }

}());
