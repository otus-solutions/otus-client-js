(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.QueryResourceFactory', QueryResourceFactory);

  QueryResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function QueryResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/query';

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
          method: 'DELETE',
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
        }
      });
    }

    return self;
  }

}());
