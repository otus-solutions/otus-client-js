(function () {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.ParticipantMonitoringResourceFactory', ParticipantMonitoringResourceFactory);

  ParticipantMonitoringResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function ParticipantMonitoringResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/participants';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        getStatusOfSurveys: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:rn',
          headers: headers.json,
          params: {
            'rn': '@rn'
          }
        },
        defineSurveyWithUnnecessary: {
          method: 'PUT',
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
