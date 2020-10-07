(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.StageResourceFactory', StageResourceFactory);

  StageResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function StageResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/stage';
    var self = this;

    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        create: {
          method: 'POST',
          url: restPrefix + SUFFIX ,
          headers: headers.json,
          data: {
            'data': '@data'
          }
        },
        update: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          data: {
            'stage': '@stage'
          },
          params:{
            'id':'@id'
          }
        },
        delete: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          params:{
            'id':'@id'
          }
        },
        getByID: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          params:{
            'id':'@id'
          }
        },
        getAll: {
          method: 'GET',
          url: restPrefix + SUFFIX,
          headers: headers.json
        },
      });
    }
    return self;
  }

}());
