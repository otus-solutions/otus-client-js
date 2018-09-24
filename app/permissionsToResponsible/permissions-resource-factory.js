(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.PermissionResourceFactory', PermissionResourceFactory);

  PermissionResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function PermissionResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/permission';

    var self = this;
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
            'permissionTemplate': '@permissionTemplate'
          }
        },

        getAll: {
          method: 'GET',
          url: restPrefix + SUFFIX,
          headers: headers.json,
        },

        getById: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          params: {
            'id': '@id'
          }
        },

        update: {
          method: 'PUT',
          url: restPrefix + SUFFIX ,
          headers: headers.json,
          data: {
            'permissionTemplate': '@permissionTemplate'
          }
        }
      });
    }
    return self;
  }

}());
