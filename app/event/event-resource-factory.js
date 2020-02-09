(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.EventResourceFactory', Factory);

  Factory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function Factory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/event';
    var self = this;

    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        create: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/create/:id',
          headers: headers.json,
          data: {
              'data': '@data'
          },
          params:{
            'id':'@id'
          },
        },
        deactivate: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/remove/:id',
          headers: headers.json,
          params:{
            'id':'@id'
          }
        }
      });
    }
    return self;
  }

}());
