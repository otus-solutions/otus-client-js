(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.UserPermissionResourceFactory', UserPermissionResourceFactory);

  UserPermissionResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function UserPermissionResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/permission/user';

    var self = this;
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        savePermission: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/save',
          headers: headers.json,
          data: {
            'permissionJson': '@permissionJson'
          }
        },
        getAll: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:email',
          headers: headers.json,
          params: {
            'email' : '@email'
          }
        }
      });
    }

    return self;
  }

}());
