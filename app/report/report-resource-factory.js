(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.ReportResourceFactory', ReportResourceFactory);

  ReportResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function ReportResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/report';

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
              'reportTemplate': '@reportTemplate'
          }
        },

        listAll: {
          method: 'GET',
          url: restPrefix + SUFFIX,
          headers: headers.json,
        },

        getById: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          params: {
            'id': '@id'
          }
        },

        getActivityReport: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/activity-report/:id',
          headers: headers.json,
          params: {
            'id': '@id'
          }
        },

        update: {
          method: 'PUT',
          url: restPrefix + SUFFIX ,
          headers: headers.json,
          data: {
            'reportTemplate': '@reportTemplate'
          }
        },

        remove: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          params: {
            'id' : '@id'
          }
        },

        list: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/participant/list/:rn',
          headers: headers.json,
          params: {
            'rn': '@rn'
          }
        },

        getByRecruitmentNumber: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/participant/:rn/:id',
          headers: headers.json,
          params: {
            'rn': '@rn',
            'id': '@id'
          }
        }
      });
    }
    return self;
  }

}());
