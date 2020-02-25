(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.LocationPointResourceFactory', LocationPointResourceFactory);

  LocationPointResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function LocationPointResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/laboratory-project/transport-location-point';
    var self = this;

    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        getConfiguration: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/configuration',
          headers: headers.json
        },
        createLocationPoint: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/:locationName',
          headers: headers.json,
          params: {
            'locationName': '@locationName'
          }
        },
        updateLocationPoint: {
          method: 'POST',
          url: restPrefix + SUFFIX,
          headers: headers.json,
          data: {
            'data': '@data'
          }
        },
        deleteLocationPoint: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/:locationPointId',
          headers: headers.json,
          params:{
            'locationPointId':'@locationPointId'
          }
        },
        saveUserLocation: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/add-user/:locationPointId',
          headers: headers.json,
          params:{
            'locationPointId':'@locationPointId'
          },
          data: {
            'user': '@user'
          }
        },
        removeUserLocation: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/remove-user/:locationPointId',
          headers: headers.json,
          params:{
            'locationPointId':'@locationPointId'
          },
          data: {
            'user': '@user'
          }
        }
      });
    }
    return self;
  }

}());
