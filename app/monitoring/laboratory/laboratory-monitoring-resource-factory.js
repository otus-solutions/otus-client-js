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
          url: restPrefix + SUFFIX + "/pending/:center",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },
        getDataQuantitativeByTypeOfAliquots: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/quantitative/:center",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },
        getDataOrphanByExams: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/orphan/:center",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },
        getDataOfStorageByAliquots: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/storage/:center",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },
        getDataByExam: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/exam/:center",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },
        getDataToCSVOfPendingResultsByAliquots: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/pending/csv/:center",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },
        getDataToCSVOfQuantitativeByTypeOfAliquots: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/quantitative/csv/:center",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },
        getDataToCSVOfOrphansByExam: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/orphan/csv/:center",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },
        getDataToCSVOfStorageByAliquots: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/storage/csv/:center",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },
        getDataToCSVByExam: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/exam/csv/:center",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        }
      });
    }

    return self;
  }

}());
