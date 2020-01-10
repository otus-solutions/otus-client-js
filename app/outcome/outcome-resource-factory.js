(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.OutcomeResourceFactory', StaticVariableResourceFactory);

  StaticVariableResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function StaticVariableResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/outcome';
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
              'data': '@data'
          }
        },
        update: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          params:{
            'id':'@id'
          },
          data: {
            'outcomeData': '@outcomeData'
          }
        },
        list: {
          method: 'GET',
          url: restPrefix + SUFFIX,
          headers: headers.json
        }
      });
    }
    return self;
  }

}());
