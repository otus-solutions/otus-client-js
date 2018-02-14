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

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        send: {
          method: 'POST',
          url: restPrefix + SUFFIX,
          headers: headers.json
        },

        find: {
          method: 'GET',
          url: restPrefix + SUFFIX
          headers: headers.json
        },

        remove: {
          method: 'DELETE',
          url: restPrefix + SUFFIX,
          headers: headers.json
        },

        findDTO: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/findDTO'
          headers: headers.json
        }

      });
    }


    return self;
  }

}());
