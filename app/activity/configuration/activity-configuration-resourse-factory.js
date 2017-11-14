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
              create: {//pronto
                method: 'POST',
                url: restPrefix + SUFFIX + '/categories',
                headers: headers.json,
                params: {
                  'name': '@id'
                }
              },
              update: { //pronto
                method: 'PUT',
                url: restPrefix + SUFFIX + '/categories',
                headers: headers.json,
                data: {
                  'activity': '@activity'
                }
              },
              listAll: {//pronto
                method: 'GET',
                url: restPrefix + SUFFIX + '/categories',
                headers: headers.json
              },
              getById: {//remover
                method: 'GET',
                url: restPrefix + SUFFIX + '/categories/:id',
                headers: headers.json,
                params: {
                  'id': '@id',
                  'rn': '@rn',
                }
              },
              deleteById: {
                method: 'PUT',
                url: restPrefix + SUFFIX + '/categories/:id',
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
