(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.ActivitySharingResourceFactory', ActivitySharingResourceFactory);

  ActivitySharingResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function ActivitySharingResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/activity-sharing';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        getSharedLink: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          params: {
            'id': '@id'
          }
        },
        recreateSharedLink: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          params: {
            'id': '@id'
          }
        },
        deleteSharedLink: {
          method: 'PUT',
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

