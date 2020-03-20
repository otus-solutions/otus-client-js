(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.OfflineActivityCollectionResourceFactory', OfflineActivityCollectionResourceFactory);

  OfflineActivityCollectionResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function OfflineActivityCollectionResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/offline/activities';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        saveOffline: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/collection',
          headers: headers.json,
          data: {
            'offlineActivityCollections': '@offlineActivityCollections'
          }
        },
        fetchOfflineCollections: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/collection',
          headers: headers.json,
        },
        synchronizeOfflineActivities: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/synchronize/:recruitmentNumber/:offlineCollectionId',
          headers: headers.json,
          params: {
            'recruitmentNumber': '@recruitmentNumber',
            'offlineCollectionId': '@offlineCollectionId'
          }
        }
      });
    }
    return self;
  }
}());

