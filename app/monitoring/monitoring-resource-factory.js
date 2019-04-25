(function () {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.MonitoringResourceFactory', MonitoringResourceFactory);

  MonitoringResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function MonitoringResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/monitoring';

    var self = this;
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        list: {
          method: 'GET',
          url: restPrefix + SUFFIX,
          headers: headers.json
        },
        listAcronyms: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/activities",
          headers: headers.json
        },
        find: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/activities/:acronym",
          headers: headers.json,
          params: {
            'acronym': '@acronym'
          }
        },
        listCenters: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/centers",
          headers: headers.json
        },
        getActivitiesProgressReport: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/activities/progress/:center",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },
        getStatusOfActivities: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/activities/progress/participant/:rn',
          headers: headers.json,
          params: {
            'rn': '@rn'
          }
        },
        defineActivityWithDoesNotApplies: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/activities/progress/not-apply',
          headers: headers.json,
          data: {
            'data': '@data'
          }
        },
        deleteNotAppliesOfActivity: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/activities/progress/not-apply/:rn/:acronym',
          headers: headers.json,
          params: {
            'rn': '@rn',
            'acronym': '@acronym'
          }
        },
        getStatusOfExams: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/exams/progress/participant/:rn',
          headers: headers.json,
          params: {
            'rn': '@rn'
          }
        },
        defineExamWithDoesNotApplies: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/exams/progress/not-apply',
          headers: headers.json,
          data: {
            'data': '@data'
          }
        },
        deleteNotAppliesOfExam: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/exams/progress/not-apply/delete',
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
