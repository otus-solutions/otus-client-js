(function () {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.LaboratoryConfigurationResourceFactory', LaboratoryConfigurationResourceFactory);

  LaboratoryConfigurationResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function LaboratoryConfigurationResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/laboratory-configuration';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        getCheckingExist: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/exists'
        },
        getDescriptors: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/descriptor',
          headers: headers.json,
        },
        getAliquotConfiguration: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/aliquot-configuration',
          headers: headers.json,
        },
        getAliquotDescriptors: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/aliquot-descriptors',
          headers: headers.json,
        }
      });
    }
    return self;
  }

}());
