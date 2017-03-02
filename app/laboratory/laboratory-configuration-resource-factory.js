(function() {
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
        var SUFFIX = '/laboratoryConfiguration';

        var self = this;

        /* Public methods */
        self.create = create;

        function create() {
          var restPrefix = OtusRestResourceContext.getRestPrefix();
          var token = OtusRestResourceContext.getSecurityToken();
          var headers = HeaderBuilderFactory.create(token);

          return $resource({}, {}, {
              getListTubes: {
                  method: 'GET',
                  url: restPrefix + SUFFIX + '/listTubes',
                  isArray: true,
                  headers: headers.json
              },

              getAllCodes: {
                method: 'GET',
                url: restPrefix + SUFFIX + '/listCodes',
                isArray: true,
                headers: headers.json
              }

          });
        }

        return self;
    }

}());
