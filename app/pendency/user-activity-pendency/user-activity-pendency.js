(function () {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.UserActivityPendencyFactory', UserActivityPendencyFactory);

  UserActivityPendencyFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function UserActivityPendencyFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/pendency/user-activity-pendency';

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
            'userActivityPendency': '@userActivityPendency'
          }
        },
        update: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          data: {
            'userActivityPendency': '@userActivityPendency'
          },
          params: {
            'id': '@id'
          }
        },
        get: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:id' + '/:state',
          headers: headers.json,
          params: {
            'id': '@id',
            'state': '@state'
          }
        },
        delete: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          data: {
            'userActivityPendency': '@userActivityPendency'
          },
          params: {
            'id': '@id'
          }
        }
      });
    }

    return self;
  }

}());