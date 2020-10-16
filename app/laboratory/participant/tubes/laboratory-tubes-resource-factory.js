(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.LaboratoryTubesResourceFactory', LaboratoryTubesResourceFactory);

  LaboratoryTubesResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function LaboratoryTubesResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/laboratory-tubes';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        getTubeWithRn: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:tubeCode',
          headers: headers.json,
          params: {
            'tubeCode': '@tubeCode'
          }
        }
      });
    }
    return self;
  }

}());
