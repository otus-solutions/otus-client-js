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
          url: restPrefix + SUFFIX + '/exists',
          headers: headers.json
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
        },
        getTubeMedataDataByType: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/tube-custom-metadata/:type',
          headers: headers.json,
        },
        getLotReceiptMetadata: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/lot-receipt-custom-metadata',
          headers: headers.json
        },
        getMaterialMetadataOptions: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/lot/receive-material-metadata-options/:materialType',
          headers: headers.json,
          params: {
            'materialType': '@materialType'
          }
        },
      });
    }
    return self;
  }

}());
