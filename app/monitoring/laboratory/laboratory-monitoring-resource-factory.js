(function () {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.LaboratoryMonitoringResourceFactory', LaboratoryMonitoringResourceFactory);

  LaboratoryMonitoringResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function LaboratoryMonitoringResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/monitoring/laboratory';

    var self = this;
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        getDataOfPendingResultsByAliquots: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/pending",
          headers: headers.json
        },
        getDataQuantitativeByTypeOfAliquots: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/quantitative",
          headers: headers.json
        },
        getDataOrphanByExams: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/orphans",
          headers: headers.json
        },
        getDataOfStorageByAliquots: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/storage",
          headers: headers.json
        },
        getDataOfResultsByExam: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/results",
          headers: headers.json
        }
      });
    }

    return self;
  }

}());
