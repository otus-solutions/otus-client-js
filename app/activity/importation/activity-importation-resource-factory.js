(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.ActivityImportationResourceFactory', ActivityImportationResourceFactory);

  ActivityImportationResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function ActivityImportationResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/activities/import';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {

        importActivities: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/:acronym/:version',
          headers: headers.json,
          data: {
            'surveyActivities': '@surveyActivities'
          },
          params: {
            'acronym': '@acronym',
            'version': '@version'
          }
        }
      });
    }
    return self;
  }

}());
