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
          url: restPrefix + SUFFIX + "/orphan",
          headers: headers.json
        },
        getDataOfStorageByAliquots: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/storage",
          headers: headers.json
        },
        getDataOfResultsByExam: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/result",
          headers: headers.json
        },
        getDataToCSVOfPendingResultsByAliquots: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/pending/csv",
          headers: headers.json
        },
        getDataToCSVOfQuantitativeByTypeOfAliquots: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/quantitative/csv",
          headers: headers.json
        },
        getDataToCSVOfOrphansByExam: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/orphan/csv",
          headers: headers.json
        },
        getDataToCSVOfStorageByAliquots: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/storage/csv",
          headers: headers.json
        },
        getDataToCSVOfResultsByExam: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/result/csv",
          headers: headers.json
        }
      });
    }

    return self;
  }

}());
