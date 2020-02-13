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
        },

        getAllPendencies: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list',
          headers: headers.json,
          data: {
            'searchSettings': '@searchSettings'
          }
        },

        getAllPendenciesToReceiver: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list/receiver',
          headers: headers.json
        },
        getOpenedPendenciesToReceiver: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list/receiver/opened',
          headers: headers.json
        },
        getDonePendenciesToReceiver: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list/receiver/done',
          headers: headers.json
        },

        getAllPendenciesFromRequester: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list/requester',
          headers: headers.json
        },
        getOpenedPendenciesFromRequester: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list/requester/opened',
          headers: headers.json
        },
        getDonePendenciesFromRequester: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list/requester/done',
          headers: headers.json
        }
      });
    }

    return self;
  }

}());