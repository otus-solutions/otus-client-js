(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.StaticVariableResourceFactory', StaticVariableResourceFactory);

  StaticVariableResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function StaticVariableResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/static-variable';
    var self = this;

    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        getStaticVariableList: {
          method: 'POST',
          url: restPrefix + SUFFIX,
          headers: headers.json,
          data: {
              'data': '@data'
          }
        }
      });
    }
    return self;
  }

}());
