(function () {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.UserActivityPendencyResourceFactory', UserActivityPendencyResourceFactory);

  UserActivityPendencyResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function UserActivityPendencyResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
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
        getAllPendencies: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list',
          headers: headers.json
        },
        getOpenedPendencies: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list/opened',
          headers: headers.json
        },
        getDonePendencies: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list/done',
          headers: headers.json
        },
        getByActivityId: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:activityId',
          headers: headers.json,
          params: {
            'activityId': '@activityId'
          }
        },
        delete: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/:id',
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