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
          url: restPrefix + SUFFIX +'/:center',
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },

        listAll: {
          method: 'GET',
          url: restPrefix + SUFFIXS,
          headers: headers.json,
        },

        remove: {
          method: 'DELETE',
          url: restPrefix + SUFFIX,
          headers: headers.json,
        },

        listForCenter: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:center',
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },

        listDatasource: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/listDatasource/:dataSource',
          headers: headers.json,
          params: {
            'dataSource': '@datasource'
          }
        }
      });
    }
    return self;
  }

}());
